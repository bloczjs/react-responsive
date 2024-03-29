import * as React from "react";
import { Match } from "@blocz/react-responsive";

export default function Sample() {
  return (
    <>
      <h2>{"<Match>"}</h2>
      <Match>
        {null}
        <div only="xs">xs</div>
        <div only="sm">sm</div>
        <div only="md">md</div>
        <div only="lg">lg</div>
        <div only="xl">xl</div>
        <div>
          <div>
            <div>
              <div only="smDown">nested smDown</div>
            </div>
          </div>
        </div>
        <div matchMedia="(min-width:768px) and (max-width:992px),(max-width:576px)">
          (min-width:768px) and
          (max-width:992px),(max-width:576px)
        </div>
      </Match>
      <Match as="ul">
        <li only="mdUp">mdUp</li>
        <li only="smDown">smDown</li>
      </Match>
    </>
  );
}
