import { afterEach } from "vitest";
import {
  matchMedia,
  MediaQueryListEvent,
  cleanup,
} from "mock-match-media";

// Override the browser's native matchMedia so setMedia() controls query results.
Object.assign(window, { matchMedia, MediaQueryListEvent });

afterEach(() => {
  cleanup();
});
