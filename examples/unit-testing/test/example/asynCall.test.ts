import { asyncCall, asyncCallFailed, catchErrMessage } from '../../src/example';

describe('Name of the file being tested', () => {
  it('should describe what is being tested. Optionally put in function/method name', () => {
    expect(1 + 2).toBe(3)
  })

  it('should return a value from asyncCall', async () => {
    const result = await asyncCall();
    expect(result).toBe('this works as expected');
  });

  it('should throw error when calling asyncCallFailed', async () => {
    expect(async () => await asyncCallFailed()).rejects.toThrowError('this DID NOT work');
  });

  describe('Handle errors', () => {
    it('should catch error and return error message', async () => {
      const errMessage = await catchErrMessage();
      expect(errMessage).toBe('Error has been caught and reported');
    });
  })
});

