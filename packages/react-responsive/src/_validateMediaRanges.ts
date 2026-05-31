import type { ExposedMediaRanges } from "./sanitize";

type MediaRangeKey<T extends ExposedMediaRanges> = Extract<
  keyof T,
  string
>;

export type ValidMediaRangeName<
  T extends ExposedMediaRanges,
> =
  | MediaRangeKey<T>
  | `${MediaRangeKey<T>}Up`
  | `${MediaRangeKey<T>}Down`;

type CollectInvalidMediaRanges<
  T extends ExposedMediaRanges,
  S extends string,
> = S extends `${infer Head} ${infer Tail}`
  ? Head extends ValidMediaRangeName<T>
    ? CollectInvalidMediaRanges<T, Tail>
    : CollectInvalidMediaRanges<
          T,
          Tail
        > extends infer Rest extends string
      ? Rest extends ""
        ? Head
        : `${Head} ${Rest}`
      : never
  : S extends ""
    ? ""
    : S extends ValidMediaRangeName<T>
      ? ""
      : S;

export type ValidatedMediaRangeString<
  T extends ExposedMediaRanges,
  S extends string,
> =
  CollectInvalidMediaRanges<
    T,
    S
  > extends infer Invalid extends string
    ? Invalid extends ""
      ? S extends ""
        ? "Invalid media range: empty string"
        : S
      : `Invalid media ranges: ${Invalid}`
    : never;
