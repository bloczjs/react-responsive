const matchMedia: typeof window.matchMedia = () => ({
  matches: true,
  media: "@media node",
  onchange: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
  addListener: () => {},
  removeListener: () => {}
});

export default window.matchMedia || matchMedia;
