# react-only

<center>

[![npm version][2]][3]
[![downloads][4]][5]
[![js-standard-style][6]][7]

[![gzipped size][10]][11]
[![stability][0]][1]
[![speed][8]][9]

</center>

`react-only` is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

It allows you to display component only for particular screen sizes.

If you need a responsive layout and adaptive components, `react-only` is here for you!

[See changelog](https://github.com/Ayc0/react-only/blob/master/CHANGELOG.md)

## How to use

1.  [`<Only>`](#only)
    1.  [Default breakpoints](#default-breakpoints)
    2.  [Additional `Up` and `Down`](#additional-up-and-down)
    3.  [Match Media Queries](#match-media-queries)
    4.  [Render as component](#render-as-component)
    5.  [Strict mode](#strict-mode)
2.  [`<Match>`](#match)
    1.  [`only` and `matchMedia` props](#only-and-matchmedia-props)
    2.  [Use a custom component in Match](#use-a-custom-component-in-match)
    3.  [TypeScript support](#typescript-support)
3.  [`Hooks`](#hooks)
    1.  [`useOnly()`](#useonly)
    2.  [`useQuery()`](#usequery)
4.  [`<BreakpointsProvider>`](#breakpointsprovider)
    1.  [Add more breakpoints](#add-more-breakpoints)
    2.  [Change default breakpoints](#change-default-breakpoints)
    3.  [Units](#units)
5.  [Comparison to other libraries](#comparison-to-other-libraries)
6.  [`matchMedia` polyfill](#matchmedia-polyfill)

### `<Only>`

#### Default breakpoints

`react-only` is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

```javascript
import React from "react";
import { Only } from "react-only";

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
import { Only } from "react-only";

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
import { Only } from "react-only";

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
import { Only } from "react-only";

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
import { Only } from "react-only";

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

#### Strict mode

When `strict` is set in the props, the margins are offset by 1 px:

```javascript
import React from "react";
import { Only } from "react-only";

const App = () => (
  <React.Fragment>
    <Only on="xs">Only visible for range: [576px, 768px]</Only>
    <Only on="xs" strict>
      Only visible for range: [577px, 767px]
    </Only>
  </React.Fragment>
);
```

### `<Match>`

### `only` and `matchMedia` props

The `Match` will look into every props of its children (and event nested children) to detect `only`, `matchMedia` and `strict` props. If one of those is found, it will wrap this component inside a `Only` component will match `only` with `on` and `matchMedia` and `strict` to theirself.

```javascript
import React from "react";
import { Only, Match } from "react-only";

const App = () => (
  <Match>
    <div only="xs">xs</div>
    <div only="sm">sm</div>
    <div only="md">md</div>
    <div only="lg" strict>
      strict lg
    </div>
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

### Use a custom component in Match

You can also render the `Match` component as another one:

```javascript
import React from "react";
import { Only, Match } from "react-only";

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

### TypeScript support

⚠️ There is currently no full TypeScript support for the `Match` component,
for now you can only use components as children and not DOM elements:

```tsx
import * as React from "react";
import { Match, MatchChildProps } from "react-only";

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

### Hooks

#### `useOnly()`

`useOnly` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given breakpoint matches the current viewport.

```javascript
import React from "react";
import { useOnly } from "react-only";

const App = () => {
  const matchXl = useOnly("xl");
  const matchMdDown = useOnly("mdDown");
  const matchMdStrict = useOnly("md", true);
  return (
    <ul>
      {matchXl && <li>Visible on every "large" device</li>}
      {matchMdDown && <li>Visible on every device smaller or equal than "medium"</li>}
      {matchMdStrict && <li>Visible on every strict "medium" device</li>}
    </ul>
  );
};
```

#### `useQuery()`

`useQuery` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given media query matches the current viewport.

```javascript
import React from "react";
import { useQuery } from "react-only";

const App = () => {
  const matchMediaQuery = useQuery("(min-width:768px) and (max-width:992px),(max-width:576px)");
  return <ul>{matchMediaQuery && <li>Visible at (min-width:768px) and (max-width:992px),(max-width:576px)</li>}</ul>;
};
```

### `<BreakpointsProvider>`

`BreakpointsProvider` defines the values of every breakpoints.

Use it to inject or modify the breakpoints (only use one `BreakpointsProvider` per build).

#### Add more breakpoints

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "react-only";

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
import { Only, BreakpointsProvider } from "react-only";

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
import { Only, BreakpointsProvider } from "react-only";

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
import { Only, BreakpointsProvider } from "react-only";

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

| Lib                                                                                        | Breakpoints | Custom breakpoints | Media query | `resize` event' | hooks | SSR support |
| ------------------------------------------------------------------------------------------ | ----------: | -----------------: | ----------: | --------------: | ----: | ----------: |
| [react-only](https://www.npmjs.com/package/react-only)                                     |          ✅ |                 ✅ |          ✅ |              ❌ |    ✅ |          ✅ |
| [react-responsive](https://www.npmjs.com/package/react-responsive)                         |          ❌ |                 ❌ |          ✅ |              ❌ |    ✅ |          ✅ |
| [react-breakpoints](https://www.npmjs.com/package/react-breakpoints)                       |          ✅ |                 ✅ |          ❌ |              ✅ |    ❌ |          ✅ |
| [react-responsive-breakpoints](https://www.npmjs.com/package/react-responsive-breakpoints) |          ✅ |                 ❌ |          ❌ |              ✅ |    ❌ |          ❌ |

': `resize` event means that the library is built around `window.addEventListener('resize', callback)` and not `matchMedia.addListener(callback)`

### `matchMedia` polyfill

#### Browser

If you are on want to use matchMedia on browser that don’t support it, I’d recommend you to use [`matchmedia-polyfill`](https://github.com/paulirish/matchMedia.js/).

#### Node

If you want to mock `matchMedia` on Node to execute tests for instance, you can use [`mock-match-media`](https://github.com/Ayc0/mock-match-media/).

And if you need an example with `Jest`, `@testing-library/react`, `React` and `react-only`, you can take a look at [these tests](https://github.com/Ayc0/react-only/blob/master/packages/tests/src/__tests__/ssr.ts).

[0]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/react-only.svg?style=flat-square
[3]: https://npmjs.org/package/react-only
[4]: http://img.shields.io/npm/dm/react-only.svg?style=flat-square
[5]: https://npmjs.org/package/react-only
[6]: https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square
[7]: https://github.com/airbnb/javascript
[8]: https://img.shields.io/badge/speed-blazingly%20fast-orange.svg?style=flat-square
[9]: https://twitter.com/acdlite/status/974390255393505280
[10]: http://img.badgesize.io/https://unpkg.com/react-only/lib/react-only.js?compression=gzip&style=flat-square
[11]: https://unpkg.com/react-only/lib/
