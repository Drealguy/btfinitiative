import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: boolean;
};

// Pill-shaped call-to-action link; primary carries the up-right arrow by default.
export function ButtonLink({
  size = "md",
  variant = "primary",
  icon = variant === "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon && (
        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}
