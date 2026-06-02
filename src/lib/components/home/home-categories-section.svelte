<script lang="ts">
  import UiContainer from '$lib/components/ui/ui-container.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiText from '$lib/components/ui/ui-text.svelte';
  import CategoryItem from '$lib/components/home/category-item.svelte';

  type HomeCategoriesSectionProps = {
    categories: string[];
    onCategoryClick: (category: string) => void;
  };

  let { categories, onCategoryClick }: HomeCategoriesSectionProps = $props();
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
      <CategoryItem {category} onclick={() => onCategoryClick(category)} />
    {/each}
  </ul>
</UiContainer>
