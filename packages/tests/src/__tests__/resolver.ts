import { execSync } from "child_process";

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
      execSync(
        "node --experimental-json-modules ./esm.mjs",
        {
          cwd: __dirname,
          encoding: "utf-8",
        },
      ),
    ).toBe("Didn’t crash\n");
  });
});

describe("built files", () => {
  it("should contain all necessary files", () => {
    expect(
      require.resolve(
        "@blocz/react-responsive/lib/react-responsive.js",
      ),
    ).not.toBeNull();
    expect(
      require.resolve(
        "@blocz/react-responsive/lib/react-responsive.modern.js",
      ),
    ).not.toBeNull();
    expect(
      require.resolve(
        "@blocz/react-responsive/lib/react-responsive.modern.mjs",
      ),
    ).not.toBeNull();
    expect(
      require.resolve(
        "@blocz/react-responsive/lib/react-responsive.umd.js",
      ),
    ).not.toBeNull();
  });
});
