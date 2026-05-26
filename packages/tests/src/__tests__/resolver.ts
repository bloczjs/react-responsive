import { execSync } from "child_process";
import * as path from "path";
import * as vm from "vm";
import { existsSync, readFileSync } from "fs";
import * as React from "react";

// Shape every published build must expose: export name → `typeof` value.
const EXPECTED_SHAPE: Record<string, string> = {
  Only: "function",
  useMediaRange: "function",
  useMediaQuery: "function",
  createMediaRanges: "function",
  DEFAULT_MEDIA_RANGES: "object",
  // Deprecated aliases must still be exposed for backward compatibility.
  MediaRangesProvider: "function",
  MediaRangesContext: "object",
  useBreakpoint: "function",
  BreakpointsProvider: "function",
  BreakpointsContext: "object",
};

const toShape = (
  exposed: Record<string, unknown>,
): Record<string, string> => {
  const shape: Record<string, string> = {};
  for (const key of Object.keys(exposed)) {
    shape[key] = typeof exposed[key];
  }
  return shape;
};

describe("Important files should be resolvable", () => {
  it("should work in a CJS context", () => {
    expect(
      require.resolve("@blocz/react-responsive"),
    ).not.toBeNull();
    expect(
      require.resolve("@blocz/react-responsive/package.json"),
    ).not.toBeNull();
  });
});

describe("built files", () => {
  it("should contain all necessary files", () => {
    const BRRPath = path.dirname(
      require.resolve("@blocz/react-responsive/package.json"),
    );

    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.cjs"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.mjs"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.umd.js"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.d.cts"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.d.mts"),
      ),
    ).toBe(true);
  });

  it("should have identical content in .d.cts and .d.mts", () => {
    const BRRPath = path.dirname(
      require.resolve("@blocz/react-responsive/package.json"),
    );

    const stripSourceMap = (content: string) =>
      content.replace(/\/\/# sourceMappingURL=.*$/m, "");

    const cts = stripSourceMap(
      readFileSync(
        path.join(BRRPath, "lib/react-responsive.d.cts"),
        "utf-8",
      ),
    );
    const mts = stripSourceMap(
      readFileSync(
        path.join(BRRPath, "lib/react-responsive.d.mts"),
        "utf-8",
      ),
    );

    expect(cts).toBe(mts);
  });
});

describe("exposed exports", () => {
  it("CJS build exposes all expected symbols", () => {
    const cjs =
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("@blocz/react-responsive") as Record<
        string,
        unknown
      >;
    expect(toShape(cjs)).toEqual(EXPECTED_SHAPE);
  });

  it("ESM build exposes all expected symbols", () => {
    const output = execSync("node ./esm.util.mjs", {
      cwd: __dirname,
      encoding: "utf-8",
    });
    const shape = JSON.parse(output) as Record<
      string,
      string
    >;

    expect(shape).toEqual(EXPECTED_SHAPE);
  });

  it("UMD build exposes all expected symbols as window['@blocz/react-responsive']", () => {
    const BRRPath = path.dirname(
      require.resolve("@blocz/react-responsive/package.json"),
    );

    const code = readFileSync(
      path.join(BRRPath, "lib/react-responsive.umd.js"),
      "utf-8",
    );

    const sandbox: { [key: string]: unknown } = { React };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);

    const exposed = sandbox[
      "@blocz/react-responsive"
    ] as Record<string, unknown>;
    expect(exposed).toBeDefined();
    expect(toShape(exposed)).toEqual(EXPECTED_SHAPE);
  });
});
