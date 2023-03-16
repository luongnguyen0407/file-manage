module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!src/index.tsx",
    "!src/reportWebVitals.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  coverageReporters: ["text", "html"],
  snapshotSerializers: [],
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
};
