import type { Joke, JokeCategory, JokeSearchResult } from '$lib/types/chuck-norris';

const BASE_URL = 'https://api.chucknorris.io/jokes';

const FALLBACK_JOKE: Joke = {
  id: 'fallback-joke',
  value: 'Chuck Norris always keeps the API online. The fallback joke is ready for you.',
  url: 'https://api.chucknorris.io/jokes/fallback',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  categories: ['dev'],
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
};

const FALLBACK_CATEGORIES: JokeCategory[] = ['dev'];

const FALLBACK_SEARCH_RESULT: JokeSearchResult = {
  total: 0,
  result: [],
};

export interface IChuckNorrisApi {
  getJokeByQuery(query: string): Promise<JokeSearchResult>;
  getJokeByCategory(category: JokeCategory): Promise<Joke>;
  getRandomJoke(): Promise<Joke>;
  getJokeCategories(): Promise<JokeCategory[]>;
}

export class ChuckNorrisApi implements IChuckNorrisApi {
  constructor(private readonly fetchFn: typeof fetch = fetch) {}

  async getJokeByQuery(query: string): Promise<JokeSearchResult> {
    return this.request<JokeSearchResult>(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}`,
    );
  }

  async getJokeByCategory(category: JokeCategory): Promise<Joke> {
    return this.request<Joke>(
      `${BASE_URL}/random?category=${encodeURIComponent(category)}`,
    );
  }

  async getRandomJoke(): Promise<Joke> {
    return this.request<Joke>(`${BASE_URL}/random`);
  }

  async getJokeCategories(): Promise<JokeCategory[]> {
    return this.request<JokeCategory[]>(`${BASE_URL}/categories`);
  }

  private async request<T>(url: string): Promise<T> {
    try {
      const response = await this.fetchFn(url);

      if (!response.ok) {
        console.error('[ChuckNorrisAPI] API returned an error response', {
          url,
          status: response.status,
          statusText: response.statusText,
        });

        return this.getFallbackResponse<T>(url);
      }

      return (await response.json()) as Promise<T>;
    } catch (error) {
      console.error('[ChuckNorrisAPI] API request failed', {
        url,
        error,
      });

      return this.getFallbackResponse<T>(url);
    }
  }

  private getFallbackResponse<T>(url: string): T {
    if (url.includes('/search?query=')) {
      return FALLBACK_SEARCH_RESULT as T;
    }

    if (url.includes('/categories')) {
      return FALLBACK_CATEGORIES as T;
    }

    return FALLBACK_JOKE as T;
  }
}
