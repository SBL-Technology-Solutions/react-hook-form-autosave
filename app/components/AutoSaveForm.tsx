"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Loader2, Send } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  message: z.string().nonempty({ message: "Message is required" }),
});

const mockedAPICall = async (timeout: number = 2000) => {
  console.log("mocking an API request");
  await new Promise((resolve) => setTimeout(resolve, timeout));
};

export const AutoSaveForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    watch,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

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
      setIsLoading(true);
      //simulate API call and wait 2 seconds
      await mockedAPICall(2000);
      toast({
        variant: "success",
        title: "Autosaved Form",
        description: (
          <div className="flex flex-col gap-2 text-sm">
            <span>Name: {debouncedValue.name}</span>
            <span>Email: {debouncedValue.email}</span>
            <span>Message: {debouncedValue.message}</span>
          </div>
        ),
      });
      reset({ ...debouncedValue });
      setIsLoading(false);
    };

    debouncedSave();
    // We are explicitly using only the debouncedValue as a dependency because we only want this useEffect to run when the debouncedValue changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DebouncedValueStringified]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("submitting form data:", data);
    setIsLoading(true);
    await mockedAPICall(2000);
    toast({ variant: "success", title: "Form submitted successfully!" });
    reset({ ...data });
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 text-white font-semibold">
        <span>isDirty: {isDirty.toString()}</span>
        <span>Dirty Fields: {JSON.stringify(dirtyFields, null, 2)}</span>
        <span>Debounced Value: {JSON.stringify(debouncedValue, null, 2)}</span>
      </div>

      <form
        className="flex flex-col gap-4 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <label className="text-white font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            type="text"
            {...register("name")}
          />
          <small className="text-red-700">{errors?.name?.message}</small>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-white font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            type="email"
            {...register("email")}
          />
          <small className="text-red-700">{errors?.email?.message}</small>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-white font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            {...register("message")}
          />
          <small className="text-red-700">{errors?.message?.message}</small>
        </div>
        <Button
          variant="default"
          type="submit"
          className="my-4 text-base hover:scale-105 transition-transform duration-200 active:scale-95 focus-visible:scale-95"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />{" "}
              <span className="px-2">Saving...</span>
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
