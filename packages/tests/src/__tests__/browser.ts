import "../App";

import { sizes } from "./sizes.util";

const sleep = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const getText = async () => {
  await sleep(50); // ensure that the hooks have time to update
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
    expect(await getText()).toMatchSnapshot();
    expect(
      await page.$eval(
        "#css-in-js",
        (el) => window.getComputedStyle(el).color,
      ),
    ).toBe(
      size.width > 900
        ? "rgb(0, 128, 0)" // green
        : "rgb(255, 0, 0)", // red
    );
  }
});
