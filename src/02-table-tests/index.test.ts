// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 20, b: 2, action: Action.Divide, expected: 10 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'invalid', expected: null },
  { a: 'invalid', b: 3, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should return $expected when $a $action $b', ({ a, b, action, expected }) => {
    return expect(simpleCalculator({ a: a, b: b, action: action })).toBe(
      expected,
    );
  });
});
