export default (breakpoint) => {
  const out = [];
  if (breakpoint[0] !== 0) {
    out.push(`(min-width:${breakpoint[0]}${breakpoint[2]})`);
  }
  if (breakpoint[1] !== Infinity) {
    out.push(`(max-width:${breakpoint[1]}${breakpoint[2]})`);
  }
  if (out.length === 0) {
    return '';
  }
  return out.join(' and ');
};
