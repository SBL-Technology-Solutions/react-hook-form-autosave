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
    <div className="min-h-[70vh] container mx-auto px-6">
      <h1 className="text-2xl font-semibold my-8">Basic Example</h1>
      <p>
        <strong>Debounced Value:</strong> {JSON.stringify(debouncedValue.name)}
      </p>
      <form>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-white font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded bg-slate-800 px-2 py-1 text-white"
            type="text"
            {...register("name")}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
