<script lang="ts">
  import { ChuckNorrisApi } from '$lib/services/chuck-norris-api';
  import type { Joke, JokeCategory } from '$lib/types/chuck-norris';
  import UiContainer from '$lib/components/ui/ui-container.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiText from '$lib/components/ui/ui-text.svelte';
  import CategoryItem from '$lib/components/home/category-item.svelte';
  import CategoryJokesList from '$lib/components/home/category-jokes-list.svelte';

  type HomeCategoriesSectionProps = {
    categories: JokeCategory[];
  };

  let { categories }: HomeCategoriesSectionProps = $props();

  const api = new ChuckNorrisApi();

  let selectedCategory = $state<JokeCategory | null>(null);
  let categoryJokes = $state<Joke[]>([]);
  let isLoadingCategoryJokes = $state(false);
  let hasMore = $state(false);

  // Initial load uses 5 calls (no existing jokes to compete with).
  // Load more uses 20 calls to reliably surface remaining jokes against a growing seen set.
  const INITIAL_CALLS = 5;
  const LOAD_MORE_CALLS = 20;

  const fetchUnique = async (
    category: JokeCategory,
    existingIds: Set<string>,
    callCount: number,
  ): Promise<Joke[]> => {
    const fetched = await Promise.all(
      Array.from({ length: callCount }, () => api.getJokeByCategory(category)),
    );
    const seen = new Set(existingIds);
    return fetched.filter((joke) => {
      if (seen.has(joke.id)) return false;
      seen.add(joke.id);
      return true;
    });
  };

  const handleCategoryClick = async (category: JokeCategory) => {
    if (selectedCategory === category) {
      selectedCategory = null;
      categoryJokes = [];
      hasMore = false;
      return;
    }

    selectedCategory = category;
    categoryJokes = [];
    hasMore = false;
    isLoadingCategoryJokes = true;

    try {
      const jokes = await fetchUnique(category, new Set(), INITIAL_CALLS);
      categoryJokes = jokes;
      hasMore = jokes.length > 0;
    } finally {
      isLoadingCategoryJokes = false;
    }
  };

  const handleLoadMore = async () => {
    if (!selectedCategory) return;
    isLoadingCategoryJokes = true;

    try {
      const existingIds = new Set(categoryJokes.map((j) => j.id));
      const newJokes = await fetchUnique(selectedCategory, existingIds, LOAD_MORE_CALLS);
      categoryJokes = [...categoryJokes, ...newJokes];
      // Hide the button only when zero new unique jokes were found
      hasMore = newJokes.length > 0;
    } finally {
      isLoadingCategoryJokes = false;
    }
  };
</script>

<UiContainer
  tag="section"
  class="flex flex-col items-center justify-start gap-6 py-12"
  id="categories"
  aria-labelledby="categories-heading"
>
  <div class="flex flex-col items-center justify-center gap-1">
    <UiTitle
      id="categories-heading"
      tag="h2"
      size="xs"
      weight="semibold"
      class="flex items-center gap-2 text-leather-brown-800"
    >
      <span class="mb-px text-sm">★</span>
      Explore jokes by categories
      <span class="mb-0 text-sm">★</span>
    </UiTitle>

    <UiText tag="p" size="lg" weight="medium" class="text-soft-black-900">
      Find your favorite type of humor!
    </UiText>
  </div>

  <ul
    class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    aria-label="Joke categories"
  >
    {#each categories as category (category)}
      <CategoryItem
        {category}
        isSelected={selectedCategory === category}
        onclick={() => handleCategoryClick(category)}
      />
    {/each}
  </ul>

  {#if selectedCategory}
    <CategoryJokesList
      category={selectedCategory}
      jokes={categoryJokes}
      isLoading={isLoadingCategoryJokes}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
    />
  {/if}
</UiContainer>
