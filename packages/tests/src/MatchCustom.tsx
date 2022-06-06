import * as React from "react";
import {
  Match,
  MatchChildProps,
} from "@blocz/react-responsive";

interface CustomProps extends MatchChildProps {
  title: string;
}

const Custom: React.FunctionComponent<
  React.PropsWithChildren<CustomProps>
> = ({ title, children }) => (
  <React.Fragment>
    <h3>{title}</h3>
    <p>{children}</p>
  </React.Fragment>
);

export default function Sample() {
  return (
    <>
      <h2>Custom component used as Match's children</h2>
      <Match>
        <Custom only="xs" title="xs">
          xs
        </Custom>
        <Custom only="sm" title="sm">
          sm
        </Custom>
        <Custom only="md" title="md">
          md
        </Custom>
        <Custom only="lg" title="lg">
          lg
        </Custom>
        <Custom only="xl" title="xl">
          xl
        </Custom>
      </Match>
    </>
  );
}
