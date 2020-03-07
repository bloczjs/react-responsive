import { renderToString } from "react-dom/server";

import App from "../App";

it("Should render in SSR", () => {
  expect(
    renderToString(App)
      .replace(/<\/[^>]*>/g, match => `${match}\n`)
      .replace(/<[^>]*\/>/g, match => `\n${match}\n`)
      .replace(/<[^/>]*>/g, match => `\n${match}`),
  ).toMatchSnapshot();
});
