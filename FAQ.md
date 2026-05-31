## Why media ranges instead of breakpoints?

In Bootstrap, each name (`xs`, `sm`, …) refers to a single fixed point. But they don’t tell you whether the device is below or above it — is a device `xs` if it’s below or above that point? And no matter which definition you pick, it’s wrong: if "above", then an `xl` device also matches `lg`; if "below", then `xs` matches `md`. Bootstrap resolves this through implicit overrides, which isn’t easy to reason about.

`@blocz/react-responsive` uses **media ranges** instead: each name describes the interval _between_ two specific points. This makes ranges explicit and non-overlapping — a `lg` device is never `md` or `xl`.

## Why isn’t there an option to retrieve the current media range?

This is a bit hard to do and also it doesn’t really match this lib’s philosophy because media ranges overlap each other.\
Let’s say that the media range related to the current viewport is `md`, `smUp`, `xsUp`, `mdUp`, `md`, `mdDown`, `lgDown` and `xlDown` will all match this viewport.

We could say “Okay but if we don’t consider the `Up`s and `Down`s, we could have a 1-1 binding”. But this couldn’t work either with custom media ranges. Anyone could have a `phone` media range that goes from 200px to 700px, a `tablet` media range that goes from 500px to 1100px etc. And in this case, a viewport of 600px doesn’t match a unique media range.

That’s why the hook `useMediaRange` was created.
