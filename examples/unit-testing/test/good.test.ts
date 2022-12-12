describe('Name of the file being tested', () => {
  it('should describe what is being tested. Optionally put in function/method name', () => {
    expect(1 + 2).toBe(3);
  });

  describe('Describing a group of tests handled under main describe block example: error handling', () => {
    it('should catch error and return error message', async () => {
      const err = () => {
        throw Error();
      }
      expect(err).toThrowError();
    });
  });
});

