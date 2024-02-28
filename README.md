# `@globalbrain/nuxt-i18n`

[![Test](https://github.com/globalbrain/nuxt-i18n/actions/workflows/test.yml/badge.svg)](https://github.com/globalbrain/nuxt-i18n/actions/workflows/test.yml)
[![License](https://img.shields.io/npm/l/@globalbrain/sefirot.svg)](https://github.com/globalbrain/sefirot/blob/main/LICENSE.md)

[Nuxt](https://nuxt.com) module for internationalization with localized routing.

This module's intention is not to provide a full-blown solution for internationalization like [@nuxtjs/i18n](https://i18n.nuxtjs.org/), but offer a lean, effective and lightweight set of tools to cover the needs of common projects without the bloat of a full-blown solution.

## Install

```bash
pnpm add -D @globalbrain/nuxt-i18n
```

## Usage

```ts
export default defineNuxtConfig({
  modules: [
    '@globalbrain/nuxt-i18n'
  ],

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en']
  }
})
```

## Contribution

We're really excited that you are interested in contributing to Sefirot. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

### Code style guide

Sefirot follows the official [Vue Style Guide](https://v3.vuejs.org/style-guide/). But always remember to follow the "Golden Rule"&hellip;

> Every line of code should appear to be written by a single person, no matter the number of contributors.
> &mdash; <cite>@mdo</cite>

### Development

```bash
pnpm run lint
```

Lint files using ESLint.

```bash
pnpm run test
```

Run the test suite using Vitest.

## License

This package is open-sourced software licensed under the [MIT](./LICENSE).
