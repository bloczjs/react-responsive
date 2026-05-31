import { beforeAll, afterAll, it, expect } from "vitest";
import * as path from "path";
import { spawn, type ChildProcess } from "child_process";
import {
  chromium,
  type Browser,
  type Page,
} from "playwright";

import { sizes } from "./sizes.util";

const PORT = 3000;
const root = path.resolve(__dirname, "../..");

let serverProcess: ChildProcess;
let browser: Browser;
let page: Page;

async function waitForServer(url: string, timeout = 20000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((res) => setTimeout(res, 200));
    }
  }
  throw new Error(
    `Server at ${url} did not start within ${timeout}ms`,
  );
}

beforeAll(async () => {
  serverProcess = spawn("pnpm", ["start"], {
    cwd: root,
    shell: true,
  });

  await waitForServer(`http://localhost:${PORT}`);

  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
}, 30000);

afterAll(async () => {
  await browser?.close();
  serverProcess.kill("SIGTERM");
});

const getText = async () =>
  (await page.$eval("body", (el) =>
    (el as HTMLElement).innerText
      .replace(/\n/g, "\n\n")
      .replace(/\n\n+/g, "\n\n"),
  )) || "";

it("browser test", async () => {
  await page.goto(`http://localhost:${PORT}`);

  for (const size of sizes) {
    await page.setViewportSize(size);
    // Wait until the page reports the new viewport, then for two
    // animation frames so React effects triggered by the media-query
    // change have a chance to commit before we snapshot the DOM.
    await page.waitForFunction(
      (s) =>
        window.innerWidth === s.width &&
        window.innerHeight === s.height,
      size,
    );
    await page.evaluate(
      () =>
        new Promise<void>((res) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => res()),
          ),
        ),
    );
    expect(await getText()).toMatchSnapshot();
  }
});
