/* eslint-disable @typescript-eslint/no-unused-vars */
import * as ReactResponsive from "@blocz/react-responsive";
import packageJSON from "@blocz/react-responsive/package.json" with { type: "json" };

const shape = {};
for (const key of Object.keys(ReactResponsive)) {
  shape[key] = typeof ReactResponsive[key];
}
// The stdout is used in resolver.ts
console.log(JSON.stringify(shape));
