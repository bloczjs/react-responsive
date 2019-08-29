import * as React from "react";

export function useDebouncedValue<Value>(value: Value, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<Value>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
