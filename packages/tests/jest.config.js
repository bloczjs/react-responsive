module.exports = {
  roots: ["<rootDir>/src"],
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest",
  },
  setupFiles: ["mock-match-media/jest-setup"],
  testPathIgnorePatterns: [".*\\.util\\..*"],
  moduleDirectories: [
    "<rootDir>/node_modules",
    "<rootDir>/../../node_modules",
  ],
};
