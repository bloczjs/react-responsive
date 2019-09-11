# React-Only

<center>

[![npm version][2]][3]
[![downloads][4]][5]
[![js-standard-style][6]][7]

[![gzipped size][10]][11]
[![stability][0]][1]
[![speed][8]][9]

</center>

## Table of Contents

1.  [`Only`](#only)
    1.  [Default breakpoints](#default-breakpoints)
    2.  [Additional `Up` and `Down`](#additional-up-and-down)
    3.  [Match Media Queries](#match-media-queries)
    4.  [Render as component](#render-as-component)
    5.  [Strict mode](#strict-mode)
2.  [`Match`](#match)
3.  [`useOnly`](#useOnly)
4.  [`BreakpointsProvider`](#breakpointsprovider)
    1.  [Add more breakpoints](#add-more-breakpoints)
    2.  [Change default breakpoints](#change-default-breakpoints)
    3.  [Units](#units)

## What is React-Only

React-only is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

Allows you to display component only for particular screen sizes.

## How to use

### `Only`

#### Default breakpoints

React-Only is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

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
    <Only on="smUp">Visible on every device bigger or egal than "small"</Only>
    <Only on="mdDown">
      Visible on every device smaller or egal than "medium"
    </Only>
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

### `Match`

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
      (min-width:768px) and (max-width:992px),(max-width:576px)
    </div>
  </Match>
);
```

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

### `useOnly`

`useOnly` is a [hook](https://reactjs.org/docs/hooks-intro.html) that detects if the given breakpoint or media query matches the current viewport.

```javascript
import React from "react";
import { useOnly } from "react-only";

const App = () => {
  const matchXl = useOnly("xl");
  const matchMdDown = useOnly("mdDown");
  const matchCustomMediaQuery = useOnly(
    undefined,
    "(min-width:768px) and (max-width:992px),(max-width:576px)"
  );
  const matchMdStrict = useOnly("md", undefined, true);
  return (
    <ul>
      {matchXl && <li>Visible on every "large" device</li>}
      {matchMdDown && (
        <li>Visible on every device smaller or egal than "medium"</li>
      )}
      {matchCustomMediaQuery && (
        <li>
          Visible at (min-width:768px) and (max-width:992px),(max-width:576px)
        </li>
      )}
      {matchMdStrict && <li>Visible on every strict "medium" device</li>}
    </ul>
  );
};
```

### `BreakpointsProvider`

`BreakpointsProvider` defines the values of every breakpoints.

Use it to inject or modify the breakpoints (only use one `BreakpointsProvider` per build).

#### Add more breakpoints

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider additionalBreakpoints={{ customBrkPts: [263, 863] }}>
    <Only on="customBrkPts">
      Visible on every device from "263px" to "863px"
    </Only>
    <Only on="customBrkPtsUp">Visible on every device bigger than "263px"</Only>
    <Only on="customBrkPtsDown">
      Visible on every device smaller than "863px"
    </Only>
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

```javascript
import React from "react";
import { Only, BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider
    additionalBreakpoints={{
      pxPoint: [263, 863, "px"],
      emPoint: [20, 40, "em"]
    }}
  >
    <Only on="pxPoint">Visible on every device from "263px" to "863px"</Only>
    <Only on="emPoint">Visible on every device from "20em" to "40em"</Only>
  </BreakpointsProvider>
);
```

Every CSS units are supported.

The default unit is `px`.

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
