export default (intervalA, intervalB) => [
  Math.min(intervalA[0], intervalB[0]),
  Math.max(intervalA[1], intervalB[1]),
];
