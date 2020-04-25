import React from "react";
import { Only } from "react-only";

interface CustomProps {
  title: string;
}

const Custom: React.FunctionComponent<CustomProps> = ({
  title,
  children,
}) => (
  <>
    <h3>{title}</h3>
    <p>{children}</p>
  </>
);

export default () => (
  <>
    <h2>Custom component</h2>
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
  </>
);
