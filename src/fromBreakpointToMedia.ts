import { Breakpoint } from "./sanitize";

const andJoin = (input: string[]) => input.filter(Boolean).join(" and ");
const orJoin = (input: string[]) => input.filter(Boolean).join(",");

const build = (min: number, max: number, unit: string, strict = false) => {
  const mediaList: string[] = [];
  let str: string;
  // Min value
  if (min !== 0) {
    str = `${min}${unit}`;
    if (strict) {
      str = `calc(${str} + 1px)`;
    }
    mediaList.push(`(min-width:${str})`);
  }

  // Max value
  if (max !== Infinity) {
    str = `${max}${unit}`;
    if (strict) {
      str = `calc(${str} - 1px)`;
    }
    mediaList.push(`(max-width:${str})`);
  }
  return andJoin(mediaList);
};

export const fromBreakpointToMedia = (breakpoint: Breakpoint, strict = false) => {
  const [dim1, dim2, unit] = breakpoint;

  if (!Array.isArray(dim1) && !Array.isArray(dim2)) {
    return " " + build(dim1, dim2, unit, strict);
  }

  const media1 = build((dim1 as [number, number])[0], (dim1 as [number, number])[1], unit, strict);
  const media2 = build((dim2 as [number, number])[0], (dim2 as [number, number])[1], unit, strict);

  return (
    " " +
    orJoin([
      andJoin([media1, media2.replace(/width/g, "height")]),
      andJoin([media1.replace(/width/g, "height"), media2]),
    ])
  );
};
