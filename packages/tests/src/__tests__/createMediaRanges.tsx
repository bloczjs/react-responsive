/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render } from "@testing-library/react";
import { cleanup, setMedia } from "mock-match-media";

import {
  createMediaRanges,
  DEFAULT_MEDIA_RANGES,
} from "@blocz/react-responsive";

afterEach(() => {
  cleanup();
});

describe("createMediaRanges", () => {
  it("returns a typed useMediaRange that matches when the viewport is in the named range", () => {
    const { useMediaRange } = createMediaRanges({
      ...DEFAULT_MEDIA_RANGES,
      pxRange: [263, 863, { unit: "px" }],
      emRange: [20, 40, { unit: "em" }],
    });

    setMedia({ width: 800 });

    let probedMd: boolean | undefined;
    let probedPxRange: boolean | undefined;
    let probedXs: boolean | undefined;
    const Probe = () => {
      probedMd = useMediaRange("md");
      probedPxRange = useMediaRange("pxRange");
      probedXs = useMediaRange("xs");
      return null;
    };
    render(<Probe />);

    expect(probedMd).toBe(true);
    expect(probedPxRange).toBe(true);
    expect(probedXs).toBe(false);
  });

  it("supports the auto-generated Up / Down aliases", () => {
    const { useMediaRange } = createMediaRanges(
      DEFAULT_MEDIA_RANGES,
    );

    setMedia({ width: 1000 });

    let probedMdUp: boolean | undefined;
    let probedMdDown: boolean | undefined;
    let probedXsUp: boolean | undefined;
    const Probe = () => {
      probedMdUp = useMediaRange("mdUp");
      probedMdDown = useMediaRange("mdDown");
      probedXsUp = useMediaRange("xsUp");
      return null;
    };
    render(<Probe />);

    expect(probedMdUp).toBe(true);
    expect(probedMdDown).toBe(false);
    expect(probedXsUp).toBe(true);
  });

  it("supports space-separated combinations", () => {
    const { useMediaRange } = createMediaRanges(
      DEFAULT_MEDIA_RANGES,
    );

    setMedia({ width: 800 });

    let probedSmOrMd: boolean | undefined;
    let probedSmOrLg: boolean | undefined;
    const Probe = () => {
      probedSmOrMd = useMediaRange("sm md");
      probedSmOrLg = useMediaRange("sm lg");
      return null;
    };
    render(<Probe />);

    expect(probedSmOrMd).toBe(true);
    expect(probedSmOrLg).toBe(false);
  });

  it("is isolated from MediaRangesProvider (it has its own ranges)", () => {
    const { useMediaRange } = createMediaRanges({
      custom: [400, 800],
    });

    setMedia({ width: 600 });

    let probedCustom: boolean | undefined;
    const Probe = () => {
      probedCustom = useMediaRange("custom");
      return null;
    };
    render(<Probe />);

    expect(probedCustom).toBe(true);
  });

  describe("Only", () => {
    it("renders children inside a Fragment when the range matches", () => {
      const { Only } = createMediaRanges(
        DEFAULT_MEDIA_RANGES,
      );

      setMedia({ width: 800 });

      const { container } = render(
        <div>
          <Only on="md">visible</Only>
          <Only on="xs">hidden</Only>
        </div>,
      );

      expect(container.textContent).toBe("visible");
    });

    it("renders when only matchMedia matches", () => {
      const { Only } = createMediaRanges(
        DEFAULT_MEDIA_RANGES,
      );

      setMedia({ width: 1000 });

      const { container } = render(
        <div>
          <Only matchMedia="(min-width: 500px)">
            visible
          </Only>
          <Only matchMedia="(max-width: 100px)">
            hidden
          </Only>
        </div>,
      );

      expect(container.textContent).toBe("visible");
    });
  });

  // Type-level checks live in `./createMediaRanges.types.test.tsx`.
});
