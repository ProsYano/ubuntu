import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

const editor = "10000000-0000-4000-8000-000000000001";
const outsider = "10000000-0000-4000-8000-000000000002";
const otherEditor = "10000000-0000-4000-8000-000000000003";
const machine = "20000000-0000-4000-8000-000000000001";

test("PostgreSQL: permissions, catalogue lifecycle and storage isolation", async t => {
  const db = new PGlite();
  try {
    // Minimal Supabase infrastructure stand-in. The application's actual migration
    // and actual PostgreSQL RLS engine run unchanged; no cloud project is touched.
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create schema storage;
      create table auth.users (id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      create table storage.buckets (id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
      create table storage.objects (id uuid primary key default gen_random_uuid(),bucket_id text references storage.buckets(id),name text);
      create function storage.foldername(text) returns text[] language sql immutable as $$ select string_to_array($1,'/') $$;
      alter table storage.objects enable row level security;
      grant usage on schema public, auth, storage to anon, authenticated, service_role;
      grant select,insert,update,delete on storage.objects to anon,authenticated;
      insert into auth.users values ('${editor}'),('${outsider}'),('${otherEditor}');
    `);
    await db.exec(await readFile(new URL("../supabase/migrations/20260905110833_ubuntu_equipment_catalogue.sql",import.meta.url),"utf8"));
    await db.exec(`insert into public.ubuntu_editors(user_id) values ('${editor}'),('${otherEditor}')`);
    const asRole = async (role: string, user = "") => { await db.exec(`reset role; set role ${role}; select set_config('request.jwt.claim.sub','${user}',false);`); };
    await t.test("visitors read seeded published records but cannot write or see editor accounts", async () => {
      await asRole("anon");
      assert.equal((await db.query("select * from public.ubuntu_equipment")).rows.length,6);
      await assert.rejects(db.exec("update public.ubuntu_equipment set name='Compromis'"),/permission denied/);
      await assert.rejects(db.exec("select * from public.ubuntu_editors"),/permission denied/);
    });
    await t.test("signed-in non-editors cannot grant themselves access or edit",async()=>{
      await asRole("authenticated",outsider);
      assert.equal((await db.query("update public.ubuntu_equipment set name='Compromis' returning id")).rows.length,0);
      await assert.rejects(db.exec(`insert into public.ubuntu_editors(user_id) values ('${outsider}')`),/permission denied/);
      assert.equal((await db.query("select * from public.ubuntu_editors")).rows.length,0);
    });
    await t.test("editors can create drafts, while visitors cannot read them",async()=>{
      await asRole("authenticated",editor);
      await db.exec(`insert into public.ubuntu_equipment (id,slug,name,category,summary,description) values ('${machine}','engin-test','Engin test','Pelles hydrauliques','Une présentation suffisamment détaillée pour les visiteurs.','Une description complète du matériel et de ses applications sur les chantiers.')`);
      assert.equal((await db.query("select * from public.ubuntu_editors")).rows.length,1);
      await asRole("anon");
      assert.equal((await db.query(`select id from public.ubuntu_equipment where id='${machine}'`)).rows.length,0);
    });
    await t.test("publication, optimistic locking, stable URL and image reference protection",async()=>{
      await asRole("authenticated",editor);
      const previous = (await db.query<{version:string}>(`select updated_at::text as version from public.ubuntu_equipment where id='${machine}'`)).rows[0].version;
      await db.exec(`update public.ubuntu_equipment set status='published' where id='${machine}'`);
      assert.equal((await db.query(`update public.ubuntu_equipment set name='Stale overwrite' where id='${machine}' and updated_at=$1 returning id`,[previous])).rows.length,0);
      await assert.rejects(db.exec(`update public.ubuntu_equipment set slug='broken-link' where id='${machine}'`),/immutable/);
      await assert.rejects(db.exec(`update public.ubuntu_equipment set image_path='https://evil.example/a.svg' where id='${machine}'`),/check constraint/);
      await asRole("anon");
      assert.equal((await db.query(`select id from public.ubuntu_equipment where id='${machine}'`)).rows.length,1);
    });
    await t.test("another authorized editor can update shared catalogue but cannot forge authorship",async()=>{
      await asRole("authenticated",otherEditor);
      const result = await db.query<{created_by:string;updated_by:string}>(`update public.ubuntu_equipment set name='Engin modifié',created_by='${otherEditor}',updated_by='${outsider}' where id='${machine}' returning created_by,updated_by`);
      assert.equal(result.rows[0].created_by,editor);
      assert.equal(result.rows[0].updated_by,otherEditor);
    });
    await t.test("soft deletion hides a published item and restoration as draft stays private",async()=>{
      await asRole("authenticated",editor);
      await db.exec(`update public.ubuntu_equipment set deleted_at=now() where id='${machine}'`);
      await asRole("anon");
      assert.equal((await db.query(`select id from public.ubuntu_equipment where id='${machine}'`)).rows.length,0);
      await asRole("authenticated",editor);
      await db.exec(`update public.ubuntu_equipment set deleted_at=null,status='draft' where id='${machine}'`);
      await assert.rejects(db.exec(`delete from public.ubuntu_equipment where id='${machine}'`),/permission denied/);
      await asRole("anon");
      assert.equal((await db.query(`select id from public.ubuntu_equipment where id='${machine}'`)).rows.length,0);
    });
    await t.test("storage rejects anonymous uploads, unauthorized users, foreign folders and unsafe filenames",async()=>{
      const path = `${editor}/${machine}.webp`;
      await asRole("anon");
      await assert.rejects(db.exec(`insert into storage.objects(bucket_id,name) values ('ubuntu-equipment','${path}')`),/row-level security/);
      await asRole("authenticated",outsider);
      await assert.rejects(db.exec(`insert into storage.objects(bucket_id,name) values ('ubuntu-equipment','${outsider}/${machine}.webp')`),/row-level security/);
      await asRole("authenticated",editor);
      await assert.rejects(db.exec(`insert into storage.objects(bucket_id,name) values ('ubuntu-equipment','${outsider}/${machine}.webp')`),/row-level security/);
      await assert.rejects(db.exec(`insert into storage.objects(bucket_id,name) values ('ubuntu-equipment','${editor}/payload.svg')`),/row-level security/);
      await db.exec(`insert into storage.objects(bucket_id,name) values ('ubuntu-equipment','${path}')`);
      await db.exec(`update public.ubuntu_equipment set image_path='${path}' where id='${machine}'`);
      assert.equal((await db.query(`delete from storage.objects where name='${path}' returning id`)).rows.length,0);
      await db.exec(`update public.ubuntu_equipment set image_path=null where id='${machine}'`);
      assert.equal((await db.query(`delete from storage.objects where name='${path}' returning id`)).rows.length,1);
    });
    await t.test("revoking editor membership immediately removes mutation rights",async()=>{
      await asRole("service_role");
      await db.exec(`delete from public.ubuntu_editors where user_id='${editor}'`);
      await asRole("authenticated",editor);
      assert.equal((await db.query(`update public.ubuntu_equipment set name='Accès révoqué' where id='${machine}' returning id`)).rows.length,0);
    });
    await t.test("both application tables have RLS enabled",async()=>{
      await db.exec("reset role");
      const result = await db.query<{relrowsecurity:boolean}>("select relrowsecurity from pg_class where relname in ('ubuntu_editors','ubuntu_equipment')");
      assert.equal(result.rows.length,2);
      assert.ok(result.rows.every(row=>row.relrowsecurity));
    });
  } finally { await db.close(); }
});
