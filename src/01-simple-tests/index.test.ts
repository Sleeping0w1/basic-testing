import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    return expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    return expect(
      simpleCalculator({ a: 3, b: 2, action: Action.Subtract }),
    ).toBe(1);
  });

  test('should multiply two numbers', () => {
    return expect(
      simpleCalculator({ a: 2, b: 3, action: Action.Multiply }),
    ).toBe(6);
  });

  test('should divide two numbers', () => {
    return expect(
      simpleCalculator({ a: 20, b: 2, action: Action.Divide }),
    ).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    return expect(
      simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate }),
    ).toBe(8);
  });

  test('should return null for invalid action', () => {
    return expect(simpleCalculator({ a: 2, b: 3, action: 'invalid' })).toBe(
      null,
    );
  });

  test('should return null for invalid arguments', () => {
    return expect(
      simpleCalculator({ a: 'invalid', b: 3, action: Action.Exponentiate }),
    ).toBe(null);
  });
});
