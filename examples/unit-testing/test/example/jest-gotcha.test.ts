import { readFileSync } from 'fs';

describe('Error', () => {
  it('an error must be of instance Error', () => {
    try {
      readFileSync('some file that does not exist');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

