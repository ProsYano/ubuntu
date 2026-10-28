import { test } from "node:test";
import assert from "node:assert/strict";
import { readVoice } from "../src/lib/server/voice";

test("voice is optional and accepts supported audio signatures", async () => {
  assert.equal(await readVoice(null), undefined);
  for (const [type, bytes] of [["audio/webm;codecs=opus", [0x1a, 0x45, 0xdf, 0xa3]], ["audio/ogg", [...Buffer.from("OggS")]], ["audio/mp4", [0, 0, 0, 20, ...Buffer.from("ftyp")]]] as const) {
    const audio = await readVoice(new File([new Uint8Array(bytes)], "voice", { type }));
    assert.equal(audio?.type, type.split(";")[0]);
    assert.deepEqual(audio?.bytes, Buffer.from(bytes));
  }
});
test("voice rejects disguised files and oversized recordings", async () => {
  await assert.rejects(readVoice(new File(["not audio"], "voice.webm", { type: "audio/webm" })));
  await assert.rejects(readVoice(new File([new Uint8Array(4 * 1024 * 1024 + 1)], "voice.webm", { type: "audio/webm" })));
});
