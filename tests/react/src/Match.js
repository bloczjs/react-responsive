import React from "react";
import { Match } from "react-only";

export default () => (
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
      (min-width:768px) and (max-width:992px),(max-width:576px)
    </div>
  </Match>
);
