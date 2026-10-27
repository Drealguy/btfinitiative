import type { ComponentProps } from "react";

export const buttonSizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
  // md on phones/tablets, lg from desktop up
  responsive: "h-11 px-5 text-[0.9375rem] lg:h-13 lg:px-7 lg:text-base",
};

export const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  light: "bg-surface text-night hover:bg-sun-tint",
  ghost: "text-night hover:bg-night/5",
};

export type ButtonSize = keyof typeof buttonSizes;
export type ButtonVariant = keyof typeof buttonVariants;

// Shared pill styling for every button and button-styled link.
export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className = "") {
  return `group inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;
}

type ButtonProps = ComponentProps<"button"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({ size = "md", variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
