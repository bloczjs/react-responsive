import { renderToString } from "react-dom/server";

import App from "../App";

it("Should render in SSR", () => {
  expect(renderToString(App)).toMatchSnapshot();
});
