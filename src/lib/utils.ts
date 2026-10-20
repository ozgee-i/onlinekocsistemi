import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind sınıflarını koşullu birleştirir ve çakışanları son gelene göre çözer. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
