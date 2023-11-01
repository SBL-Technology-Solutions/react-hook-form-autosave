import { useEffect, useRef, useState } from "react";

export const useDebounceDeepCompare = <T,>(value: T, delay: number = 500) => {
  /**
   * A custom hook that returns a debounced value that is deep compared to the previous value.
   * @param value The value to be debounced.
   * @param delay The delay time in milliseconds. Defaults to 500 milliseconds.
   * @returns The debounced value after the delay.
   */
  const [debouncedValue, setDebouncedValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(previousValue.current)) {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
        previousValue.current = value;
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, delay]);
  return debouncedValue;
};
