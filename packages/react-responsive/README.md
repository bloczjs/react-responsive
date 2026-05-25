# @blocz/react-responsive <!-- omit in toc -->

`@blocz/react-responsive` is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

It allows you to display component only for particular screen sizes.

If you need a responsive layout and adaptive components, `@blocz/react-responsive` is here for you!

[See changelog](https://github.com/bloczjs/react-responsive/blob/main/CHANGELOG.md)

## Table of contents <!-- omit in toc -->

1. [How to use](#how-to-use)
   1. [`<Only>`](#only)
      1. [Default media ranges](#default-media-ranges)
      2. [Additional `Up` and `Down`](#additional-up-and-down)
      3. [Match Media Queries](#match-media-queries)
      4. [Render as component](#render-as-component)
   2. [Hooks](#hooks)
      1. [`useMediaRange()`](#usemediarange)
      2. [`useMediaQuery()`](#usemediaquery)
   3. [`<MediaRangesProvider>`](#mediarangesprovider)
      1. [Add more media ranges](#add-more-media-ranges)
      2. [Change default media ranges](#change-default-media-ranges)
      3. [Units](#units)
      4. [Direction](#direction)
   4. [Comparison to other libraries](#comparison-to-other-libraries)
   5. [`matchMedia` polyfill](#matchmedia-polyfill)
      1. [Browser](#browser)
      2. [Node](#node)
   6. [React 16 / 17 support](#react-16--17-support)
   7. [Deprecated APIs](#deprecated-apis)
   8. [FAQ](#faq)

## How to use

### `<Only>`

#### Default media ranges

`@blocz/react-responsive` is based on the classic bootstrap media ranges: `xs`, `sm`, `md`, `lg` and `xl`.

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

By default, the media ranges are:

| Media range |   From |       To |
| ----------- | -----: | -------: |
| xs          |    0px |    575px |
| sm          |  576px |    767px |
| md          |  768px |    991px |
| lg          |  992px |   1199px |
| xl          | 1200px | Infinity |

#### Additional `Up` and `Down`

In addition to the regular media ranges, you have another api defined `{mediaRange}Up` and `{mediaRange}Down`:

```javascript
import React from "react";
import { Only } from "@blocz/react-responsive";

const App = () => (
  <React.Fragment>
    <Only on="smUp">Visible on every device bigger or equal than "small"</Only>
    <Only on="mdDown">Visible on every device smaller or equal than "medium"</Only>
  </React.Fragment>
);
```

#### Match Media Queries

For more advanced media queries, the prop `matchMedia` can be set to any regular query supported by [window.matchMedia](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia).

```javascript
import React from "react";
import { Only } from "@blocz/react-responsive";

const App = () => (
  <Only matchMedia="(min-device-width: 500px) and (orientation: landscape)">
    Visible on every device bigger than "500px" and in landscape mode
  </Only>
);
```

[More infos about CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

**Note:** If you use media ranges AND matchMedia, the component will be displayed if one of the media ranges is matched **OR** if the media query is fulfilled.

#### Render as component

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

### Hooks

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

#### `useMediaQuery()`

`useMediaQuery` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given media query matches the current viewport.

```javascript
import React from "react";
import { useMediaQuery } from "@blocz/react-responsive";

const App = () => {
  const matchMediaQuery = useMediaQuery("(min-width:768px) and (max-width:992px),(max-width:576px)");
  return <ul>{matchMediaQuery && <li>Visible at (min-width:768px) and (max-width:992px),(max-width:576px)</li>}</ul>;
};
```

### `<MediaRangesProvider>`

`MediaRangesProvider` defines the values of every media ranges.

Use it to inject or modify the media ranges (only use one `MediaRangesProvider` per build).

#### Add more media ranges

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

#### Change default media ranges

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

#### Units

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

#### Direction

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

If you are on want to use matchMedia on browser that don’t support it, I’d recommend you to use [`matchmedia-polyfill`](https://github.com/paulirish/matchMedia.js/).

#### Node

If you want to mock `matchMedia` on Node to execute tests for instance, you can use [`mock-match-media`](https://github.com/Ayc0/mock-match-media/).

And if you need an example with `Jest`, `@testing-library/react`, `React` and `@blocz/react-responsive`, you can take a look at [these tests](https://github.com/bloczjs/react-responsive/blob/main/packages/tests/src/__tests__/ssr.ts).

### React 16 / 17 support

`@blocz/react-responsive` relies on `useSyncExternalStore`. This function was added in React 18.
If you are on React 16.8+ / React 17, you'll need to use [use-sync-external-store](https://npmx.dev/package/use-sync-external-store) to polyfill `useSyncExternalStore`.

### Deprecated APIs

The terminology used by this library used to be "breakpoint". It was renamed to "media range" because each entry actually describes the range between two breakpoints rather than a single breakpoint.

For backward compatibility, the previous exports are still available but marked as `@deprecated`, and will be removed in the next major release:

| Deprecated                | Replacement            |
| ------------------------- | ---------------------- |
| `useBreakpoint`           | `useMediaRange`        |
| `BreakpointsProvider`     | `MediaRangesProvider`  |
| `BreakpointsContext`      | `MediaRangesContext`   |
| `breakpoints` prop        | `mediaRanges` prop     |
| `additionalBreakpoints` prop | `additionalMediaRanges` prop |

### FAQ

For other questions, please take a look at our [FAQ document](https://github.com/bloczjs/react-responsive/blob/main/FAQ.md).
