import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import type { MockInstance } from "vitest";
import * as React from "react";
import { render } from "@testing-library/react";
import { cleanup, setMedia } from "mock-match-media";

import {
  MediaRangesProvider,
  useMediaRange,
} from "@blocz/react-responsive";

let matchMediaSpy: MockInstance<
  (query: string) => MediaQueryList
>;
let addListener: ReturnType<typeof vi.fn>;
let originalMatchMedia: typeof window.matchMedia;

beforeEach(() => {
  originalMatchMedia = window.matchMedia;
  addListener = vi.fn();
  matchMediaSpy = vi
    .spyOn(window, "matchMedia")
    .mockImplementation((query) => {
      const mql = originalMatchMedia(query);
      const origAdd = mql.addListener.bind(mql);
      mql.addListener = (cb) => {
        addListener(cb);
        return origAdd(cb);
      };
      return mql;
    });
});

afterEach(() => {
  matchMediaSpy.mockRestore();
  cleanup();
});

describe("useMediaRange", () => {
  it("does not re-evaluate or cause extra re-renders when the parent re-renders", () => {
    setMedia({ width: 1000 });

    const probeRender = vi.fn();
    const Probe = ({
      unrelated,
    }: {
      unrelated: number;
    }) => {
      useMediaRange("md");
      probeRender(unrelated);
      return null;
    };

    const parentRender = vi.fn();
    const Parent = ({ value }: { value: number }) => {
      parentRender();
      return <Probe unrelated={value} />;
    };

    const { rerender } = render(<Parent value={1} />);

    expect(parentRender).toHaveBeenCalledTimes(1);
    expect(probeRender).toHaveBeenCalledTimes(1);
    const matchMediaCallsAfterMount =
      matchMediaSpy.mock.calls.length;
    expect(matchMediaCallsAfterMount).toBeGreaterThan(0);
    expect(addListener).toHaveBeenCalledTimes(1);

    rerender(<Parent value={2} />);
    rerender(<Parent value={3} />);
    rerender(<Parent value={4} />);

    // Parent re-rendered 3 more times; Probe re-renders once per parent render,
    // and useMediaRange should NOT trigger any additional renders on top of that.
    expect(parentRender).toHaveBeenCalledTimes(4);
    expect(probeRender).toHaveBeenCalledTimes(4);

    // useMediaRange must not re-evaluate the media query on subsequent renders
    // (no new matchMedia calls, no new listener subscriptions).
    expect(matchMediaSpy.mock.calls.length).toBe(
      matchMediaCallsAfterMount,
    );
    expect(addListener).toHaveBeenCalledTimes(1);
  });

  it("does not re-evaluate when the MediaRangesProvider re-renders with the same ranges", () => {
    setMedia({ width: 1000 });

    const probeRender = vi.fn();
    const Probe = () => {
      useMediaRange("md");
      probeRender();
      return null;
    };

    const mediaRanges: React.ComponentProps<
      typeof MediaRangesProvider
    >["mediaRanges"] = {
      xs: [0, 575, "px"],
      sm: [576, 767, "px"],
      md: [768, 991, "px"],
      lg: [992, 1199, "px"],
      xl: [1200, Infinity, "px"],
    };

    const { rerender } = render(
      <MediaRangesProvider mediaRanges={mediaRanges}>
        <Probe />
      </MediaRangesProvider>,
    );

    const matchMediaCallsAfterMount =
      matchMediaSpy.mock.calls.length;
    expect(probeRender).toHaveBeenCalledTimes(1);
    expect(addListener).toHaveBeenCalledTimes(1);

    rerender(
      <MediaRangesProvider mediaRanges={mediaRanges}>
        <Probe />
      </MediaRangesProvider>,
    );

    // Provider re-rendered with the same ranges reference; the hook should
    // neither re-evaluate the query nor add a new listener.
    expect(probeRender).toHaveBeenCalledTimes(2);
    expect(matchMediaSpy.mock.calls.length).toBe(
      matchMediaCallsAfterMount,
    );
    expect(addListener).toHaveBeenCalledTimes(1);
  });
});
