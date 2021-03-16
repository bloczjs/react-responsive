## Why isn’t there an option to retrieve the current breakpoint?

This is a bit hard to do and also it doesn’t really match this lib’s philosophy because breakpoints overlap each other.\
Let’s say that the breakpoint related to the current viewport is `md`, `smUp`, `xsUp`, `mdUp`, `md`, `mdDown`, `lgDown` and `xlDown` will all match this viewport.

We could say “Okay but if we don’t consider the `Up`s and `Down`s, we could have a 1-1 binding”. But this couldn’t work either with custom breakpoints. Anyone could have a `phone` breakpoint that goes from 200px to 700px, a `tablet` breakpoint that goes from 500px to 1100px etc. And in this case, a viewport of 600px doesn’t match a unique breakpoint.

That’s why the hook `useBreakpoint` was created.
