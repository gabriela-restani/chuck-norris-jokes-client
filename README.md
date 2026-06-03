# Chuck Norris Jokes Client

A web app that consumes the [Chuck Norris API](https://api.chucknorris.io/) to display random and category-based jokes. Built with **SvelteKit 5**, **TypeScript**, and **Tailwind CSS**.

All libraries and tools used in this project are free and open-source.

## Features

- Random joke displayed on the home page
- Browse available joke categories
- Filter jokes by category
- Full-text search with highlighted results
- Share a joke via native browser share or clipboard fallback

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)

## Installation

```sh
pnpm install
```

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm dev -- --open` | Start the server and open in the browser |
| `pnpm build` | Create a production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm check` | Type-check with `svelte-check` |
| `pnpm check:watch` | Type-check in watch mode |
| `pnpm lint` | Check formatting (Prettier) and linting (ESLint) |
| `pnpm format` | Auto-fix formatting with Prettier |
| `pnpm test:unit` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |
| `pnpm test` | Run all tests (unit + e2e) |

> Works on Linux, macOS, and Windows (WSL or native).

## Project structure

```
src/
├── lib/
│   ├── components/
│   │   ├── home/       # Home page components
│   │   ├── layout/     # Header and Footer
│   │   └── ui/         # Reusable components (Button, Toast, etc.)
│   ├── services/       # Chuck Norris API integration
│   ├── stores/         # Svelte stores (e.g. toast)
│   ├── types/          # TypeScript types
│   └── utils/          # Utilities (e.g. share)
└── routes/             # App pages (SvelteKit file-based routing)
```

## Design decisions

### "I'm feeling lucky"

The **random joke card** on the hero section is the "I'm feeling lucky" feature. It intentionally uses a different layout than the search results list: casual users who just want to laugh can get a joke immediately, without any interaction. Users with a more specific goal can reach for the search input or browse by category. The two layouts reflect two different user intents — serendipity vs. intent.

### Search highlight

Search results highlight the query term inside each joke using the `<mark>` element. The trade-offs considered:

**Pros:**
- Faster result scanning — users can spot why a result matched without reading the full joke.
- Confirms the search worked — visual feedback that the query was actually found in the text.

**Cons:**
- Regex complexity — special characters in the query can break the split logic and need to be escaped.
- Minor performance cost — every result runs a regex match and string split on render. In practice this is negligible since the API already guarantees the query is present in every returned joke, but it is worth noting.

### Responsive design

The layout adapts to all screen sizes using Tailwind's responsive utilities. The hero section switches from a stacked single-column layout on mobile to a two-column grid on desktop. High-DPI displays are handled via SVG assets and Tailwind's default rem-based sizing.

## Tech stack

- [SvelteKit](https://kit.svelte.dev/) — web framework with SSR (initial joke and categories are fetched server-side for performance and SEO)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes) — modern reactivity model (`$state`, `$props`, `$effect`)
- [TypeScript](https://www.typescriptlang.org/) — static typing
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) — native browser share sheet, with clipboard fallback
- [Vitest](https://vitest.dev/) — unit testing
- [Playwright](https://playwright.dev/) — e2e testing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — linting and formatting
