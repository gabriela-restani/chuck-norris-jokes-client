<script lang="ts">
  import type { Snippet } from 'svelte';

  type Color = 'red' | 'deep-blue' | 'leather-brown' | 'soft-black' | 'cream';
  type Variant = 'primary' | 'secondary' | 'tertiary';
  type Size = 'sm' | 'md' | 'large';
  type Behavior = 'inline-block' | 'block' | 'inline' | 'fit';

  type UiButtonProps = {
    behavior?: Behavior;
    variant?: Variant;
    color?: Color;
    size?: Size;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    wrapText?: boolean;
    'aria-pressed'?: boolean;
    class?: string;
    children: Snippet;
    onclick?: (event: MouseEvent) => void;
  };

  let {
    behavior = 'inline-block',
    variant = 'primary',
    color = 'red',
    size = 'md',
    type = 'button',
    disabled = false,
    wrapText = false,
    'aria-pressed': ariaPressed,
    class: className,
    children,
    onclick,
  }: UiButtonProps = $props();

  const variantColorMap: Record<Variant, Record<Color, string>> = {
    primary: {
      red: 'border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800 focus:ring-red-700',
      'deep-blue':
        'border-deep-blue-700 bg-deep-blue-700 text-white hover:border-deep-blue-800 hover:bg-deep-blue-800 focus:ring-deep-blue-700',
      'leather-brown':
        'border-leather-brown-700 bg-leather-brown-700 text-white hover:border-leather-brown-800 hover:bg-leather-brown-800 focus:ring-leather-brown-700',
      'soft-black':
        'border-soft-black-700 bg-soft-black-700 text-white hover:border-soft-black-800 hover:bg-soft-black-800 focus:ring-soft-black-700',
      cream:
        'border-cream-100 bg-cream-700 text-cream-950 hover:border-cream-800 hover:bg-cream-800 focus:ring-cream-700',
    },
    secondary: {
      red: 'border-red-700 bg-transparent text-red-700 hover:bg-red-700 hover:text-white focus:ring-red-700',
      'deep-blue':
        'border-deep-blue-700 bg-transparent text-deep-blue-700 hover:bg-deep-blue-700 hover:text-white focus:ring-deep-blue-700',
      'leather-brown':
        'border-leather-brown-700 bg-transparent text-leather-brown-700 hover:bg-leather-brown-700 hover:text-white focus:ring-leather-brown-700',
      'soft-black':
        'border-soft-black-700 bg-transparent text-soft-black-700 hover:bg-soft-black-700 hover:text-white focus:ring-soft-black-700',
      cream:
        'border-cream-100 bg-transparent text-cream-100 hover:bg-cream-100 hover:text-cream-950 focus:ring-cream-300',
    },
    tertiary: {
      red: 'border-transparent bg-transparent text-red-700 hover:text-red-800 hover:underline focus:ring-red-700',
      'deep-blue':
        'border-transparent bg-transparent text-deep-blue-700 hover:text-deep-blue-800 hover:underline focus:ring-deep-blue-700',
      'leather-brown':
        'border-transparent bg-transparent text-leather-brown-700 hover:text-leather-brown-800 hover:underline focus:ring-leather-brown-700',
      'soft-black':
        'border-transparent bg-transparent text-soft-black-700 hover:text-soft-black-800 hover:underline focus:ring-soft-black-700',
      cream:
        'border-transparent bg-transparent text-cream-700 hover:text-cream-800 hover:underline focus:ring-cream-700',
    },
  };

  const sizeMap: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const behaviorMap: Record<Behavior, string> = {
    'inline-block': 'inline-block w-full flex-1',
    block: 'block w-full',
    inline: 'inline',
    fit: 'inline-flex items-center gap-1',
  };

  const classes = $derived(
    [
      'cursor-pointer rounded-md border-2 font-oswald transition-colors duration-300',
      'focus:ring-2 focus:ring-opacity-50 focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      wrapText ? 'whitespace-normal' : 'whitespace-nowrap',
      behaviorMap[behavior],
      sizeMap[size],
      variantColorMap[variant][color],
      className,
    ]
      .filter(Boolean)
      .join(' '),
  );
</script>

<button {type} {disabled} {onclick} aria-pressed={ariaPressed} class={classes}>
  {@render children()}
</button>
