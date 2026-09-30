import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Global Creatiancy Button Design System
const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out rounded-full active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1E1E] focus-visible:ring-offset-2 text-center disabled:opacity-50 disabled:pointer-events-none";

const variantStyles = {
  primary: "bg-[#9B1C22] text-[#FFFFFF] hover:bg-[#1E1E1E] hover:text-[#FFFFFF] shadow-xl shadow-black/10 hover:shadow-black/20 [&_svg]:text-[#FFFFFF]",
  secondary: "bg-[#1E1E1E] text-[#FFFFFF] hover:bg-[#9B1C22] hover:text-[#FFFFFF] shadow-xl shadow-black/10 hover:shadow-black/20 [&_svg]:text-[#FFFFFF]",
  ghost: "bg-transparent text-[#1E1E1E] hover:text-[#9B1C22] active:scale-100",
};

const sizeStyles = {
  sm: "px-6 py-3 text-[13px]",
  md: "px-8 py-4 text-[14px]",
  lg: "px-8 py-4 text-[14px]", // Forcing all to match the master size
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
ButtonLink.displayName = "ButtonLink";
