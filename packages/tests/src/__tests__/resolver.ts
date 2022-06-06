import { execSync } from "child_process";
import * as path from "path";
import { existsSync } from "fs";

describe("Important files should be resolvable", () => {
  it("should work in a CJS context", () => {
    expect(
      require.resolve("@blocz/react-responsive"),
    ).not.toBeNull();
    expect(
      require.resolve(
        "@blocz/react-responsive/package.json",
      ),
    ).not.toBeNull();
  });

  it("should work in a ESM context", () => {
    expect(
      execSync("node ./esm.mjs", {
        cwd: __dirname,
        encoding: "utf-8",
      }),
    ).toBe("Didn’t crash\n");
  });
});

describe("built files", () => {
  it("should contain all necessary files", () => {
    const BRRPath = path.dirname(
      require.resolve(
        "@blocz/react-responsive/package.json",
      ),
    );

    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.js"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(
          BRRPath,
          "lib/react-responsive.modern.js",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(
          BRRPath,
          "lib/react-responsive.modern.mjs",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(BRRPath, "lib/react-responsive.umd.js"),
      ),
    ).toBe(true);
  });
});
