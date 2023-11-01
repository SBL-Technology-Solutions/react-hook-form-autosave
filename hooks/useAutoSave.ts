"use client";

import { useDebounceDeepCompare } from "@/hooks/useDebounceDeepCompare";
import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

/**
 * A custom hook that automatically saves form data when the form is dirty and the debounced value changes after the debounceTime delay.
 * @param {UseFormReturn<T>} useFormReturn - The return value of the `useForm` hook from `react-hook-form`.
 * @param {number} debounceTime - The time in milliseconds to debounce/delay the form value changes. Defaults to 2000 milliseconds.
 * @param {() => void | Promise<void>} callback - The function to call when the form data is saved.
 * @returns {T} - The debounced form values object.
 */
export const useAutoSave = <T extends FieldValues>(
  useFormReturn: UseFormReturn<T>,
  debounceTime: number = 2000,
  callback: () => void | Promise<void>
) => {
  const {
    watch,
    formState: { isDirty },
  } = useFormReturn;

  const debouncedValue = useDebounceDeepCompare(watch(), debounceTime);
  const DebouncedValueStringified = JSON.stringify(debouncedValue);

  useEffect(() => {
    console.log("save is triggered, checking if isDirty is true");
    const debouncedSave = async () => {
      if (!isDirty) {
        console.log("autosave not triggered because form is not dirty");
        return;
      }
      console.log("isDirty is true, saving form data");
      await callback();
    };

    debouncedSave();
    // We are explicitly using only the debouncedValue as a dependency because we only want this useEffect to run when the debouncedValue changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DebouncedValueStringified]);

  return debouncedValue;
};
