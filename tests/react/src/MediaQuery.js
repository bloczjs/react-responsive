import React from "react";
import { toMediaQuery } from "react-only";

export default () => <p>{toMediaQuery("md xs")}</p>;
