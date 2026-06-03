<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';
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

  const INITIAL_CALLS = 5;
  const LOAD_MORE_CALLS = 20;

  const fetchUniqueJokes = async (
    category: JokeCategory,
    existingIds: SvelteSet<string>,
    callCount: number,
  ): Promise<Joke[]> => {
    const fetched = await Promise.all(
      Array.from({ length: callCount }, () => api.getJokeByCategory(category)),
    );

    const seen = new SvelteSet(existingIds);

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
      const jokes = await fetchUniqueJokes(category, new SvelteSet(), INITIAL_CALLS);

      categoryJokes = jokes;
      hasMore = jokes.length > 0;
    } catch (error) {
      console.error('[HomeCategoriesSection] Failed to load jokes for category', {
        category,
        error,
      });
      categoryJokes = [];
      hasMore = false;
    } finally {
      isLoadingCategoryJokes = false;
    }
  };

  const handleLoadMore = async () => {
    if (!selectedCategory) return;
    isLoadingCategoryJokes = true;

    try {
      const existingIds = new SvelteSet(categoryJokes.map((j) => j.id));

      const newJokes = await fetchUniqueJokes(selectedCategory, existingIds, LOAD_MORE_CALLS);

      categoryJokes = [...categoryJokes, ...newJokes];
      hasMore = newJokes.length > 0;
    } catch (error) {
      console.error('[HomeCategoriesSection] Failed to load more jokes', {
        category: selectedCategory,
        error,
      });
      hasMore = false;
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

  <ul class="flex flex-wrap justify-center gap-2" aria-label="Joke categories">
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
      heading={selectedCategory}
      jokes={categoryJokes}
      isLoading={isLoadingCategoryJokes}
      {hasMore}
      onLoadMore={handleLoadMore}
    />
  {/if}
</UiContainer>
