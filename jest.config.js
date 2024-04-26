export const moduleNameMapper = {
  "^@src/(.*)$": "<rootDir>/src/$1",
};
export const testMatch = [
  "**/__tests__/**/*.{ts,tsx}",
  "**/?(*.)(spec|test).{ts,tsx}",
];
export const transform = {
  "^.+\\.(ts|tsx)$": "ts-jest",
};
