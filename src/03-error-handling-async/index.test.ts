import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    return expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'test';
    return expect(throwError.bind(this, message)).toThrow(new Error(message));
  });

  test('should throw error with default message if message is not provided', () => {
    return expect(throwError).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    return expect(throwCustomError).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError).rejects.toThrow(new MyAwesomeError());
  });
});
