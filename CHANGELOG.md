# Changelog

## v3

### 3.0

- rename `useOnly` to `useBreakpoint` and `useQuery` to `useMediaQuery` **BREAKING CHANGE**
- `useBreakpoint` and `useMediaQuery` stop returning `undefined` during the initialization and if the media query is invalid **BREAKING CHANGE**
- Avoid sending a warning on react 17

<details>
  <summary>See detailed changelog</summary>

#### 3.0.0

- rename `useOnly` to `useBreakpoint` and `useQuery` to `useMediaQuery` **BREAKING CHANGE**
  - Those were renamed for 2 reasons:
    1. `useOnly` isn’t really explicit
    2. `useQuery` can be confused with react-query’s or apollo’s useQuery hooks
- `useBreakpoint` and `useMediaQuery` stop returning `undefined` during the initialization and if the media query is invalid. Instead it will directly use the correct value, and if the media query is invalid, it’ll return `false`. **BREAKING CHANGE**
- Bump peerDependencies to allow for react 17
- Drop support for node 10

</details>

## v2

### 2.3

- remove polyfill for matchMedia **minor breaking change**
- add `useQuery`
- drop `media` in `useOnly` **BREAKING CHANGE**
- use Node 13 `exports` field
- add `toJSON` and `toCSS` for CSS-in-JS support

<details>
  <summary>See detailed changelog</summary>

#### 2.3.3

- remove wrong dependency on `emotion`

#### 2.3.2

- add `toJSON` and `toCSS` for CSS-in-JS support

#### 2.3.1

- Use Node 13 conditional exports: https://nodejs.org/api/esm.html#esm_conditional_exports

#### 2.3.0

- remove polyfill for matchMedia (it should be define by the users) **minor breaking change**
- add new hook `useQuery` and use it internally in `Only` for the prop `matchMedia`
- drop `query` in `useOnly` **BREAKING CHANGE**
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
  <summary>See detailed changelog</summary>

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
  <summary>See detailed changelog</summary>

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
- Drop Preact support **BREAKING CHANGE**
- Remove `toCSS`, `toJSON` and `toMediaQuery` **BREAKING CHANGE**

<details>
  <summary>See detailed changelog</summary>

#### 2.0.1

- revert back to `addListener` instead of `addEventListener` on `matchMedia` for better browser supports

#### 2.0.0

- Remove Preact support (won't be an issue with Preact 10) **BREAKING CHANGE**
- Use and expose `BreakpointsContext` instead of a class to store breakpoints
- Remove `toCSS`, `toJSON` and `toMediaQuery` **BREAKING CHANGE**
- Stop debouncing `isShown` because as it's a boolean, React isn't re-rendering if the same value is re-set
- `Only` accepts other props when the prop `as` is used **type fix**

<details>
  <summary>Betas</summary>

#### 2.0.0-beta-2

- Use `useEffect` in `useOnly`
- Stop debouncing `isShown` because as it's a boolean, React isn't re-rendering if the same value is re-set

#### 2.0.0-beta-1

- Use `useLayoutEffect` in `useOnly` to reduce the delay before changing the DOM
- Remove `toCSS`, `toJSON` and `toMediaQuery` **BREAKING CHANGE**

#### 2.0.0-beta

- Remove Preact support (won't be an issue with Preact X) **BREAKING CHANGE**
- Use and expose `BreakpointsContext` instead of a class to store breakpoints
- Change API of `toCSS`, `toJSON` and `toMediaQuery` (need to provide the breakpoints) **BREAKING CHANGE**

</details>

</details>

## v1

### 1.0

- Upgrade to TypeScript
- Add `useOnly` hook

<details>
  <summary>See detailed changelog</summary>

#### 1.0.3

- Create and expose a union type `Units` instead of an enum for the available css units

#### 1.0.2

- Change npmignore and change README

#### 1.0.1

- Avoid overlapping breakpoints in defaults **BREAKING CHANGE**

#### 1.0.0

- Add `useOnly` hook
- Change internals to use `useOnly`
- Upgrade to TypeScript

</details>

## v0

### 0.8

- Add strict mode

<details>
  <summary>See detailed changelog</summary>

#### 0.8.3

- Support for matchMedia on node
- Change tests for strict mode

#### 0.8.0

- Add strict mode

</details>

### 0.7

- Add support for Parcel

<details>
  <summary>See detailed changelog</summary>

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
  <summary>See detailed changelog</summary>

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
