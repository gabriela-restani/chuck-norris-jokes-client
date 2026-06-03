export type Joke = {
  id: string;
  value: string;
  url: string;
  icon_url: string;
  categories: string[];
  created_at: string;
  updated_at: string;
};

export type JokeSearchResult = {
  total: number;
  result: Joke[];
};

export type JokeCategory = string;
