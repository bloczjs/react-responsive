/* oxlint-disable @typescript-eslint/no-unused-vars */

// Type-level validation for `createMediaRanges`. The hook and components below are never
// invoked at runtime — they exist so the typecheck pass fails if the typings drift. Each
// `@ts-expect-error` would itself error if the line below it stopped erroring.
//
// Symbols are exported only so `noUnusedLocals` is satisfied. Nothing here is re-exported
// from `./index.ts`, so consumers cannot reach them.

import * as React from "react";

import { createMediaRanges } from "./createMediaRanges";
import { DEFAULT_MEDIA_RANGES } from "./defaultMediaRanges";

const { useMediaRange, Only } = createMediaRanges({
  ...DEFAULT_MEDIA_RANGES,
  pxRange: [263, 863, { unit: "px" }],
  emRange: [20, 40, { unit: "em" }],
});

// A second factory — its keys must not be accepted by the first factory's hook / component.
const { useMediaRange: useOtherMediaRange } = createMediaRanges({
  alpha: [0, 100],
  beta: [100, 200],
});

function useTypeChecks(): boolean {
  useMediaRange("xs");
  useMediaRange("md");
  useMediaRange("pxRange");
  useMediaRange("emRange");

  useMediaRange("xsUp");
  useMediaRange("xsDown");
  useMediaRange("pxRangeUp");
  useMediaRange("pxRangeDown");
  useMediaRange("emRangeUp");
  useMediaRange("emRangeDown");

  useMediaRange("sm md");
  useMediaRange("xs sm md lg xl");
  useMediaRange("md pxRange emRangeDown");
  useMediaRange("pxRangeUp emRangeDown");

  // @ts-expect-error – "invalid" is not a declared range
  useMediaRange("invalid");
  // @ts-expect-error – typo in declared name
  useMediaRange("MD");
  // @ts-expect-error – empty string is not a valid range name
  useMediaRange("");
  // @ts-expect-error – "pxRangeSide" is neither a key nor an Up/Down alias
  useMediaRange("pxRangeSide");
  // @ts-expect-error – only Up/Down aliases are generated, not "Mid"
  useMediaRange("mdMid");

  // @ts-expect-error – invalid token at start
  useMediaRange("invalid md");
  // @ts-expect-error – invalid token at end
  useMediaRange("md invalid");
  // @ts-expect-error – invalid token in the middle
  useMediaRange("md invalid lg");
  // @ts-expect-error – every token must be valid
  useMediaRange("invalid foo bar");

  // @ts-expect-error – "alpha" was declared on a different factory
  useMediaRange("alpha");
  // @ts-expect-error – "beta" was declared on a different factory
  useMediaRange("beta md");

  useOtherMediaRange("alpha");
  useOtherMediaRange("alpha beta");
  // @ts-expect-error – "md" is not declared on the other factory
  useOtherMediaRange("md");
  // @ts-expect-error – "pxRange" is not declared on the other factory
  useOtherMediaRange("pxRange");

  // @ts-expect-error – non-literal `string` is rejected
  useMediaRange("md" as string);

  // @ts-expect-error – `on` is required
  useMediaRange();
  // @ts-expect-error – undefined is not a valid token list
  useMediaRange(undefined);

  // useMediaRange returns boolean
  return useMediaRange("md");
}

function OnlyValid(): React.ReactElement {
  return (
    <React.Fragment>
      <Only on="md">ok</Only>
      <Only on="pxRange">ok</Only>
      <Only on="md pxRangeDown">ok</Only>
      <Only on="xsUp lg">ok</Only>
      <Only matchMedia="(min-width: 500px)">ok</Only>
      <Only on="md" matchMedia="(orientation: landscape)">
        ok
      </Only>
    </React.Fragment>
  );
}

function OnlyInvalid(): React.ReactElement {
  return (
    <React.Fragment>
      <Only
        // @ts-expect-error – "invalid" is not a declared range
        on="invalid"
      >
        no
      </Only>
      <Only
        // @ts-expect-error – one bad token in the list
        on="md invalid"
      >
        no
      </Only>
      <Only
        // @ts-expect-error – "alpha" leaks from another factory
        on="alpha"
      >
        no
      </Only>
      <Only
        on="md"
        // @ts-expect-error – `as` was dropped on the factory-generated Only
        as="li"
      >
        no
      </Only>
      <Only
        on="md"
        // @ts-expect-error – arbitrary forwarded props were dropped on the factory-generated Only
        className="x"
      >
        no
      </Only>
    </React.Fragment>
  );
}
