## Why the name `react-only`?

This library was initially named like because its initial purpose was to render certain components **only** on specific screen sizes. I wanted to use the name `react-responsive` or something like this but it was already taken 🤷.

## Why isn’t there an option to retrieve the current breakpoint?

This is a bit hard to do and also it doesn’t really match this lib’s philosophy because breakpoints overlap each other.\
Let’s say that the breakpoint related to the current viewport is `md`, `smUp`, `xsUp`, `mdUp`, `md`, `mdDown`, `lgDown` and `xlDown` will all match this viewport.

We could say “Okay but if we don’t consider the `Up`s and `Down`s, we could have a 1-1 binding. But this couldn’t work either with custom breakpoints. Anyone could have a `phone` breakpoint that goes from 200px to 700px, a `tablet` breakpoint that goes from 500px to 1100px etc. And in this case, a viewport of 600px doesn’t match a unique breakpoint.

That’s why the hook `useOnly` was created.

## Why does `useOnly` returns `undefined` during the initialization?

Until the version `2.1`, `useOnly` was initialized with `false`. But if the actual initial value is `true`, the component using `useOnly` could blink during the initialization.

Also from a strictly logic point of view, you could expect `useOnly('mdUp')` to be the opposite of `useOnly('smDown')`. But during this initialization, if you had those 2 defined in the component, their initial value would be both `false`. Which makes impossible to which one is right.

With the initial value being `undefined`, it is possible to do `if (value === undefined) return null;` in the component so that this state is avoided.
