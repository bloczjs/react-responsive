# React-Only

## Table of Contents

1.  [Default breakpoints](#default-breakpoints)
2.  [Additional `Up` and `Down`](#additional-up-and-down)
3.  [Render as component](#render-as-component)
4.  [BreakpointsProvider](#breakpointsprovider)
    1.  [Add more breakpoints](#add-more-breakpoints)
    2.  [Change default breakpoints](#change-default-breakpoints)
5.  [Units](#units)
6.  [Match Media Queries](#match-media-queries)
7.  [toJSON](#tojson)
8.  [toCSS](#tocss)
9.  [CSS in JS](#css-in-js)
    1.  [Inline style](#inline-style)
    2.  [Styled-components](#styled-components)
    3.  [Styletron](#styletron)

## What is React-Only

React-only is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

Allows you to display component only for particular screen sizes.

## How to use

### Default breakpoints

React-Only is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

```javascript
import React from "react";
import Only, { BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider>
    <Only on="xs">Only visible for extra small devices (portrait phones)</Only>
    <Only on="sm">Only visible for small devices (landscape phones)</Only>
    <Only on="md">Only visible for medium devices (tablets)</Only>
    <Only on="lg">Only visible for large devices (desktops)</Only>
    <Only on="xl">Only visible for extra large devices (large desktops)</Only>
    <Only on="sm xl">Only visible for small AND extra large devices</Only>
  </BreakpointsProvider>
);
```

### Additional `Up` and `Down`

In addition to the regular breakpoints, you have another api defined `{breakpoint}Up` and `{breakpoint}Down`:

```javascript
import React from "react";
import Only, { BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider>
    <Only on="smUp">Visible on every device bigger or egal than "small"</Only>
    <Only on="mdDown">Visible on every device smaller or egal than "medium"</Only>
  </BreakpointsProvider>
);
```

### Render as component

If you want the `Only` components to render as another component, you can use the `as` props:

```javascript
import React from "react";
import Only, { BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider>
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
  </BreakpointsProvider>
);
```

The `as` props can take any DOM tag string (`div`, `ul`, `li`, ...) or any React component:

```javascript
import React from "react";
import Only, { BreakpointsProvider } from "react-only";

const Custom = ({ title, children }) => (
  <React.Fragment>
    <h3>{title}</h3>
    <p>{children}</p>
  </React.Fragment>
);

const App = () => (
  <BreakpointsProvider>
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
  </BreakpointsProvider>
);
```

Note that any props except for `matchMedia`, `as` and `on` will be forwarded to the `as` props.

### BreakpointsProvider

`BreakpointsProvider` defines the values of every breakpoints.

By default, the breakpoints are:

| Breakpoint |   From |       To |
| ---------- | -----: | -------: |
| xs         |    0px |    576px |
| sm         |  576px |    768px |
| md         |  768px |    992px |
| lg         |  992px |   1200px |
| xl         | 1200px | Infinity |

#### Add more breakpoints

```javascript
import React from "react";
import Only, { BreakpointsProvider } from "react-only";

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
import Only, { BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider breakpoints={{ sm: [263, 863] }}>
    <Only on="sm">Visible on every device from "263px" to "863px"</Only>
    <Only on="smUp">Visible on every device bigger than "263px"</Only>
    <Only on="smDown">Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

**Warning**: This **overrides completely** the default breakpoints, in this example, the other breakpoints `xs`, `md`, `lg` and `xl` **are no longer defined!**

### Units

```javascript
import React from "react";
import Only, { BreakpointsProvider } from "react-only";

const App = () => (
  <BreakpointsProvider additionalBreakpoints={{ pxPoint: [263, 863, "px"], emPoint: [20, 40, "em"] }}>
    <Only on="pxPoint">Visible on every device from "263px" to "863px"</Only>
    <Only on="emPoint">Visible on every device from "20em" to "40em"</Only>
  </BreakpointsProvider>
);
```

Every CSS units are supported.

The default unit is `px`.

### Match Media Queries

For more advanced media queries, the prop `matchMedia` can be set to any regular query supported by [window.matchMedia](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia).

```javascript
import React from "react";
import Only from "react-only";

const App = () => (
  <Only matchMedia="(min-device-width: 500px) and (orientation: landscape)">
    Visible on every device bigger than "500px" and in landscape mode
  </Only>
);
```

[More infos about CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

**Note:** If you use breakpoints AND matchMedia, the component will be displayed if one of the breakpoints is matched **OR** if the media query is fulfilled.

### toJSON

You can also use this library to set media-query in CSS-in-JS:

```javascript
import { toJSON } from 'react-only';

const style = toJSON({ xs: { width: '10px' }, lg: { width: '100px'}});
> style: {
  "width": "10px",
  "@media (min-width: 992px)": {
    "width": "100px"
  }
}
```

### toCSS

`toCSS` is a wrapper for `toJSON` but instead of displaying a JS object, it displays a valid CSS string:

```javascript
import { toCSS } from 'react-only';

const style = toJSON({ xs: { width: '10px' }, lg: { width: '100px'}});
> style: 'width: 10px;@media (min-width: 992px) {width: 100px;:hover {background-color: red;}}'
```

### CSS in JS

#### Inline style

React-Only shouldn't be used with inline styles because they don't support media queries. But you can still use React-Only with CSS-in-JS libraries like:

#### [Styled-components](https://www.styled-components.com/)

```javascript
const App = styled.div`
  ${toCSS({ xs: { width: "10px" }, lg: { width: "100px" } })};
`;
```

#### [Styletron](https://github.com/rtsao/styletron)

```javascript
const App = styled("div", () => ({
  ...toJSON({ xs: { width: "10px" }, lg: { width: "100px" } })
}));
```
