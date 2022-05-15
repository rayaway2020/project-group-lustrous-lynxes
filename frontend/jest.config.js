module.exports = {
  testRunner: 'jest-circus/runner',
  setupFiles: ['./jest.setup.js'],
  roots: ['.'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  // https://github.com/kulshekhar/ts-jest/issues/2805
  globals: {
    // This is necessary because next.js forces { "jsx": "preserve" }, but ts-jest appears to require { "jsx": "react" }
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
}
