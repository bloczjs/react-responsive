// eslint-disable-next-line
import { h, Component } from 'preact';

export default h;

export const Children = { map: (children, cb) => children.map(cb) };

export { h as createElement, Component, Component as PureComponent };
