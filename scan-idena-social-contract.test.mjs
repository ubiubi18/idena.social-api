import assert from "node:assert/strict";
import test from "node:test";

import {
  extractAsciiStrings,
  hexToBuf,
  tryExtractJsonLike,
} from "./scan-idena-social-contract.mjs";

test("hexToBuf accepts prefixed hex and rejects malformed lengths", () => {
  assert.equal(hexToBuf("0x68656c6c6f").toString("utf8"), "hello");
  assert.equal(hexToBuf("abc").length, 0);
});

test("extractAsciiStrings returns only sufficiently long printable runs", () => {
  const input = Buffer.concat([
    Buffer.from([0]),
    Buffer.from("visible"),
    Buffer.from([0xff]),
    Buffer.from("tiny"),
  ]);

  assert.deepEqual(extractAsciiStrings(input), ["visible"]);
});

test("tryExtractJsonLike returns the first object-shaped candidate", () => {
  assert.equal(
    tryExtractJsonLike(["prefix", 'before {"type":"post"} after']),
    '{"type":"post"}'
  );
  assert.equal(tryExtractJsonLike(["plain text"]), "");
});
