# @blocz/react-responsive

<center>

[![npm version][2]][3]
[![downloads][4]][5]
[![js-standard-style][6]][7]

[![gzipped size][10]][11]
[![stability][0]][1]
[![speed][8]][9]

</center>

`@blocz/react-responsive` is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

It allows you to display component only for particular screen sizes.

If you need a responsive layout and adaptive components, `@blocz/react-responsive` is here for you!

[See changelog](https://github.com/bloczjs/react-responsive/blob/master/CHANGELOG.md)

## How to use

1. [@blocz/react-responsive](#bloczreact-responsive)
   1. [How to use](#how-to-use)
      1. [`<Only>`](#only)
         1. [Default breakpoints](#default-breakpoints)
         2. [Additional `Up` and `Down`](#additional-up-and-down)
         3. [Match Media Queries](#match-media-queries)
         4. [Render as component](#render-as-component)
      2. [Hooks](#hooks)
         1. [`useBreakpoint()`](#usebreakpoint)
         2. [`useMediaQuery()`](#usemediaquery)
      3. [`<Match>`](#match)
         1. [`only` and `matchMedia` props](#only-and-matchmedia-props)
         2. [Use a custom component in Match](#use-a-custom-component-in-match)
      4. [`<BreakpointsProvider>`](#breakpointsprovider)
         1. [Add more breakpoints](#add-more-breakpoints)
         2. [Change default breakpoints](#change-default-breakpoints)
         3. [Units](#units)
         4. [Direction](#direction)
      5. [CSS in JS](#css-in-js)
         1. [`toJSON`](#tojson)
         2. [`toCSS`](#tocss)
      6. [Comparison to other libraries](#comparison-to-other-libraries)
      7. [`matchMedia` polyfill](#matchmedia-polyfill)
         1. [Browser](#browser)
         2. [Node](#node)
      8. [FAQ](#faq)

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

### `<Match>`

#### `only` and `matchMedia` props

The `Match` will look into every props of its children (and event nested children) to detect `only` and `matchMedia` props. If one of those is found, it will wrap the child in a `Only` component will those props auto-set.

```javascript
import React from "react";
import { Only, Match } from "@blocz/react-responsive";

const App = () => (
  <Match>
    <div only="xs">xs</div>
    <div only="sm">sm</div>
    <div only="md">md</div>
    <div only="sm lg">sm and lg</div>
    <div only="xl">xl</div>
    <div>
      <div>
        <div>
          <div only="smDown">nested smDown</div>
        </div>
      </div>
    </div>
    <div matchMedia="(min-width:768px) and (max-width:992px),(max-width:576px)">
      {"(min-width:768px) and (max-width:992px),(max-width:576px)"}
    </div>
  </Match>
);
```

#### Use a custom component in Match

You can also render the `Match` component as another one:

```javascript
import React from "react";
import { Only, Match } from "@blocz/react-responsive";

const App = () => (
  <Match as="ul">
    <li only="xs">xs</li>
    <li only="sm">sm</li>
    <li only="md">md</li>
    <li only="lg">lg</li>
    <li only="xl">xl</li>
  </Match>
);
```

If you’re using TypeScript, `Match` will work out of the box for native DOM elements.
But if you want to use it for custom components, you’ll have to use the type `MatchChildProps`:

```tsx
import * as React from "react";
import { Match, MatchChildProps } from "@blocz/react-responsive";

// MatchChildProps includes the props `only` and `matchMedia`
interface CustomProps extends MatchChildProps {
  title: string;
}

const Custom: React.FunctionComponent<CustomProps> = ({ title, children }) => (
  <React.Fragment>
    <h3>{title}</h3>
    <p>{children}</p>
  </React.Fragment>
);

const App = () => (
  <Match>
    <Custom only="xs" title="xs">
      xs
    </Custom>
    <Custom only="sm" title="sm">
      sm
    </Custom>
    <Custom only="md" title="md">
      md
    </Custom>
    <Custom only="lg" title="lg">
      lg
    </Custom>
    <Custom only="xl" title="xl">
      xl
    </Custom>
  </Match>
);
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

### CSS in JS

`@blocz/react-responsive` includes 2 utility functions `toJSON` and `toCSS` so that you can re-use `@blocz/react-responsive` breakpoints as media queries for `css-in-js` libraries.

#### `toJSON`

Example with [`styletron`](https://github.com/styletron/styletron):

```jsx
import React from "react";
import { toJSON as createToJSON, BreakpointsContext } from "@blocz/react-responsive";
import { styled } from "styletron-react";

const styles = {
  mdDown: {
    color: "red",
    ":hover": { color: "blue" },
  },
  lgUp: {
    color: "green",
  },
};

const Panel = styled("div", (props) => ({
  ...props.$toJSON(styles),
}));

const App = () => {
  const breakpoints = React.useContext(BreakpointsContext);
  const toJSON = createToJSON(breakpoints);
  // toJSON(styles) returns:
  // {
  //   "@media  (max-width:991px)": {
  //     "color": "red",
  //     ":hover": {
  //       "color": "blue"
  //     }
  //   },
  //   "@media  (min-width:992px)": {
  //     "color": "green"
  //   }
  // }
  return <Panel $toJSON={toJSON}>content</Panel>;
};
```

#### `toCSS`

Example with [`emotion`](https://emotion.sh):

```jsx
import React from "react";
import { toCSS as createToCSS, BreakpointsContext } from "@blocz/react-responsive";
import { css } from "emotion";

const styles = {
  mdDown: {
    color: "red",
    ":hover": { color: "blue" },
  },
  lgUp: {
    color: "green",
  },
};

const App = () => {
  const breakpoints = React.useContext(BreakpointsContext);
  const toCSS = createToCSS(breakpoints);
  // toCSS(styles) returns:
  // `@media  (max-width:991px) {
  //   color: red;
  //   :hover {
  //     color: blue;
  //   }
  // }
  // @media  (min-width:992px) {
  //   color: green;
  // }`
  return <div className={css(toCSS(styles))}>content</div>;
};
```

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

[0]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/@blocz/react-responsive.svg?style=flat-square
[3]: https://npmjs.org/package/@blocz/react-responsive
[4]: http://img.shields.io/npm/dm/@blocz/react-responsive.svg?style=flat-square
[5]: https://npmjs.org/package/@blocz/react-responsive
[6]: https://img.shields.io/badge/code%20style-prettier-brightgreen.svg?style=flat-square
[7]: https://prettier.io/
[8]: https://img.shields.io/badge/speed-blazingly%20fast-orange.svg?style=flat-square
[9]: https://twitter.com/acdlite/status/974390255393505280
[10]: http://img.badgesize.io/https://unpkg.com/@blocz/react-responsive/lib/@blocz/react-responsive.js?compression=gzip&style=flat-square
[11]: https://unpkg.com/@blocz/react-responsive/lib/
