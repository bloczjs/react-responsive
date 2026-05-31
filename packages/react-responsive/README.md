# @blocz/react-responsive <!-- omit in toc -->

`@blocz/react-responsive` is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

It allows you to display component only for particular screen sizes.

If you need a responsive layout and adaptive components, `@blocz/react-responsive` is here for you!

[See changelog](https://github.com/bloczjs/react-responsive/blob/main/CHANGELOG.md)

## Table of contents <!-- omit in toc -->

1. [How to use](#how-to-use)
   1. [`useMediaQuery()`](#usemediaquery)
   2. [Media ranges](#media-ranges)
      1. [Default media ranges](#default-media-ranges)
      2. [Additional `Up` and `Down`](#additional-up-and-down)
      3. [`useMediaRange()`](#usemediarange)
      4. [`<Only>`](#only)
         1. [`on` prop](#on-prop)
         2. [`matchMedia`](#matchmedia)
         3. [Render as component (deprecated)](#render-as-component-deprecated)
      5. [Custom media ranges: `createMediaRanges()`](#custom-media-ranges-createmediaranges)
         1. [Strictly typed](#strictly-typed)
         2. [Stricter `Only`](#stricter-only)
         3. [Units \& direction](#units--direction)
      6. [`<MediaRangesProvider>` (deprecated)](#mediarangesprovider-deprecated)
         1. [Add more media ranges](#add-more-media-ranges)
         2. [Change default media ranges](#change-default-media-ranges)
         3. [Units](#units)
         4. [Direction](#direction)
   3. [Comparison to other libraries](#comparison-to-other-libraries)
   4. [`matchMedia` polyfill](#matchmedia-polyfill)
      1. [Browser](#browser)
      2. [Node](#node)
   5. [React 16 / 17 support](#react-16--17-support)
   6. [Deprecated APIs](#deprecated-apis)
   7. [FAQ](#faq)

## How to use

### `useMediaQuery()`

`useMediaQuery` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given media query matches the current viewport.

```javascript
import React from "react";
import { useMediaQuery } from "@blocz/react-responsive";

const App = () => {
  const matchMediaQuery = useMediaQuery("(min-width:768px) and (max-width:992px),(max-width:576px)");
  return <ul>{matchMediaQuery && <li>Visible at (min-width:768px) and (max-width:992px),(max-width:576px)</li>}</ul>;
};
```

[More infos about CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

### Media ranges

`@blocz/react-responsive` is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

Terminology difference: In bootstrap, each name (`xs`, `sm`, …) refers to a single fixed point. But they don't tell you whether the device is below or above it (is the device `xs` if you are below or above this point?). And no matter what the definition you make, it could be wrong: if it's above, then a `xl` device would also match a `lg` device; below is the same, an `xs` would match an `md`. Bootstrap works via implicit overrides, but we didn't find this very easy to use.

So `@blocz/react-responsive` uses **media ranges**: each name describes the interval _between_ two specific points.

#### Default media ranges

By default, the media ranges are:

| Media range |   From |       To |
| ----------- | -----: | -------: |
| `xs`        |    0px |    575px |
| `sm`        |  576px |    767px |
| `md`        |  768px |    991px |
| `lg`        |  992px |   1199px |
| `xl`        | 1200px | Infinity |

This makes it fully explicit: a `lg` device is not `md` nor `xl`.

#### Additional `Up` and `Down`

To make those media ranges easier to use (and closer to what bootstrap does), we expose additional media ranges `{mediaRange}Up` and `{mediaRange}Down` – to understand all the way up/all the way down:

| Media range |   From |       To |
| ----------- | -----: | -------: |
| `xsUp`      |    0px | Infinity |
| `smUp`      |  576px | Infinity |
| `mdUp`      |  768px | Infinity |
| `lgUp`      |  992px | Infinity |
| `xlUp`      | 1200px | Infinity |

| Media range | From |       To |
| ----------- | ---: | -------: |
| `xsDown`    |  0px |    575px |
| `smDown`    |  0px |    767px |
| `mdDown`    |  0px |    991px |
| `lgDown`    |  0px |   1199px |
| `xlDown`    |  0px | Infinity |

Note: this creates weird ranges, like `xlDown` & `xsUp` that match all; and `xsDown` that is the same as `xs`, and `xlUp` that is the same as `xl`. But those are here just for convenience.

#### `useMediaRange()`

`useMediaRange` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given media range matches the current viewport.

```javascript
import React from "react";
import { useMediaRange } from "@blocz/react-responsive";

const App = () => {
  const matchXl = useMediaRange("xl");
  const matchMdDown = useMediaRange("mdDown");
  const matchMdOrLg = useMediaRange("md lg");
  return (
    <ul>
      {matchXl && <li>Visible on every "large" device</li>}
      {matchMdDown && <li>Visible on every device smaller or equal than "medium"</li>}
      {matchMdOrLg && <li>Visible on every "medium" or "large" device</li>}
    </ul>
  );
};
```

#### `<Only>`

`<Only>` is the component equivalent of `useMediaRange()` and `useMediaQuery()`: it renders its children only when the condition matches.

##### `on` prop

The `on` prop behaves like `useMediaRange()`: it accepts a media range name (or a space-separated list of names) and makes `<Only>` render its children when any of the media range matches.

```javascript
import React from "react";
import { Only } from "@blocz/react-responsive";

const App = () => (
  <React.Fragment>
    <Only on="xs">Only visible for extra small devices (portrait phones)</Only>
    <Only on="sm">Only visible for small devices (landscape phones)</Only>
    <Only on="md">Only visible for medium devices (tablets)</Only>
    <Only on="lg">Only visible for large devices (desktops)</Only>
    <Only on="xl">Only visible for extra large devices (large desktops)</Only>
    <Only on="sm xl">Only visible for small AND extra large devices</Only>
  </React.Fragment>
);
```

##### `matchMedia`

The `matchMedia` prop behaves like `useMediaQuery()`: it accepts any regular query supported by [window.matchMedia](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia).

```javascript
import React from "react";
import { Only } from "@blocz/react-responsive";

const App = () => (
  <Only matchMedia="(min-device-width: 500px) and (orientation: landscape)">
    Visible on every device bigger than "500px" and in landscape mode
  </Only>
);
```

**Note:** If you use `on` AND `matchMedia` together, the component will be displayed if one of the media ranges is matched **OR** if the media query is fulfilled.

##### Render as component (deprecated)

> ⚠️ Using the `as` prop on `<Only>` is **deprecated** and will be removed in v6.0.0.
> This is not considered as type-safe

If you want the `Only` components to render as another component, you can use the `as` props:

```javascript
import React from "react";
import { Only } from "@blocz/react-responsive";

const App = () => (
  <ul>
    <Only as="li" on="xs">
      Only visible for extra small devices (portrait phones)
    </Only>
    <Only as="li" on="sm">
      Only visible for small devices (landscape phones)
    </Only>
    <Only as="li" on="md">
      Only visible for medium devices (tablets)
    </Only>
    <Only as="li" on="lg">
      Only visible for large devices (desktops)
    </Only>
    <Only as="li" on="xl">
      Only visible for extra large devices (large desktops)
    </Only>
    <Only as="li" on="sm xl">
      Only visible for small AND extra large devices
    </Only>
  </ul>
);
```

The `as` props can take any DOM tag string (`div`, `ul`, `li`, ...) or any React component:

```javascript
import React from "react";
import { Only } from "@blocz/react-responsive";

const Custom = ({ title, children }) => (
  <React.Fragment>
    <h3>{title}</h3>
    <p>{children}</p>
  </React.Fragment>
);

const App = () => (
  <React.Fragment>
    <Only as={Custom} title="xs" on="xs">
      Only visible for extra small devices (portrait phones)
    </Only>
    <Only as={Custom} title="sm" on="sm">
      Only visible for small devices (landscape phones)
    </Only>
    <Only as={Custom} title="md" on="md">
      Only visible for medium devices (tablets)
    </Only>
    <Only as={Custom} title="lg" on="lg">
      Only visible for large devices (desktops)
    </Only>
    <Only as={Custom} title="xl" on="xl">
      Only visible for extra large devices (large desktops)
    </Only>
    <Only as={Custom} title="sm xl" on="sm xl">
      Only visible for small AND extra large devices
    </Only>
  </React.Fragment>
);
```

Note that any props except for `matchMedia`, `as` and `on` will be forwarded to the `as` props.

#### Custom media ranges: `createMediaRanges()`

`createMediaRanges` is the recommended way to customize the media ranges. It returns a pair of `useMediaRange` and `Only` bound to the ranges you pass in, with end-to-end TypeScript types.

```javascript
import { createMediaRanges, DEFAULT_MEDIA_RANGES } from "@blocz/react-responsive";

const { useMediaRange, Only } = createMediaRanges({
  ...DEFAULT_MEDIA_RANGES,
  pxRange: [263, 863, { unit: "px" }],
  emRange: [20, 40, { unit: "em" }],
});
```

If you want to re-use the same defaults as the top-level `Only` & `useMediaRange`, you'll need to import & use `DEFAULT_MEDIA_RANGES`

##### Strictly typed

The returned `useMediaRange` accepts only the names that match the ranges you declared (plus the auto-generated `Up` and `Down` aliases). The passed string can hold a single name or a space-separated list, every media range will be typechecked:

```typescript
useMediaRange("md"); // ✅
useMediaRange("pxRangeUp"); // ✅
useMediaRange("mdDown"); // ✅
useMediaRange("md pxRange"); // ✅
useMediaRange("invalid"); // ❌ TS error
useMediaRange("md invalid"); // ❌ TS error – "md" is fine, "invalid" is not
```

This is also true for the returned `Only`:

```tsx
<>
  <Only
    // ✅
    on="md pxRange"
  >
    …
  </Only>

  <Only
    // ❌ TS error
    on="lg invalid"
  >
    …
  </Only>
</>
```

##### Stricter `Only`

Contrary to its top-level counterpart, `Only` returned from `createMediaRanges` only supports `on` and `matchMedia`, no `as` prop (and no drilling additional props to `as`):

```javascript
<ul>
  <Only on="xs">
    <li>Only visible for extra small devices</li>
  </Only>
</ul>
```

##### Units & direction

Each entry accepts the same shape as before: `[min, max]`, `[min, max, unit]`, or `[min, max, { unit, direction }]`:

```javascript
const { Only } = createMediaRanges({
  pxRange: [263, 863, { unit: "px" }],
  emRange: [20, 40, { unit: "em" }],
  yRange: [200, 400, { direction: "height" }],
});
```

#### `<MediaRangesProvider>` (deprecated)

> ⚠️ `MediaRangesProvider` is **deprecated** and will be removed in v6.0.0. Use [`createMediaRanges()`](#custom-media-ranges-createmediaranges) instead.

`MediaRangesProvider` defines the values of every media ranges.

Use it to inject or modify the media ranges (only use one `MediaRangesProvider` per build).

##### Add more media ranges

```javascript
import React from "react";
import { Only, MediaRangesProvider } from "@blocz/react-responsive";

const App = () => (
  <MediaRangesProvider additionalMediaRanges={{ customRange: [263, 863] }}>
    <Only on="customRange">Visible on every device from "263px" to "863px"</Only>
    <Only on="customRangeUp">Visible on every device bigger than "263px"</Only>
    <Only on="customRangeDown">Visible on every device smaller than "863px"</Only>
  </MediaRangesProvider>
);
```

##### Change default media ranges

```javascript
import React from "react";
import { Only, MediaRangesProvider } from "@blocz/react-responsive";

const App = () => (
  <MediaRangesProvider mediaRanges={{ sm: [263, 863] }}>
    <Only on="sm">Visible on every device from "263px" to "863px"</Only>
    <Only on="smUp">Visible on every device bigger than "263px"</Only>
    <Only on="smDown">Visible on every device smaller than "863px"</Only>
  </MediaRangesProvider>
);
```

**Warning**: This **overrides completely** the default media ranges, in this example, the other media ranges `xs`, `md`, `lg` and `xl` **are no longer defined!**

##### Units

You can specify which unit is going to be used for the media range by specifying in the 3rd option a "unit" key.

By default, the unit is "px".

```javascript
import React from "react";
import { Only, MediaRangesProvider } from "@blocz/react-responsive";

const App = () => (
  <MediaRangesProvider
    additionalMediaRanges={{
      pxRange: [263, 863, { unit: "px" }],
      emRange: [20, 40, { unit: "em" }],
    }}
  >
    <Only on="pxRange">Visible on every device from "263px" to "863px"</Only>
    <Only on="emRange">Visible on every device from "20em" to "40em"</Only>
  </MediaRangesProvider>
);
```

##### Direction

You can specify which direction is used for the media queries (height or width).

By default, "width" is the chosen direction.

```javascript
import React from "react";
import { Only, MediaRangesProvider } from "@blocz/react-responsive";

const App = () => (
  <MediaRangesProvider
    mediaRanges={{
      xRange: [300, 500, { direction: "width" }],
      yRange: [200, 400, { direction: "height" }],
    }}
  >
    <Only on="xRange">Visible on every device from "300px" to "500px" wide</Only>
    <Only on="yRange">Visible on every device from "200px" to "400px" tall</Only>
  </MediaRangesProvider>
);
```

Every CSS units are supported.

The default unit is `px`.

### Comparison to other libraries

| Lib                                                                                        | Media ranges | Custom media ranges | Media query | `matchMedia` listener' | hooks | SSR support |
| ------------------------------------------------------------------------------------------ | -----------: | ------------------: | ----------: | ---------------------: | ----: | ----------: |
| [@blocz/react-responsive](https://www.npmjs.com/package/@blocz/react-responsive)           |           ✅ |                  ✅ |          ✅ |                     ✅ |    ✅ |          ✅ |
| [react-responsive](https://www.npmjs.com/package/react-responsive)                         |           ❌ |                  ❌ |          ✅ |                     ✅ |    ✅ |          ✅ |
| [react-breakpoints](https://www.npmjs.com/package/react-breakpoints)                       |           ✅ |                  ✅ |          ❌ |                     ❌ |    ❌ |          ✅ |
| [react-responsive-breakpoints](https://www.npmjs.com/package/react-responsive-breakpoints) |           ✅ |                  ❌ |          ❌ |                     ❌ |    ❌ |          ❌ |

': `matchMedia` listener event means that the library is built around `matchMedia.addListener(callback)` and not `window.addEventListener('resize', callback)` (which is faster because the callback is only triggered when the media query's state changes and not at every resize).

### `matchMedia` polyfill

#### Browser

If you are on want to use matchMedia on browser that don't support it, I'd recommend you to use [`matchmedia-polyfill`](https://github.com/paulirish/matchMedia.js/).

#### Node

If you want to mock `matchMedia` on Node to execute tests for instance, you can use [`mock-match-media`](https://github.com/Ayc0/mock-match-media/).

And if you need an example with `Jest`, `@testing-library/react`, `React` and `@blocz/react-responsive`, you can take a look at [these tests](https://github.com/bloczjs/react-responsive/blob/main/packages/tests/src/__tests__/ssr.ts).

### React 16 / 17 support

`@blocz/react-responsive` relies on `useSyncExternalStore`. This function was added in React 18.
If you are on React 16.8+ / React 17, you'll need to use [use-sync-external-store](https://npmx.dev/package/use-sync-external-store) to polyfill `useSyncExternalStore`.

### Deprecated APIs

The terminology used by this library used to be "breakpoint". It was renamed to "media range" because each entry actually describes the range between two breakpoints rather than a single breakpoint.

For backward compatibility, the previous exports are still available but marked as `@deprecated`, and will be removed in the next major release:

| Deprecated                   | Replacement                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| `useBreakpoint`              | `useMediaRange`                                                 |
| `BreakpointsProvider`        | `MediaRangesProvider`                                           |
| `BreakpointsContext`         | `MediaRangesContext`                                            |
| `breakpoints` prop           | `mediaRanges` prop                                              |
| `additionalBreakpoints` prop | `additionalMediaRanges` prop                                    |
| `MediaRangesProvider`        | [`createMediaRanges()`](#custom-media-ranges-createmediaranges) |
| `MediaRangesContext`         | [`createMediaRanges()`](#custom-media-ranges-createmediaranges) |

### FAQ

For other questions, please take a look at our [FAQ document](https://github.com/bloczjs/react-responsive/blob/main/FAQ.md).
