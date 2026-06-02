<script lang="ts">
  import UiButton from '$lib/components/ui/ui-button.svelte';

  type CategoryItemProps = {
    category: string;
    isSelected?: boolean;
    onclick: () => void;
  };

  let { category, isSelected = false, onclick }: CategoryItemProps = $props();
</script>

<li
  class="flex items-center justify-center rounded-lg border-2 px-4 py-2 text-sm transition-colors duration-300 focus-within:ring-2 focus-within:ring-deep-blue-500 focus-within:outline-none {isSelected
    ? 'border-red-600 bg-deep-blue-900 text-cream-100'
    : 'border-deep-blue-300 bg-deep-blue-700 text-cream-100 hover:border-deep-blue-500 hover:bg-deep-blue-800'}"
>
  <UiButton
    color={isSelected ? 'cream' : 'soft-black'}
    variant="secondary"
    behavior="inline-block"
    {onclick}
  >
    {category}
  </UiButton>
</li>
