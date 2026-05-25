/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render } from "@testing-library/react";
import { cleanup, setMedia } from "mock-match-media";

import {
  MediaRangesProvider,
  useMediaRange,
} from "@blocz/react-responsive";

let matchMediaSpy: jest.SpyInstance<
  MediaQueryList,
  [query: string]
>;
let addListener: jest.Mock;
let originalMatchMedia: typeof window.matchMedia;

beforeEach(() => {
  matchMediaSpy = jest.spyOn(window, "matchMedia");
  addListener = jest.fn();
  originalMatchMedia = window.matchMedia;
  window.matchMedia = ((query: string) => {
    const mql = originalMatchMedia(query);
    const origAdd = mql.addListener.bind(mql);
    mql.addListener = (cb) => {
      addListener(cb);
      return origAdd(cb);
    };
    return mql;
  }) as typeof window.matchMedia;
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  matchMediaSpy.mockRestore();
  cleanup();
});

describe("useMediaRange", () => {
  it("does not re-evaluate or cause extra re-renders when the parent re-renders", () => {
    setMedia({ width: 1000 });

    const probeRender = jest.fn();
    const Probe = ({
      unrelated,
    }: {
      unrelated: number;
    }) => {
      useMediaRange("md");
      probeRender(unrelated);
      return null;
    };

    const parentRender = jest.fn();
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

    const probeRender = jest.fn();
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
