// jest.config.ts
export default {
  preset: "ts-jest",
  // transform: { "^.+\\.ts?$": "ts-jest" },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // "\\.css$": "identity-obj-proxy",
    // "\\.scss$": "identity-obj-proxy",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
  },
  collectCoverageFrom: ["<rootDir>/**/*.{ts, tsx}"],
  roots: ["<rootDir>"],
  testRegex: "(/tests/jest/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    // "^.+\\.(ts|tsx)$": "ts-jest",
    // "^.+\\.svg$": "<rootDir>/utils/svgTransform.js",
  },
  // setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  testEnvironment: "jsdom",
};
