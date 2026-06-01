<script lang="ts">
  import type { Snippet } from 'svelte';

  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type Weight = 'thin' | 'medium' | 'semibold' | 'bold';
  type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';
  type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

  type Tag =
    | 'span'
    | 'p'
    | 'strong'
    | 'em'
    | 'small'
    | 'label'
    | 'figcaption'
    | 'blockquote'
    | 'cite'
    | 'abbr'
    | 'code'
    | 'mark'
    | 'time'
    | 'address'
    | 'caption';

  type UiTextProps = {
    tag?: Tag;
    size?: Responsive<Size>;
    weight?: Responsive<Weight> | Weight;
    class?: string;
    children: Snippet;
  };

  let { tag = 'span', size = 'md', weight = 'medium', class: className, children }: UiTextProps = $props();

  const sizeMap: Record<Breakpoint, Record<Size, string>> = {
    base: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    sm: {
      xs: 'sm:text-xs',
      sm: 'sm:text-sm',
      md: 'sm:text-base',
      lg: 'sm:text-lg',
      xl: 'sm:text-xl',
    },
    md: {
      xs: 'md:text-xs',
      sm: 'md:text-sm',
      md: 'md:text-base',
      lg: 'md:text-lg',
      xl: 'md:text-xl',
    },
    lg: {
      xs: 'lg:text-xs',
      sm: 'lg:text-sm',
      md: 'lg:text-base',
      lg: 'lg:text-lg',
      xl: 'lg:text-xl',
    },
    xl: {
      xs: 'xl:text-xs',
      sm: 'xl:text-sm',
      md: 'xl:text-base',
      lg: 'xl:text-lg',
      xl: 'xl:text-xl',
    },
  };

  const weightMap: Record<Breakpoint, Record<Weight, string>> = {
    base: {
      thin: 'font-thin',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    sm: {
      thin: 'sm:font-thin',
      medium: 'sm:font-medium',
      semibold: 'sm:font-semibold',
      bold: 'sm:font-bold',
    },
    md: {
      thin: 'md:font-thin',
      medium: 'md:font-medium',
      semibold: 'md:font-semibold',
      bold: 'md:font-bold',
    },
    lg: {
      thin: 'lg:font-thin',
      medium: 'lg:font-medium',
      semibold: 'lg:font-semibold',
      bold: 'lg:font-bold',
    },
    xl: {
      thin: 'xl:font-thin',
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
    ['font-oswald', resolve(size, sizeMap), resolve(weight, weightMap), className].filter(Boolean).join(' ')
  );
</script>

<svelte:element this={tag} class={classes}>
  {@render children()}
</svelte:element>
