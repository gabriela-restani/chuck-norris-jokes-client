<script lang="ts">
  import HomeHeroSection from '$lib/components/home/home-hero-section.svelte';
  import HomeCategoriesSection from '$lib/components/home/home-categories-section.svelte';

  let categories = $state<string[]>([]);

  const handleSearch = (query: string) => {
    console.log('Search button clicked! Implement search functionality here.', query);
  };

  const handleCategoryClick = (category: string) => {
    console.log(`Category button clicked: ${category}`);
  };
</script>

<HomeHeroSection onSearch={handleSearch} />
<HomeCategoriesSection {categories} onCategoryClick={handleCategoryClick} />
