module.exports = {
    
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

    setupFilesAfterEnv: ['./jest.setup.js'],
  };