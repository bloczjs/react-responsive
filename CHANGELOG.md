# Changelog

## v2

### 2.0.0

- Remove Preact support (won't be an issue with Preact X)
- Use and expose `BreakpointsContext` instead of a class to store breakpoints
- Remove `toCSS`, `toJSON` and `toMediaQuery`
- Stop debouncing `isShown` because as it's a boolean, React isn't re-rendering if the same value is re-set

<details>
  <summary>Betas</summary>

#### 2.0.0-beta-2

- Use `useEffect` in `useOnly`
- Stop debouncing `isShown` because as it's a boolean, React isn't re-rendering if the same value is re-set

#### 2.0.0-beta-1

- Use `useLayoutEffect` in `useOnly` to reduce the delay before changing the DOM
- Remove `toCSS`, `toJSON` and `toMediaQuery`

#### 2.0.0-beta

- Remove Preact support (won't be an issue with Preact X)
- Use and expose `BreakpointsContext` instead of a class to store breakpoints
- Change API of `toCSS`, `toJSON` and `toMediaQuery` (need to provide the breakpoints)

</details>

## v1

<details>
  <summary>See content</summary>

### 1.0.3

- Create and expose a union type `Units` instead of an enum for the available css units

### 1.0.2

- Change npmignore and change README

### 1.0.1

- Avoid overlapping breakpoints in defaults

### 1.0.0

- Add `useOnly` hook
- Change internals to use `useOnly`
- Upgrade to TypeScript

</details>

## v0

<details>
  <summary>See content</summary>

### 0.8.3

- Support for matchMedia on node
- Change tests for strict mode

### 0.8.0

- Add strict mode

### 0.7.3

- Add prop `as` in `<Match>`

### 0.7.2

- Add support for Fragments (when the prop `as` isn't set on `<Only>`) for Preact

### 0.7.1

- Change build system
- Add support for `<Match>` for Parcel

### 0.7.0

- Add support for Parcel

### 0.6.7

- Fix bug when `null` was a child of `<Match>`

### 0.6.6

- Fix in README `toCSS`, `toJSON`
- Add badges in README

### 0.6.5

- Add `<Match>` component

### Older

- Add `<Only>` component
- Add `<BreakpointsProvider>`
- Add `toCSS`
- Add `toJSON`
- Add `toMediaQuery`

</details>
