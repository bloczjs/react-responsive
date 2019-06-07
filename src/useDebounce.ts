import * as React from "react";

function useDebounce<Value>(value: Value, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<Value>(value);

  React.useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}

export default useDebounce;
