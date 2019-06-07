import React from "react";
import {Only} from "react-only";

export default () => (
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
    <Only as="li" on="smUp" strict>
      Only visible for small and more (strict ]576px, Infinity[)
    </Only>
    <Only as="li" on="md" strict>
      Only visible for medium (strict ]768px, 992px[)
    </Only>
    <Only as="li" on="lgDown" strict>
      Only visible for large or less (strict [0, 1200px[)
    </Only>
  </ul>
);
