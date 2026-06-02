import { ChuckNorrisApi } from '$lib/services/chuck-norris-api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const api = new ChuckNorrisApi(fetch);
  const [joke, categories] = await Promise.all([api.getRandomJoke(), api.getJokeCategories()]);
  return { joke, categories };
};
