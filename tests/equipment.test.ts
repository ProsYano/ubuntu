import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { equipmentSchema, slugify, imageUrl } from "../src/lib/equipment-schema";
import { prepareEquipmentImage } from "../src/lib/equipment-image";
import { buildMetadata, jsonLdEquipment } from "../src/lib/seo";
const fields = {name:"Pelle hydraulique",category:"Pelles hydrauliques",summary:"Une pelle hydraulique pour les travaux de terrassement.",description:"Un équipement destiné aux travaux de terrassement et à la préparation des chantiers.",specifications:"",capacity_summary:"",daily_rate:null,weekly_rate:null,monthly_rate:null,rental_terms:"",image_alt:"",seo_title:"",seo_description:"",status:"draft",availability:"on_request"};
test("validates required content, bounded lengths and publication states",()=>{
  assert.ok(equipmentSchema.safeParse(fields).success);
  assert.equal(equipmentSchema.parse({...fields,daily_rate:"125000"}).daily_rate,125000);
  assert.equal(equipmentSchema.parse({...fields,daily_rate:""}).daily_rate,null);
  assert.equal(equipmentSchema.safeParse({...fields,status:"admin"}).success,false);
  assert.equal(equipmentSchema.safeParse({...fields,daily_rate:-1}).success,false);
  assert.equal(equipmentSchema.safeParse({...fields,name:" "}).success,false);
  assert.equal(equipmentSchema.safeParse({...fields,seo_description:"a".repeat(171)}).success,false);
  assert.equal(slugify("Pelles à chenilles & équipements"),"pelles-a-chenilles-equipements");
});
test("rejects arbitrary image URLs and traversal",()=>{
  assert.equal(imageUrl("https://evil.example/image.png"),null);
  assert.equal(imageUrl("/rentx-reference/../../private.png"),null);
  assert.equal(imageUrl("/rentx-reference/asset-d42655080003ef46.png"),"/rentx-reference/asset-d42655080003ef46.png");
});
test("image upload verifies bytes, strips metadata and limits output dimensions",async()=>{
  const png = await sharp({create:{width:2400,height:1800,channels:3,background:"#edb522"}}).png().toBuffer();
  const result = await prepareEquipmentImage(png,"image/png");
  const info = await sharp(result).metadata();
  assert.equal(info.format,"webp");assert.equal(info.width,1920);assert.equal(info.height,1440);assert.equal(info.exif,undefined);
  await assert.rejects(prepareEquipmentImage(png,"image/jpeg"),/illisible/);
  await assert.rejects(prepareEquipmentImage(Buffer.from('<svg onload="alert(1)"/>'),"image/svg+xml"),/JPG/);
  await assert.rejects(prepareEquipmentImage(new Uint8Array(5*1024*1024+1),"image/png"),/5 Mo/);
  await assert.rejects(prepareEquipmentImage(Buffer.from("not an image"),"image/png"),/illisible/);
});
test("private pages use noindex and equipment SEO uses real rental service data",()=>{
  const metadata=buildMetadata({title:"Gestion",path:"/gestion",noIndex:true});
  assert.deepEqual(metadata.robots,{index:false,follow:false});
  assert.equal(metadata.alternates?.canonical,"/gestion");
  const schema=jsonLdEquipment({...equipmentSchema.parse(fields),id:"test",slug:"pelle",image_path:null,created_at:"2026-09-05",updated_at:"2026-09-05",deleted_at:null});
  assert.equal(schema["@type"],"Service");
  assert.equal("offers" in schema,false);assert.equal("aggregateRating" in schema,false);
  const priced=jsonLdEquipment({...equipmentSchema.parse({...fields,daily_rate:125000}),id:"test",slug:"pelle",image_path:null,created_at:"2026-09-05",updated_at:"2026-09-05",deleted_at:null});
  assert.equal(priced.offers?.[0]?.priceCurrency,"XAF");
  assert.equal(priced.offers?.[0]?.price,125000);
});
