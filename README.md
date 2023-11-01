<div align="center">
<h1>useAutoSave</h1>

<p>A React hook, leveraging react-hook-form and a useDebounceDeepCompare hook to trigger autosave after a specified delay</p>
</div>

---

## Blog Post and Live Demo

The blog post accompanied with this code can be found at our [blog](https://www.sbltechsolutions.com).

A live demo can also be found at [https://react-hook-form-autosave.vercel.app/](https://react-hook-form-autosave.vercel.app/)

## Installation

Install the only dependency in addition to React - [react-hook-form](https://github.com/react-hook-form/react-hook-form):

```sh
npm install react-hook-form
```

Copy the code from both [/hooks/useAutoSave.ts](https://github.com/SBL-Technology-Solutions/react-hook-form-autosave/blob/main/hooks/useAutoSave.ts) and [/hooks/useDebounceDeepCompare.ts](https://github.com/SBL-Technology-Solutions/react-hook-form-autosave/blob/main/hooks/useDebounceDeepCompare.tsx) into your project or copy from the below:

### useDebounceDeepCompare.ts

```tsx
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
```

### useAutoSave.ts

```tsx
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
```

## Usage - Basic Example

The following is a basic example of how to use the `useAutoSave` hook. The example uses the `useForm` hook from `react-hook-form` to create a form with a single input field. The `useAutoSave` hook is used to watch the form data and whatever function is passed into the callback will trigger after the debounceTime delay (the time that the user is idle / not changing the form).

```tsx
"use client";

import { useAutoSave } from "@/hooks/useAutoSave";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  const { register } = form;

  const debouncedValue = useAutoSave(form, 2000, () => {
    console.log("Autosaving the following values", debouncedValue);
  });

  return (
    <div>
      <h1>Basic Example</h1>
      <p>
        <strong>Debounced Value:</strong> {JSON.stringify(debouncedValue.name)}
      </p>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register("name")} />
        </div>
      </form>
    </div>
  );
};

export default Page;
```

### Usage - Advanced Example

More complex examples where [zod](https://github.com/colinhacks/zod) and toasts from [shadcn/ui](https://github.com/shadcn-ui/ui) are used can be found in the [examples folder]("https://github.com/SBL-Technology-Solutions/react-hook-form-autosave/tree/main/app/examples").
