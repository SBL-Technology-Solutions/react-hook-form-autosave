import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mockedAPICall = async (timeout: number = 2000) => {
  console.log("mocking an API request");
  await new Promise((resolve) => setTimeout(resolve, timeout));
};
