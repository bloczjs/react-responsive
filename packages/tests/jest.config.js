module.exports = {
  roots: ["<rootDir>/src"],
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest",
  },
  testPathIgnorePatterns: [".*\\.util\\..*"],
  moduleDirectories: [
    "<rootDir>/node_modules",
    "<rootDir>/../../node_modules",
  ],
};
