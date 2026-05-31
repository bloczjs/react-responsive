import { describe, it, expect, afterEach, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { cleanup, setMedia } from "mock-match-media";

import { useMediaQuery } from "@blocz/react-responsive";

const Probe = ({
  query,
  onRender,
}: {
  query: string;
  onRender: (value: boolean) => void;
}) => {
  const value = useMediaQuery(query);
  onRender(value);
  return null;
};

const wait = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

afterEach(() => {
  cleanup();
});

describe("useMediaQuery", () => {
  it("reacts to media changes after mount", async () => {
    setMedia({ width: 1000 });

    const onRender = vi.fn();
    render(
      <Probe
        query="(min-width:1200px)"
        onRender={onRender}
      />,
    );

    expect(onRender.mock.calls.at(-1)?.[0]).toBe(false);

    await act(async () => {
      setMedia({ width: 1300 });
      await wait(0);
    });

    expect(onRender.mock.calls.at(-1)?.[0]).toBe(true);
  });

  it("re-subscribes when the query changes", async () => {
    setMedia({ width: 1000 });

    const onRender = vi.fn();
    const { rerender } = render(
      <Probe
        query="(min-width:500px)"
        onRender={onRender}
      />,
    );

    expect(onRender.mock.calls.at(-1)?.[0]).toBe(true);

    rerender(
      <Probe
        query="(min-width:2000px)"
        onRender={onRender}
      />,
    );

    expect(onRender.mock.calls.at(-1)?.[0]).toBe(false);

    await act(async () => {
      setMedia({ width: 2500 });
      await wait(0);
    });

    expect(onRender.mock.calls.at(-1)?.[0]).toBe(true);
  });

  it("removes the listener on unmount", () => {
    setMedia({ width: 1000 });

    const addListener = vi.fn();
    const removeListener = vi.fn();
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = ((query: string) => {
      const mql = originalMatchMedia(query);
      const origAdd = mql.addListener.bind(mql);
      const origRemove = mql.removeListener.bind(mql);
      mql.addListener = (cb) => {
        addListener(cb);
        return origAdd(cb);
      };
      mql.removeListener = (cb) => {
        removeListener(cb);
        return origRemove(cb);
      };
      return mql;
    }) as typeof window.matchMedia;

    try {
      const onRender = vi.fn();
      const { unmount } = render(
        <Probe
          query="(min-width:500px)"
          onRender={onRender}
        />,
      );

      expect(addListener).toHaveBeenCalledTimes(1);
      expect(removeListener).not.toHaveBeenCalled();

      unmount();

      expect(removeListener).toHaveBeenCalledTimes(1);
      expect(removeListener.mock.calls[0][0]).toBe(
        addListener.mock.calls[0][0],
      );
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
