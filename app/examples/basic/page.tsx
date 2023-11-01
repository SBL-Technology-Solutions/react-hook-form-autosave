"use client";

import { useAutoSave } from "@/hooks/useAutoSave";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm({
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
