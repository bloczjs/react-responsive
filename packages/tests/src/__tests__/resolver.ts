import { execSync } from "child_process";
import * as path from "path";
import * as vm from "vm";
import { existsSync, readFileSync } from "fs";
import * as React from "react";

describe("Important files should be resolvable", () => {
  it("should work in a CJS context", () => {
    expect(
      require.resolve("@blocz/react-responsive"),
    ).not.toBeNull();
    expect(
      require.resolve("@blocz/react-responsive/package.json"),
    ).not.toBeNull();
  });

  it("should work in a ESM context", () => {
    expect(
      execSync("node ./esm.util.mjs", {
        cwd: __dirname,
        encoding: "utf-8",
      }),
    ).toBe("Didn’t crash\n");
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

  it("should expose the UMD build as window['@blocz/react-responsive']", () => {
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
    expect(typeof exposed.Only).toBe("function");
    expect(typeof exposed.useBreakpoint).toBe("function");
    expect(typeof exposed.useMediaQuery).toBe("function");
    expect(typeof exposed.BreakpointsProvider).toBe(
      "function",
    );
    expect(exposed.BreakpointsContext).toBeDefined();
  });
});
