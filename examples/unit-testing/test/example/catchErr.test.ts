import { catchErr, catchErr2, catchErr3 } from '../../src/example';

describe('catchErr', () => {
  it('1', async () => {
    const bool = await catchErr();
    expect(bool).toBe(true);
  });

  it('2', async () => {
    const bool = await catchErr2();
    expect(bool).toBe(true);
  });

  it('3', () => {
    const bool = catchErr3();
    expect(bool).toBe(true);
  });
});

