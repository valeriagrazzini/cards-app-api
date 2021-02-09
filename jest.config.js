module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  globals: {},
}
