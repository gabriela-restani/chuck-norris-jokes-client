<script lang="ts">
  import UiButton from '$lib/components/ui/ui-button.svelte';

  type CategoryItemProps = {
    category: string;
    onclick: () => void;
  };

  let { category, onclick }: CategoryItemProps = $props();
</script>

<li
  class="flex items-center justify-center rounded-lg border-2 border-deep-blue-300 bg-deep-blue-700 px-4 py-2 text-sm text-cream-100 transition-colors duration-300 focus-within:ring-2 focus-within:ring-deep-blue-500 focus-within:outline-none hover:border-deep-blue-500 hover:bg-deep-blue-800"
>
  <UiButton color="soft-black" variant="secondary" behavior="inline-block" {onclick}>
    {category}
  </UiButton>
</li>
