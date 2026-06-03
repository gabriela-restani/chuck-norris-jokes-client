<script lang="ts">
  import type { Snippet } from 'svelte';

  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  type Weight = 'medium' | 'semibold' | 'bold';
  type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';
  type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

  type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

  type UiTitleProps = {
    tag?: Tag;
    size?: Responsive<Size>;
    weight?: Responsive<Weight>;
    class?: string;
    id?: string;
    children: Snippet;
  };

  let {
    tag = 'h2',
    size = 'md',
    weight = 'semibold',
    class: className,
    id,
    children,
  }: UiTitleProps = $props();

  const sizeMap: Record<Breakpoint, Record<Size, string>> = {
    base: {
      xs: 'text-xl',
      sm: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl',
      xl: 'text-5xl',
      '2xl': 'text-6xl',
      '3xl': 'text-7xl',
      '4xl': 'text-8xl',
      '5xl': 'text-9xl',
    },
    sm: {
      xs: 'sm:text-xl',
      sm: 'sm:text-2xl',
      md: 'sm:text-3xl',
      lg: 'sm:text-4xl',
      xl: 'sm:text-5xl',
      '2xl': 'sm:text-6xl',
      '3xl': 'sm:text-7xl',
      '4xl': 'sm:text-8xl',
      '5xl': 'sm:text-9xl',
    },
    md: {
      xs: 'md:text-xl',
      sm: 'md:text-2xl',
      md: 'md:text-3xl',
      lg: 'md:text-4xl',
      xl: 'md:text-5xl',
      '2xl': 'md:text-6xl',
      '3xl': 'md:text-7xl',
      '4xl': 'md:text-8xl',
      '5xl': 'md:text-9xl',
    },
    lg: {
      xs: 'lg:text-xl',
      sm: 'lg:text-2xl',
      md: 'lg:text-3xl',
      lg: 'lg:text-4xl',
      xl: 'lg:text-5xl',
      '2xl': 'lg:text-6xl',
      '3xl': 'lg:text-7xl',
      '4xl': 'lg:text-8xl',
      '5xl': 'lg:text-9xl',
    },
    xl: {
      xs: 'xl:text-xl',
      sm: 'xl:text-2xl',
      md: 'xl:text-3xl',
      lg: 'xl:text-4xl',
      xl: 'xl:text-5xl',
      '2xl': 'xl:text-6xl',
      '3xl': 'xl:text-7xl',
      '4xl': 'xl:text-8xl',
      '5xl': 'xl:text-9xl',
    },
  };

  const weightMap: Record<Breakpoint, Record<Weight, string>> = {
    base: {
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    sm: {
      medium: 'sm:font-medium',
      semibold: 'sm:font-semibold',
      bold: 'sm:font-bold',
    },
    md: {
      medium: 'md:font-medium',
      semibold: 'md:font-semibold',
      bold: 'md:font-bold',
    },
    lg: {
      medium: 'lg:font-medium',
      semibold: 'lg:font-semibold',
      bold: 'lg:font-bold',
    },
    xl: {
      medium: 'xl:font-medium',
      semibold: 'xl:font-semibold',
      bold: 'xl:font-bold',
    },
  };

  function resolve<T extends string>(
    value: T | Partial<Record<Breakpoint, T>>,
    map: Record<Breakpoint, Record<T, string>>,
  ): string {
    if (typeof value === 'string') return map.base[value];
    return (Object.entries(value) as [Breakpoint, T][]).map(([bp, v]) => map[bp][v]).join(' ');
  }

  const classes = $derived(
    ['font-bebas', resolve(size, sizeMap), resolve(weight, weightMap), className]
      .filter(Boolean)
      .join(' '),
  );
</script>

<svelte:element this={tag} {id} class={classes}>
  {@render children()}
</svelte:element>
