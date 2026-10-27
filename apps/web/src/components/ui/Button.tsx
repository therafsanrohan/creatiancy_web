import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Studio Single-Source-of-Truth CTA System with Creatiancy Branding Red & Apple-Clean Styling
// Minimum 48px touch target for accessibility and Google UI heuristics.
const baseStyles = 
  "group relative inline-flex items-center justify-center font-medium tracking-wide " +
  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22] focus-visible:ring-offset-2 " +
  "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] text-center min-h-[48px] rounded-full";

const variantStyles = {
  primary: 
    "bg-gradient-to-b from-[#A8242A] to-[#9B1C22] text-white hover:from-[#9B1C22] hover:to-[#82151B] font-medium border border-[#9B1C22]/30 shadow-[0_2px_12px_rgba(155,28,34,0.25)] hover:shadow-[0_4px_20px_rgba(155,28,34,0.35)]",
  secondary: 
    "bg-white hover:bg-neutral-50 text-[#1D1D1F] border border-black/[0.08] hover:border-black/20 shadow-sm",
  outline:
    "bg-transparent text-[#1D1D1F] hover:text-[#9B1C22] border border-black/15 hover:border-[#9B1C22]/60",
  glass:
    "bg-white/80 backdrop-blur-xl text-[#1D1D1F] hover:bg-white hover:text-[#9B1C22] border border-black/10 shadow-sm",
  white:
    "bg-white text-[#1D1D1F] hover:bg-neutral-100 border border-black/[0.08] shadow-sm",
  "on-dark":
    "bg-white/[0.04] text-[#1D1D1F] border border-black/10 hover:border-[#9B1C22]/40 hover:text-[#9B1C22]",
  text: 
    "bg-transparent text-[#1D1D1F] hover:text-[#9B1C22] p-0 min-h-[48px] h-auto border-0 shadow-none font-medium",
};

const sizeStyles = {
  sm: "h-11 px-5 text-[12px]",
  md: "h-12 px-7 text-[13px]",
  lg: "h-13 px-8 text-[13px]",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", arrow: _arrow, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span>{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: keyof typeof variantStyles;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", arrow: _arrow, href, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span>{children}</span>
      </Link>
    );
  }
);
ButtonLink.displayName = "ButtonLink";
