import "../App";

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

  // on extra small device
  await page.setViewport({
    width: 500,
    height: 300,
  });
  expect(await getText()).toMatchSnapshot();

  // on small device
  await page.setViewport({
    width: 750,
    height: 550,
  });
  expect(await getText()).toMatchSnapshot();

  // on medium device
  await page.setViewport({
    width: 900,
    height: 700,
  });
  expect(await getText()).toMatchSnapshot();

  // on large device
  await page.setViewport({
    width: 1000,
    height: 800,
  });
  expect(await getText()).toMatchSnapshot();

  // on extra large device
  await page.setViewport({
    width: 1300,
    height: 1100,
  });
  expect(await getText()).toMatchSnapshot();
});
