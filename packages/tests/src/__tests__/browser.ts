import "../App";

import { sizes } from "./sizes.util";

const getText = async () => {
  return (
    (await page.$eval("body", (el) =>
      (el as HTMLElement).innerText
        .replace(/\n/g, "\n\n")
        .replace(/\n\n+/g, "\n\n"),
    )) || ""
  );
};

it("browser test", async () => {
  await page.goto("http://localhost:3000");

  for (const size of sizes) {
    await page.setViewport(size);
    // Wait until the page reports the new viewport, then for two
    // animation frames so React effects triggered by the media-query
    // change have a chance to commit before we snapshot the DOM.
    await page.waitForFunction(
      (w: number, h: number) =>
        window.innerWidth === w && window.innerHeight === h,
      {},
      size.width,
      size.height,
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
