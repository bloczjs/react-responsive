module.exports = {
  roots: ["<rootDir>/src"],
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest"
  }
};
