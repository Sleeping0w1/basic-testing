import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';
import lodash from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    return expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.withdraw.bind(account, 120)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    expect(account.transfer.bind(account, 120, account2)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.transfer.bind(account, 120, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    account.deposit(50);
    return expect(account.getBalance()).toBe(initialBalance + 50);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    account.withdraw(50);
    return expect(account.getBalance()).toBe(initialBalance - 50);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    account.transfer(50, account2);
    return expect(
      account.getBalance() === initialBalance - 50 &&
        account2.getBalance() === initialBalance + 50,
    ).toBeTruthy();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockRandom = jest.mocked(lodash.random);
    mockRandom.mockReturnValueOnce(50);
    mockRandom.mockReturnValueOnce(1);

    const account = getBankAccount(100);
    const result = await account.fetchBalance();

    return expect(result).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockRandom = jest.mocked(lodash.random);
    mockRandom.mockReturnValueOnce(50);
    mockRandom.mockReturnValueOnce(1);

    const account = getBankAccount(100);
    await account.synchronizeBalance();

    return expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockRandom = lodash.random as jest.Mock;
    mockRandom.mockReturnValueOnce(50);
    mockRandom.mockReturnValueOnce(0);

    const account = getBankAccount(100);
    return expect(account.synchronizeBalance.bind(account)).rejects.toThrow(new SynchronizationFailedError());
  });
});
