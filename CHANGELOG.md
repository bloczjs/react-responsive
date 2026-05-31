# Changelog

## Unreleased

Always keep those 4 sections. If empty, write `_Empty for now, to keep_`

### Breaking changes

_Empty for now, to keep_

### Deprecations, will be removed in the next major

_Empty for now, to keep_

### Customer facing

_Empty for now, to keep_

### Internal

_Empty for now, to keep_

## v5

- Switch `useMediaQuery` to `useSyncExternalStore` to fix crashes in React 19 caused by re-renders on mount when there are many components **[customer-facing]** ([#171](https://github.com/bloczjs/react-responsive/pull/171))
  As `useSyncExternalStore` is only available in React 18+, this is a **[BREAKING CHANGE]** as the `peerDependencies` had to be bumped
- Rename `useBreakpoint`, `BreakpointsProvider`, `BreakpointsContext` -> `useMediaRange`, `MediaRangesProvider`, `MediaRangesContext` (+ deprecate old exports)
- Add `createMediaRanges` & deprecate `MediaRangesProvider` and `MediaRangesContext`,

### 5.1 (not released yet)

#### Deprecations, will be removed in the next major

- `MediaRangesProvider` and `MediaRangesContext` — use `createMediaRanges` instead ([#187](https://github.com/bloczjs/react-responsive/pull/187))
- The `as` prop on the top-level `Only` ([#187](https://github.com/bloczjs/react-responsive/pull/187)) — wrap children in the element you need, or use `createMediaRanges`'s `Only`
- The "breakpoint"-named aliases kept for backward compatibility after the rename ([#181](https://github.com/bloczjs/react-responsive/pull/181)):
  - exports: `useBreakpoint`, `BreakpointsProvider`, `BreakpointsContext`
  - props on `BreakpointsProvider`: `breakpoints`, `additionalBreakpoints`

#### Customer facing

- Add `createMediaRanges` + `DEFAULT_MEDIA_RANGES`, a strongly-typed alternative to `MediaRangesProvider` ([#187](https://github.com/bloczjs/react-responsive/pull/187))
  - `createMediaRanges(ranges)` returns a `{ useMediaRange, Only }` pair bound to the ranges you pass in — no React context, no `additionalMediaRanges` vs `mediaRanges` split
  - The returned `useMediaRange` / `Only` validate the `on` string end-to-end: every space-separated token must match a declared range or its auto-generated `Up` / `Down` alias. Invalid input surfaces a readable TypeScript error like `Invalid media ranges: foo bar` instead of `never`
  - The returned `Only` only forwards `children` — `as` and arbitrary forwarded props are not supported; wrap your children in whatever element you need
  - Spread `DEFAULT_MEDIA_RANGES` when you want to keep the defaults (`xs`, `sm`, `md`, `lg`, `xl`)
- Rename "breakpoint" to "media range" across the library, tests and documentation to better reflect that each name describes a range between two breakpoints rather than a single breakpoint ([#181](https://github.com/bloczjs/react-responsive/pull/181))
  - New exports: `useMediaRange`, `MediaRangesProvider`, `MediaRangesContext`
  - New props on `MediaRangesProvider`: `mediaRanges`, `additionalMediaRanges`
  - Previous exports are kept but deprecated

<details>
  <summary>See patches</summary>

### Internal

- Migrate from yarn to pnpm ([#200](https://github.com/bloczjs/react-responsive/pull/200))
- Replace eslint & prettier by oxlint & oxfmt ([#197](https://github.com/bloczjs/react-responsive/pull/197))
- Replace jest & jest-dom & puppeteer & parcel with vite + vitest + playwright ([#201](https://github.com/bloczjs/react-responsive/pull/201) & [#203](https://github.com/bloczjs/react-responsive/pull/203))

### 5.1.0-alpha.0

#### Deprecations, will be removed in the next major

- `MediaRangesProvider` and `MediaRangesContext` — use `createMediaRanges` instead ([#187](https://github.com/bloczjs/react-responsive/pull/187))
- The `as` prop on the top-level `Only` ([#187](https://github.com/bloczjs/react-responsive/pull/187)) — wrap children in the element you need, or use `createMediaRanges`'s `Only`
- The "breakpoint"-named aliases kept for backward compatibility after the rename ([#181](https://github.com/bloczjs/react-responsive/pull/181)):
  - exports: `useBreakpoint`, `BreakpointsProvider`, `BreakpointsContext`
  - props on `BreakpointsProvider`: `breakpoints`, `additionalBreakpoints`

#### Customer facing

- Add `createMediaRanges` + `DEFAULT_MEDIA_RANGES`, a strongly-typed alternative to `MediaRangesProvider` ([#187](https://github.com/bloczjs/react-responsive/pull/187))
  - `createMediaRanges(ranges)` returns a `{ useMediaRange, Only }` pair bound to the ranges you pass in — no React context, no `additionalMediaRanges` vs `mediaRanges` split
  - The returned `useMediaRange` / `Only` validate the `on` string end-to-end: every space-separated token must match a declared range or its auto-generated `Up` / `Down` alias. Invalid input surfaces a readable TypeScript error like `Invalid media ranges: foo bar` instead of `never`
  - The returned `Only` only forwards `children` — `as` and arbitrary forwarded props are not supported; wrap your children in whatever element you need
  - Spread `DEFAULT_MEDIA_RANGES` when you want to keep the defaults (`xs`, `sm`, `md`, `lg`, `xl`)
- Rename "breakpoint" to "media range" across the library, tests and documentation to better reflect that each name describes a range between two breakpoints rather than a single breakpoint ([#181](https://github.com/bloczjs/react-responsive/pull/181))
  - New exports: `useMediaRange`, `MediaRangesProvider`, `MediaRangesContext`
  - New props on `MediaRangesProvider`: `mediaRanges`, `additionalMediaRanges`
  - Previous exports are kept but deprecated

#### Internal

- Migrate from yarn to pnpm ([#200](https://github.com/bloczjs/react-responsive/pull/200))
- Replace eslint & prettier by oxlint & oxfmt ([#197](https://github.com/bloczjs/react-responsive/pull/197))
- Replace jest & jest-dom & puppeteer & parcel with vite + vitest + playwright ([#201](https://github.com/bloczjs/react-responsive/pull/201) & [#203](https://github.com/bloczjs/react-responsive/pull/203))

</details>

### 5.0

- Switch `useMediaQuery` to `useSyncExternalStore` to fix crashes in React 19 caused by re-renders on mount when there are many components **[customer-facing]** ([#171](https://github.com/bloczjs/react-responsive/pull/171))
  As `useSyncExternalStore` is only available in React 18+, this is a **[BREAKING CHANGE]** as the `peerDependencies` had to be bumped

<details>
  <summary>See patches</summary>

### 5.0.0

- Switch `useMediaQuery` to `useSyncExternalStore` to fix crashes in React 19 caused by re-renders on mount when there are many components **[customer-facing]** ([#171](https://github.com/bloczjs/react-responsive/pull/171), tests in [#172](https://github.com/bloczjs/react-responsive/pull/172))
  If you are on React 16.8+ / React 17, you'll need to use [use-sync-external-store](https://npmx.dev/package/use-sync-external-store) to polyfill `useSyncExternalStore` added in React 18.
  - Add `getServerSnapshot` to fix crashes on Node ([#174](https://github.com/bloczjs/react-responsive/pull/174))
- Migrate build system from `microbundle` to `tsdown` **[internal, may impact devs]** ([#144](https://github.com/bloczjs/react-responsive/pull/144))
- Update TypeScript config **[internal]**
  - Change TypeScript target from ES5 to ESNext ([#135](https://github.com/bloczjs/react-responsive/pull/135))
  - Change `moduleResolution` from `node` to `bundler` ([#134](https://github.com/bloczjs/react-responsive/pull/134))
  - Add `rootDir` to `tsconfig.json` ([#133](https://github.com/bloczjs/react-responsive/pull/133))
- Other internal dev / tests changes **[internal]**
  - Update `mock-match-media` to v1 ([#95](https://github.com/bloczjs/react-responsive/pull/95))
  - Bump `typescript` from 5.7.2 to 5.9.3 ([#120](https://github.com/bloczjs/react-responsive/pull/120))
  - Bump `eslint` from 10.2.1 to 10.4.0 ([#145](https://github.com/bloczjs/react-responsive/pull/145), [#167](https://github.com/bloczjs/react-responsive/pull/167))
  - Bump `@eslint-react/eslint-plugin` from 1.18.0 to 5.7.10 ([#119](https://github.com/bloczjs/react-responsive/pull/119), [#146](https://github.com/bloczjs/react-responsive/pull/146), [#154](https://github.com/bloczjs/react-responsive/pull/154), [#170](https://github.com/bloczjs/react-responsive/pull/170))
  - Bump `@typescript-eslint/parser` from 8.18.0 to 8.58.0 and typescript-eslint group bumps ([#117](https://github.com/bloczjs/react-responsive/pull/117), [#131](https://github.com/bloczjs/react-responsive/pull/131), [#150](https://github.com/bloczjs/react-responsive/pull/150), [#153](https://github.com/bloczjs/react-responsive/pull/153), [#166](https://github.com/bloczjs/react-responsive/pull/166), [#149](https://github.com/bloczjs/react-responsive/pull/149))
  - Bump `jest-environment-jsdom` from 29.7.0 to 30.4.1 + manual Jest update ([#125](https://github.com/bloczjs/react-responsive/pull/125), [#156](https://github.com/bloczjs/react-responsive/pull/156), [#164](https://github.com/bloczjs/react-responsive/pull/164))
  - Bump `ts-jest` from 29.2.5 to 29.4.6 ([#116](https://github.com/bloczjs/react-responsive/pull/116))
  - Bump `jest-puppeteer` from 10.1.4 to 11.0.0 ([#118](https://github.com/bloczjs/react-responsive/pull/118))
  - Bump `puppeteer` from 24.42.0 to 25.0.2 ([#160](https://github.com/bloczjs/react-responsive/pull/160), [#169](https://github.com/bloczjs/react-responsive/pull/169))
  - Bump `@testing-library/dom` from 10.4.0 to 10.4.1 ([#128](https://github.com/bloczjs/react-responsive/pull/128))
  - Bump `parcel` from 2.13.2 to 2.16.4 ([#130](https://github.com/bloczjs/react-responsive/pull/130))
  - Bump `tsdown` from 0.21.10 to 0.22.0 ([#161](https://github.com/bloczjs/react-responsive/pull/161))
  - Bump `@types/node` from 25.6.0 to 25.8.0 ([#157](https://github.com/bloczjs/react-responsive/pull/157), [#168](https://github.com/bloczjs/react-responsive/pull/168))
  - Bump `ws` from 8.20.0 to 8.20.1 ([#173](https://github.com/bloczjs/react-responsive/pull/173))
  - Bump `actions/setup-node` from 3 to 6, `actions/checkout` from 3 to 6 ([#114](https://github.com/bloczjs/react-responsive/pull/114), [#115](https://github.com/bloczjs/react-responsive/pull/115))
  - Add Node.js 24.x and 25.x and 26.x to the CI matrix ([#113](https://github.com/bloczjs/react-responsive/pull/113), [#163](https://github.com/bloczjs/react-responsive/pull/163), ([#165](<(https://github.com/bloczjs/react-responsive/pull/165)>)))
  - Add Dependabot configuration (npm, GitHub Actions, React and typescript-eslint groups) ([#112](https://github.com/bloczjs/react-responsive/pull/112), [#149](https://github.com/bloczjs/react-responsive/pull/149), [#158](https://github.com/bloczjs/react-responsive/pull/158))

</details>

## v4

### 4.0

- Drop support for `Match` as this is an anti pattern (crawling children + leaking into the web TS globals) **[BREAKING CHANGE]**
- Drop support for `toJSON` & `toCSS` **[BREAKING CHANGE]**
- Drop support for node 16 & 18, and add for 20 & 22
- Update support TS version to 5.7.2 (shouldn’t impact people depending on `@blocz/react-responsive`)
- Mark React 19 as available

<details>
  <summary>See patches</summary>

### 4.0.2 – unpublished as 4.0.1 should have been been 5.0.0

- Add `getServerSnapshot` to fix crashes on Node ([#174](https://github.com/bloczjs/react-responsive/pull/174))
- Internal library updates
  - Bump `ws` from 8.20.0 to 8.20.1 ([#173](https://github.com/bloczjs/react-responsive/pull/173))
- Other internal changes
  - Add Node.js 26.x in ([#165](<(https://github.com/bloczjs/react-responsive/pull/165)>))

### 4.0.1 – unpublished as 4.0.1 should have been been 5.0.0

- Switch `useMediaQuery` to `useSyncExternalStore` to fix crashes in React 19 caused by re-renders on mount when there are many components **[customer-facing]** ([#171](https://github.com/bloczjs/react-responsive/pull/171), tests in [#172](https://github.com/bloczjs/react-responsive/pull/172))
  If you are on React 16.8+ / React 17, you'll need to use [use-sync-external-store](https://npmx.dev/package/use-sync-external-store) to polyfill `useSyncExternalStore` added in React 18.
- Migrate build system from `microbundle` to `tsdown` **[internal, may impact devs]** ([#144](https://github.com/bloczjs/react-responsive/pull/144))
- Update TypeScript config **[internal]**
  - Change TypeScript target from ES5 to ESNext ([#135](https://github.com/bloczjs/react-responsive/pull/135))
  - Change `moduleResolution` from `node` to `bundler` ([#134](https://github.com/bloczjs/react-responsive/pull/134))
  - Add `rootDir` to `tsconfig.json` ([#133](https://github.com/bloczjs/react-responsive/pull/133))
- Other internal dev / tests changes **[internal]**
  - Update `mock-match-media` to v1 ([#95](https://github.com/bloczjs/react-responsive/pull/95))
  - Bump `typescript` from 5.7.2 to 5.9.3 ([#120](https://github.com/bloczjs/react-responsive/pull/120))
  - Bump `eslint` from 10.2.1 to 10.4.0 ([#145](https://github.com/bloczjs/react-responsive/pull/145), [#167](https://github.com/bloczjs/react-responsive/pull/167))
  - Bump `@eslint-react/eslint-plugin` from 1.18.0 to 5.7.10 ([#119](https://github.com/bloczjs/react-responsive/pull/119), [#146](https://github.com/bloczjs/react-responsive/pull/146), [#154](https://github.com/bloczjs/react-responsive/pull/154), [#170](https://github.com/bloczjs/react-responsive/pull/170))
  - Bump `@typescript-eslint/parser` from 8.18.0 to 8.58.0 and typescript-eslint group bumps ([#117](https://github.com/bloczjs/react-responsive/pull/117), [#131](https://github.com/bloczjs/react-responsive/pull/131), [#150](https://github.com/bloczjs/react-responsive/pull/150), [#153](https://github.com/bloczjs/react-responsive/pull/153), [#166](https://github.com/bloczjs/react-responsive/pull/166), [#149](https://github.com/bloczjs/react-responsive/pull/149))
  - Bump `jest-environment-jsdom` from 29.7.0 to 30.4.1 + manual Jest update ([#125](https://github.com/bloczjs/react-responsive/pull/125), [#156](https://github.com/bloczjs/react-responsive/pull/156), [#164](https://github.com/bloczjs/react-responsive/pull/164))
  - Bump `ts-jest` from 29.2.5 to 29.4.6 ([#116](https://github.com/bloczjs/react-responsive/pull/116))
  - Bump `jest-puppeteer` from 10.1.4 to 11.0.0 ([#118](https://github.com/bloczjs/react-responsive/pull/118))
  - Bump `puppeteer` from 24.42.0 to 25.0.2 ([#160](https://github.com/bloczjs/react-responsive/pull/160), [#169](https://github.com/bloczjs/react-responsive/pull/169))
  - Bump `@testing-library/dom` from 10.4.0 to 10.4.1 ([#128](https://github.com/bloczjs/react-responsive/pull/128))
  - Bump `parcel` from 2.13.2 to 2.16.4 ([#130](https://github.com/bloczjs/react-responsive/pull/130))
  - Bump `tsdown` from 0.21.10 to 0.22.0 ([#161](https://github.com/bloczjs/react-responsive/pull/161))
  - Bump `@types/node` from 25.6.0 to 25.8.0 ([#157](https://github.com/bloczjs/react-responsive/pull/157), [#168](https://github.com/bloczjs/react-responsive/pull/168))
  - Bump `actions/setup-node` from 3 to 6, `actions/checkout` from 3 to 6 ([#114](https://github.com/bloczjs/react-responsive/pull/114), [#115](https://github.com/bloczjs/react-responsive/pull/115))
  - Add Node.js 24.x and 25.x to the CI matrix ([#113](https://github.com/bloczjs/react-responsive/pull/113), [#163](https://github.com/bloczjs/react-responsive/pull/163))
  - Add Dependabot configuration (npm, GitHub Actions, React and typescript-eslint groups) ([#112](https://github.com/bloczjs/react-responsive/pull/112), [#149](https://github.com/bloczjs/react-responsive/pull/149), [#158](https://github.com/bloczjs/react-responsive/pull/158))

### 4.0.0

- Drop support for `Match` as this is an anti pattern (crawling children + leaking into the web TS globals) **[BREAKING CHANGE]**
- Drop support for `toJSON` & `toCSS` **[BREAKING CHANGE]**
- Drop support for node 16 & 18, and add for 20 & 22
- Update support TS version to 5.7.2 (shouldn’t impact people depending on `@blocz/react-responsive`)
- Mark React 19 as available

<details>
  <summary>Pre-releases</summary>

### 4.0.0-beta.1

- Drop support for `toJSON` & `toCSS` **[BREAKING CHANGE]**

### 4.0.0-beta.0

- Drop support for `Match` as this is an anti pattern (leaking into the web TS globals) **[BREAKING CHANGE]**
- Drop support for node 16 & 18, and add for 20 & 22
- Update support TS version to 5.7.2 (shouldn’t impact people depending on `@blocz/react-responsive`)
- Mark React 19 as available

</details>

</details>

## v3

### 3.0

- The package was renamed `@blocz/react-responsive` instead of `react-only`
- rename `useOnly` to `useBreakpoint` and `useQuery` to `useMediaQuery` **[BREAKING CHANGE]**
- `useBreakpoint` and `useMediaQuery` stop returning `undefined` during the initialization and if the media query is invalid **[BREAKING CHANGE]**
- Avoid sending a warning on react 17
- Fix `only` and `matchMedia` props on DOM elements for the `Match` component
- Remove prop `strict` **[BREAKING CHANGE]**
- Fix `exports` field in package.json
- Drop support for node 13 and add support for node 15 and 16
- Mark React 18 as available + fix types for React 18.

<details>
  <summary>See patches</summary>

### 3.0.3

- Add `types` field in `exports` in package.json
- Mark React 18 as available + fix types for React 18.

### 3.0.2

- Better fix `only` and `matchMedia` props on DOM elements for the `Match` component
  - with the implementation of the v3.0.0, we were polluting the global scope, injecting the variable `React` everywhere. This version ships a better fix for both of them.
- Add support for node 15 and 16

### 3.0.1

- Fix `exports` field in package.json
  - use correct `lib/` folder instead of `dist/`
  - Use proper `.mjs` for node
- Drop support for node 13

#### 3.0.0

- The package was renamed `@blocz/react-responsive` instead of `react-only`
- rename `useOnly` to `useBreakpoint` and `useQuery` to `useMediaQuery` **[BREAKING CHANGE]**
  - Those were renamed for 2 reasons:
    1. `useOnly` isn’t really explicit
    2. `useQuery` can be confused with react-query’s or apollo’s useQuery hooks
- `useBreakpoint` and `useMediaQuery` stop returning `undefined` during the initialization and if the media query is invalid. Instead it will directly use the correct value, and if the media query is invalid, it’ll return `false`. **[BREAKING CHANGE]**
- Bump peerDependencies to allow for react 17
- Drop support for node 10
- Remove prop `strict`: **[BREAKING CHANGE]**
  - This feature was initially introduced to avoid collision between `mdUp` and `smDown` for instance. But since we avoid the overlapping of breakpoints in the v1.0.1 and as this is customizable, this prop doesn't make sense anymore.
  - This prop relied on `calc(% + 1px)` and `calc(% - 1px)` which has 2 issues:
    - difficult to be compatible with SSR as for instance css-mediaquery crashes when we use `calc()` (see [issue](https://github.com/ericf/css-mediaquery/issues/19)),
    - `1px` is really arbitrary and not customizable so anyway if someone wanted to change that, they had to use custom breakpoints.
- Fix `only` and `matchMedia` props on DOM elements for the `Match` component
  - Inject `MatchChildProps` in `HTMLAttributes` from the global namespace `React`

#### 3.0.0.beta.2

- The package was renamed `@blocz/react-responsive` instead of `react-only`
- Fix `only` and `matchMedia` props on DOM elements for the `Match` component

#### 3.0.0.beta.1

- Remove prop `strict`

#### 3.0.0.beta.0

- rename `useOnly` to `useBreakpoint` and `useQuery` to `useMediaQuery` **[BREAKING CHANGE]**
  - Those were renamed for 2 reasons:
    1. `useOnly` isn’t really explicit
    2. `useQuery` can be confused with react-query’s or apollo’s useQuery hooks
- `useBreakpoint` and `useMediaQuery` stop returning `undefined` during the initialization and if the media query is invalid. Instead it will directly use the correct value, and if the media query is invalid, it’ll return `false`. **[BREAKING CHANGE]**
- Bump peerDependencies to allow for react 17
- Drop support for node 10

</details>

## v2

### 2.3

- remove polyfill for matchMedia **minor breaking change**
- add `useQuery`
- drop `media` in `useOnly` **[BREAKING CHANGE]**
- use Node 13 `exports` field
- add `toJSON` and `toCSS` for CSS-in-JS support

<details>
  <summary>See patches</summary>

#### 2.3.3

- remove wrong dependency on `emotion`

#### 2.3.2

- add `toJSON` and `toCSS` for CSS-in-JS support

#### 2.3.1

- Use Node 13 conditional exports: https://nodejs.org/api/esm.html#esm_conditional_exports

#### 2.3.0

- remove polyfill for matchMedia (it should be define by the users) **minor breaking change**
- add new hook `useQuery` and use it internally in `Only` for the prop `matchMedia`
- drop `query` in `useOnly` **[BREAKING CHANGE]**
  - as there is a new hook `useQuery` that deals with media queries, the 2nd argument of `useOnly` was redundant
  - new signature:
    - before: `useOnly = (on?: string, media?: string, strict?: boolean) => boolean | undefined`
    - after: `useOnly = (on?: string, strict?: boolean) => boolean | undefined`
  - as `on` and `media` were join with a `or`, you can still mimic the previous behavior by doing:
    - before:
      ```js
      const isVisible = useOnly(on, media, strict);
      ```
    - after:
      ```js
      const a = useOnly(on, strict);
      const b = useQuery(media);
      const isVisible = a || b;
      ```

</details>

### 2.2

- change 3rd option in breakpoint to be an `option` instead of just the unit

<details>
  <summary>See patches</summary>

#### 2.2.0

- the 3rd option of every breakpoint is instead of a unit string, a string representing the unit or an object with two keys:
  - `unit` as before (`"px", "em", ...`)
  - `direction` `"width"` or `"height"`

</details>

### 2.1

- `useOnly` returns `undefined` before being initialized
- fix bugs
- expose `MatchChildProps`

<details>
  <summary>See patches</summary>

#### 2.1.4

- expose `MatchChildProps`

#### 2.1.3

- re-use `useLayoutEffect` to reduce delay between initialization and true values

#### 2.1.2

- fix non-valid breakpoints

#### 2.1.1

- avoid crashing when `window` is not defined

#### 2.1.0

- `useOnly` returns `undefined` before being initialized (no changes in `Only` and `Match`) **minor breaking change**

</details>

### 2.0

- Use React's context
- Drop Preact support **[BREAKING CHANGE]**
- Remove `toCSS`, `toJSON` and `toMediaQuery` **[BREAKING CHANGE]**

<details>
  <summary>See patches</summary>

#### 2.0.1

- revert back to `addListener` instead of `addEventListener` on `matchMedia` for better browser supports

#### 2.0.0

- Remove Preact support (won't be an issue with Preact 10) **[BREAKING CHANGE]**
- Use and expose `BreakpointsContext` instead of a class to store breakpoints
- Remove `toCSS`, `toJSON` and `toMediaQuery` **[BREAKING CHANGE]**
- Stop debouncing `isShown` because as it's a boolean, React isn't re-rendering if the same value is re-set
- `Only` accepts other props when the prop `as` is used **type fix**

<details>
  <summary>Pre-releases</summary>

#### 2.0.0-beta-2

- Use `useEffect` in `useOnly`
- Stop debouncing `isShown` because as it's a boolean, React isn't re-rendering if the same value is re-set

#### 2.0.0-beta-1

- Use `useLayoutEffect` in `useOnly` to reduce the delay before changing the DOM
- Remove `toCSS`, `toJSON` and `toMediaQuery` **[BREAKING CHANGE]**

#### 2.0.0-beta

- Remove Preact support (won't be an issue with Preact X) **[BREAKING CHANGE]**
- Use and expose `BreakpointsContext` instead of a class to store breakpoints
- Change API of `toCSS`, `toJSON` and `toMediaQuery` (need to provide the breakpoints) **[BREAKING CHANGE]**

</details>

</details>

## v1

### 1.0

- Upgrade to TypeScript
- Add `useOnly` hook

<details>
  <summary>See patches</summary>

#### 1.0.3

- Create and expose a union type `Units` instead of an enum for the available css units

#### 1.0.2

- Change npmignore and change README

#### 1.0.1

- Avoid overlapping breakpoints in defaults **[BREAKING CHANGE]**

#### 1.0.0

- Add `useOnly` hook
- Change internals to use `useOnly`
- Upgrade to TypeScript

</details>

## v0

### 0.8

- Add strict mode

<details>
  <summary>See patches</summary>

#### 0.8.3

- Support for matchMedia on node
- Change tests for strict mode

#### 0.8.0

- Add strict mode

</details>

### 0.7

- Add support for Parcel

<details>
  <summary>See patches</summary>

#### 0.7.3

- Add prop `as` in `<Match>`

#### 0.7.2

- Add support for Fragments (when the prop `as` isn't set on `<Only>`) for Preact

#### 0.7.1

- Change build system
- Add support for `<Match>` for Parcel

#### 0.7.0

- Add support for Parcel

</details>

### 0.6

- Add `<Match>` component

<details>
  <summary>See patches</summary>

#### 0.6.7

- Fix bug when `null` was a child of `<Match>`

#### 0.6.6

- Fix in README `toCSS`, `toJSON`
- Add badges in README

#### 0.6.5

- Add `<Match>` component

</details>

#### Older

- Add `<Only>` component
- Add `<BreakpointsProvider>` component
- Add `toCSS`
- Add `toJSON`
- Add `toMediaQuery`
