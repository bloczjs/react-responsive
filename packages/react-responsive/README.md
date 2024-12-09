# @blocz/react-responsive <!-- omit in toc -->

`@blocz/react-responsive` is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

It allows you to display component only for particular screen sizes.

If you need a responsive layout and adaptive components, `@blocz/react-responsive` is here for you!

[See changelog](https://github.com/bloczjs/react-responsive/blob/master/CHANGELOG.md)

## Table of contents <!-- omit in toc -->

1. [How to use](#how-to-use)
   1. [`<Only>`](#only)
      1. [Default breakpoints](#default-breakpoints)
      2. [Additional `Up` and `Down`](#additional-up-and-down)
      3. [Match Media Queries](#match-media-queries)
      4. [Render as component](#render-as-component)
   2. [Hooks](#hooks)
      1. [`useBreakpoint()`](#usebreakpoint)
      2. [`useMediaQuery()`](#usemediaquery)
   3. [`<BreakpointsProvider>`](#breakpointsprovider)
      1. [Add more breakpoints](#add-more-breakpoints)
      2. [Change default breakpoints](#change-default-breakpoints)
      3. [Units](#units)
      4. [Direction](#direction)
   4. [Comparison to other libraries](#comparison-to-other-libraries)
   5. [`matchMedia` polyfill](#matchmedia-polyfill)
      1. [Browser](#browser)
      2. [Node](#node)
   6. [FAQ](#faq)

## How to use

### `<Only>`

#### Default breakpoints

`@blocz/react-responsive` is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

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

By default, the breakpoints are:

| Breakpoint |   From |       To |
| ---------- | -----: | -------: |
| xs         |    0px |    575px |
| sm         |  576px |    767px |
| md         |  768px |    991px |
| lg         |  992px |   1199px |
| xl         | 1200px | Infinity |

#### Additional `Up` and `Down`

In addition to the regular breakpoints, you have another api defined `{breakpoint}Up` and `{breakpoint}Down`:

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

**Note:** If you use breakpoints AND matchMedia, the component will be displayed if one of the breakpoints is matched **OR** if the media query is fulfilled.

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

#### `useBreakpoint()`

`useBreakpoint` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given breakpoint matches the current viewport.

```javascript
import React from "react";
import { useBreakpoint } from "@blocz/react-responsive";

const App = () => {
  const matchXl = useBreakpoint("xl");
  const matchMdDown = useBreakpoint("mdDown");
  const matchMdOrLg = useBreakpoint("md lg");
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

### `<BreakpointsProvider>`

`BreakpointsProvider` defines the values of every breakpoints.

Use it to inject or modify the breakpoints (only use one `BreakpointsProvider` per build).

#### Add more breakpoints

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "@blocz/react-responsive";

const App = () => (
  <BreakpointsProvider additionalBreakpoints={{ customBrkPts: [263, 863] }}>
    <Only on="customBrkPts">Visible on every device from "263px" to "863px"</Only>
    <Only on="customBrkPtsUp">Visible on every device bigger than "263px"</Only>
    <Only on="customBrkPtsDown">Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

#### Change default breakpoints

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "@blocz/react-responsive";

const App = () => (
  <BreakpointsProvider breakpoints={{ sm: [263, 863] }}>
    <Only on="sm">Visible on every device from "263px" to "863px"</Only>
    <Only on="smUp">Visible on every device bigger than "263px"</Only>
    <Only on="smDown">Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

**Warning**: This **overrides completely** the default breakpoints, in this example, the other breakpoints `xs`, `md`, `lg` and `xl` **are no longer defined!**

#### Units

You can specify which unit is going to be used for the breakpoint by specifying in the 3rd option a "unit" key.

By default, the unit is "px".

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "@blocz/react-responsive";

const App = () => (
  <BreakpointsProvider
    additionalBreakpoints={{
      pxPoint: [263, 863, { unit: "px" }],
      emPoint: [20, 40, { unit: "em" }],
    }}
  >
    <Only on="pxPoint">Visible on every device from "263px" to "863px"</Only>
    <Only on="emPoint">Visible on every device from "20em" to "40em"</Only>
  </BreakpointsProvider>
);
```

#### Direction

You can specify which direction is used for the media queries (height or width).

By default, "width" is the chosen direction.

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "@blocz/react-responsive";

const App = () => (
  <BreakpointsProvider
    breakpoints={{
      xBreakpoint: [300, 500, { direction: "width" }],
      yBreakpoint: [200, 400, { direction: "height" }],
    }}
  >
    <Only on="xBreakpoint">Visible on every device from "300px" to "500px" wide</Only>
    <Only on="yBreakpoint">Visible on every device from "200px" to "400px" tall</Only>
  </BreakpointsProvider>
);
```

Every CSS units are supported.

The default unit is `px`.

### Comparison to other libraries

| Lib                                                                                        | Breakpoints | Custom breakpoints | Media query | `matchMedia` listener' | hooks | SSR support |
| ------------------------------------------------------------------------------------------ | ----------: | -----------------: | ----------: | ---------------------: | ----: | ----------: |
| [@blocz/react-responsive](https://www.npmjs.com/package/@blocz/react-responsive)           |          ✅ |                 ✅ |          ✅ |                     ✅ |    ✅ |          ✅ |
| [react-responsive](https://www.npmjs.com/package/react-responsive)                         |          ❌ |                 ❌ |          ✅ |                     ✅ |    ✅ |          ✅ |
| [react-breakpoints](https://www.npmjs.com/package/react-breakpoints)                       |          ✅ |                 ✅ |          ❌ |                     ❌ |    ❌ |          ✅ |
| [react-responsive-breakpoints](https://www.npmjs.com/package/react-responsive-breakpoints) |          ✅ |                 ❌ |          ❌ |                     ❌ |    ❌ |          ❌ |

': `matchMedia` listener event means that the library is built around `matchMedia.addListener(callback)` and not `window.addEventListener('resize', callback)` (which is faster because the callback is only triggered when the media query's state changes and not at every resize).

### `matchMedia` polyfill

#### Browser

If you are on want to use matchMedia on browser that don’t support it, I’d recommend you to use [`matchmedia-polyfill`](https://github.com/paulirish/matchMedia.js/).

#### Node

If you want to mock `matchMedia` on Node to execute tests for instance, you can use [`mock-match-media`](https://github.com/Ayc0/mock-match-media/).

And if you need an example with `Jest`, `@testing-library/react`, `React` and `@blocz/react-responsive`, you can take a look at [these tests](https://github.com/bloczjs/react-responsive/blob/master/packages/tests/src/__tests__/ssr.ts).

### FAQ

For other questions, please take a look at our [FAQ document](https://github.com/bloczjs/react-responsive/blob/master/FAQ.md).
