import type { Joke, JokeCategory, JokeSearchResult } from '$lib/types/chuck-norris';

const BASE_URL = 'https://api.chucknorris.io/jokes';

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
    const response = await this.fetchFn(url);

    if (!response.ok) {
      throw new Error(`Chuck Norris API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}
