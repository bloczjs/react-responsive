import * as React from "react";
import { Only } from "react-only";

export default function Sample() {
  return (
    <>
      <h2>{"<Only>"}</h2>
      <ul>
        <Only as="li" on="xs">
          Only visible for extra small devices (portrait
          phones)
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
          Only visible for extra large devices (large
          desktops)
        </Only>
        <Only as="li" on="sm xl">
          Only visible for small AND extra large devices
        </Only>
        <Only as="li" on="smUp">
          Only visible for small and more ([576px,
          Infinity[)
        </Only>
        <Only as="li" on="lgDown">
          Only visible for large or less ([0, 1200px])
        </Only>
      </ul>
    </>
  );
}
