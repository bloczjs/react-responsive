// @ts-ignore
const matchMedia: typeof window.matchMedia = () => ({
  matches: true,
  addListener: (cb: Function | null) => {
    if (!cb) {
      return;
    }
    cb({ matches: true });
  },
  removeListener: () => {}
});

export default matchMedia;
