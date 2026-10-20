"use client";

import { LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentProps } from "react";

import { buttonVariants, type ButtonSize, type ButtonVariant } from "./button-variants";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      <AnimatePresence initial={false}>
        {loading && (
          <motion.span
            key="spinner"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex overflow-hidden"
          >
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </button>
  );
}
