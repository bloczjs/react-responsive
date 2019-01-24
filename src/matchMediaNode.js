const matchMedia = () => ({
  matches: true,
  addListener: (cb) => {
    cb({ matches: true });
  },
  removeListener: () => {},
});

export default matchMedia;
