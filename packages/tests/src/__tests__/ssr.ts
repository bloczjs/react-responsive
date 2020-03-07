/**
 * @jest-environment jsdom
 */

import { render, act } from "@testing-library/react";

import "mock-match-media/polyfill";

import { setMedia } from "mock-match-media";
import { sizes } from "./sizes.util";

import App from "../App";

const inline = new Set(["</b>", "</span>"]);

const prettify = (input: string) =>
  input
    .replace(/<[^/>]*>/g, ``) // opening tag
    .replace(/<\/[^>]*>/g, match =>
      inline.has(match) ? ` ` : `\n\n`,
    ) // closing tag
    .replace(/\n\n+/g, "\n\n")
    .replace(/ +/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const wait = (ms: number) =>
  new Promise(res => setTimeout(res, ms));

it("Should render in SSR", async () => {
  for (const size of sizes) {
    await act(async () => {
      setMedia({
        width: `${size.width}px`,
        height: `${size.height}px`,
      });

      await wait(10);

      expect(
        prettify(render(App).baseElement.outerHTML),
      ).toMatchSnapshot();

      await wait(10);
    });
  }
});
