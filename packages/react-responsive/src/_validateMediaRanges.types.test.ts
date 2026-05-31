/* oxlint-disable @typescript-eslint/no-unused-vars */

// Type-level validation for `validateMediaRanges`. The assertions below lock the exact
// error-message format so a regression in the typing surfaces here at typecheck time.
//
// Symbols are exported only so `noUnusedLocals` is satisfied. Nothing here is re-exported
// from `./index.ts`, so consumers cannot reach them.

import { DEFAULT_MEDIA_RANGES } from "./defaultMediaRanges";
import { type ValidatedMediaRangeString } from "./_validateMediaRanges";

type Ranges = typeof DEFAULT_MEDIA_RANGES & {
  pxRange: [263, 863, { unit: "px" }];
};
type AssertEq<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

const validSingle: AssertEq<ValidatedMediaRangeString<Ranges, "md">, "md"> = true;
const validMulti: AssertEq<ValidatedMediaRangeString<Ranges, "md pxRange">, "md pxRange"> = true;
const invalidSingle: AssertEq<ValidatedMediaRangeString<Ranges, "foo">, "Invalid media ranges: foo"> = true;
const invalidMixed: AssertEq<ValidatedMediaRangeString<Ranges, "foo md bar">, "Invalid media ranges: foo bar"> = true;
const invalidEmpty: AssertEq<ValidatedMediaRangeString<Ranges, "">, "Invalid media range: empty string"> = true;
