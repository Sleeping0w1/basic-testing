import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;
  let mockInstance: { get: jest.Mock };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGet = jest.fn();
    mockInstance = { get: mockGet };
    mockedAxios.create.mockReturnValue(mockInstance as any);
    mockGet.mockResolvedValue({ data: 'test' });
  });

  test('should create instance with provided base url', async () => {
    const url = 'test';
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const promise = throttledGetDataFromApi(url);
    jest.runAllTimers();
    await promise;

    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const url = 'test';

    const promise = throttledGetDataFromApi(url);
    jest.runAllTimers();
    await promise;

    expect(mockGet).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const url = 'test';
    const promise = throttledGetDataFromApi(url);
    jest.runAllTimers();

    expect(await promise).toBe('test');
  });
});
