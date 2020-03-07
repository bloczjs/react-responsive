import "../App";

import { sizes } from "./sizes";

const sleep = (ms: number) =>
  new Promise(res => setTimeout(res, ms));

const getText = async () => {
  await sleep(50); // ensure that the hooks have time to update
  return (
    (await page.$eval(
      "body",
      el => (el as HTMLElement).innerText,
    )) || ""
  );
};

it("browser test", async () => {
  await page.goto("http://localhost:3000");

  for (const size of sizes) {
    await page.setViewport(size);
    expect(await getText()).toMatchSnapshot();
  }
});
