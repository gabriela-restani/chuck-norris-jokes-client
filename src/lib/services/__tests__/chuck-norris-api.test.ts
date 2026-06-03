import { describe, expect, it, vi } from 'vitest';

import { ChuckNorrisApi } from '$lib/services/chuck-norris-api';

describe('ChuckNorrisApi fallback behavior', () => {
  it('returns a fallback joke when the API request fails', async () => {
    const api = new ChuckNorrisApi(vi.fn().mockRejectedValue(new Error('network down')));

    await expect(api.getRandomJoke()).resolves.toMatchObject({
      value: expect.stringContaining('Chuck Norris'),
      categories: expect.any(Array),
    });
  });

  it('returns fallback categories when the API responds with an error status', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });
    const api = new ChuckNorrisApi(fetchFn);

    await expect(api.getJokeCategories()).resolves.toEqual(
      expect.arrayContaining(['dev']),
    );
  });
});
