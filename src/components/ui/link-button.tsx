import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonVariants, type ButtonSize, type ButtonVariant } from "./button-variants";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** Buton görünümünde bağlantı (gezinme için `<a>`, eylem için `<Button>` kullanılır). */
export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <Link className={buttonVariants({ variant, size, className })} {...props} />;
}
