import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  reporters: ["default", "summary"],
  coverageDirectory: "./coverage",
  collectCoverage: true,
  coverageReporters: ["html", "lcov", "text"],
  watch: true,
  verbose: true,
  //setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
