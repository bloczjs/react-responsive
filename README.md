# React-Only

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

## What is React-Only?

At the beginning, react-only comes from `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

## How to use?

### Default breakpoints

React-Only is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider>
    <Only xs>Only visible for extra small devices (portrait phones)</Only>
    <Only sm>Only visible for small devices (landscape phones)</Only>
    <Only md>Only visible for medium devices (tablets)</Only>
    <Only lg>Only visible for large devices (desktops)</Only>
    <Only xl>Only visible for extra large devices (large desktops)</Only>
    <Only sm xl>Only visible for small AND extra large devices</Only>
  </BreakpointsProvider>
);
```

### Additional `Up` and `Down`

In addition to the regular breakpoints, you have another api defined `{breakpoint}Up` and `{breakpoint}Down`:

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider>
    <Only smUp>Visible on every device bigger or egal than "small"</Only>
    <Only mdDown>Visible on every device smaller or egal than "medium"</Only>
  </BreakpointsProvider>
);
```

### BreakpointsProvider

`BreakpointsProvider` is here to define the values of every breakpoints.

By default, the breakpoints are:

| Breakpoint | From   | To       |
|------------|-------:|---------:|
| xs         | 0px    | 576px    |
| sm         | 576px  | 768px    |
| md         | 768px  | 992px    |
| lg         | 992px  | 1200px   |
| xl         | 1200px | Infinity |

#### Add more breakpoints

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider additionalBreakpoints={{ customBrkPts: [263, 863] }}>
    <Only customBrkPts>Visible on every device from "263px" to "863px"</Only>
    <Only customBrkPtsUp>Visible on every device bigger than "263px"</Only>
    <Only customBrkPtsDown>Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

#### Change default breakpoints

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider breakpoints={{ sm: [263, 863] }}>
    <Only sm>Visible on every device from "263px" to "863px"</Only>
    <Only smUp>Visible on every device bigger than "263px"</Only>
    <Only smDown>Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

WARNING: This overrides completely the default breakpoints, in this example, the other breakpoints `xs`, `md`, `lg` and `xl`  are no longer defined!
