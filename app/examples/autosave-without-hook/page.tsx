"use client";

import { ToastFormState } from "@/components/ToastFormState";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/use-toast";
import { FormSchema, formSchema } from "@/lib/schema";
import { mockedAPICall } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "usehooks-ts";

export const AutoSaveFormWithoutHook = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submittingOrSaving, setSubmittingOrSaving] = useState<
    "Submitting" | "Saving"
  >("Saving");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset,
    watch,
  } = form;

  const debouncedValue = useDebounce(watch(), 2000);

  const DebouncedValueStringified = JSON.stringify(debouncedValue);

  useEffect(() => {
    console.log("save is triggered, checking if isDirty is true");
    const debouncedSave = async () => {
      if (!isDirty) {
        console.log("autosave not triggered because form is not dirty");
        return;
      }
      console.log("isDirty is true, saving form data");
      setSubmittingOrSaving("Saving");
      setIsLoading(true);

      //simulate API call and wait 2 seconds
      await mockedAPICall(2000);

      toast({
        variant: "success",
        title: "Form AutoSaved Successfully!",
        description: <ToastFormState formState={debouncedValue} />,
      });

      reset({ ...debouncedValue });
      setIsLoading(false);
    };

    debouncedSave();
    // We are explicitly using only the debouncedValue as a dependency because we only want this useEffect to run when the debouncedValue changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DebouncedValueStringified]);

  const onSubmit = async (data: FormSchema) => {
    console.log("submitting form data:", data);
    setSubmittingOrSaving("Submitting");
    setIsLoading(true);
    await mockedAPICall(2000);
    toast({
      variant: "success",
      title: "Form Submitted Successfully!",
      description: <ToastFormState formState={data} />,
    });
    reset({ ...data });
    setIsLoading(false);
  };

  return (
    <div className="container min-h-[70vh] mx-auto px-6">
      <h1 className="text-2xl font-semibold my-8">
        AutoSave Without Hook Example
      </h1>

      <div className="flex flex-col gap-2 text-white font-semibold">
        <span>isDirty: {isDirty.toString()}</span>
        <span>Dirty Fields: {JSON.stringify(dirtyFields, null, 2)}</span>
        <span>Debounced Value: {JSON.stringify(debouncedValue, null, 2)}</span>
      </div>
      <form
        className="flex flex-col gap-4 py-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded bg-slate-800 px-2 py-1 text-white"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name?.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded bg-slate-800 px-2 py-1 text-white"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full rounded bg-slate-800 px-2 py-1 text-white"
            {...register("message")}
          />
          {errors.message && (
            <span className="text-red-600 text-sm">
              {errors.message?.message}
            </span>
          )}
        </div>
        <Button
          variant="default"
          type="submit"
          className="my-8 text-base hover:scale-105 transition-transform duration-200 active:scale-95 focus-visible:scale-95"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />{" "}
              <span className="px-2">{submittingOrSaving}...</span>
            </>
          ) : (
            <>
              <Send />
              <span className="font-bold px-2">Submit</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AutoSaveFormWithoutHook;
