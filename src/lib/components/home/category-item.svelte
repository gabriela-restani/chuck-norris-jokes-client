<script lang="ts">
  import UiButton from '$lib/components/ui/ui-button.svelte';

  type CategoryItemProps = {
    category: string;
    isSelected?: boolean;
    onclick: () => void;
  };

  let { category, isSelected = false, onclick }: CategoryItemProps = $props();
</script>

<li>
  <UiButton
    behavior="fit"
    size="sm"
    color={isSelected ? 'leather-brown' : 'soft-black'}
    variant={isSelected ? 'primary' : 'secondary'}
    aria-pressed={isSelected}
    class="tracking-wide uppercase {isSelected ? '' : 'bg-cream-100'}"
    {onclick}
  >
    <span class={isSelected ? '' : 'text-leather-brown-600'}>#</span>
    {category}
  </UiButton>
</li>
