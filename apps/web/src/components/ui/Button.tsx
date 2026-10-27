import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Studio Single-Source-of-Truth CTA System with Electric Mint & Void Styling
// Minimum 48px touch target for accessibility and Google UI heuristics.
const baseStyles = 
  "group relative inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase " +
  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070809] " +
  "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] text-center min-h-[48px] min-w-[48px]";

const variantStyles = {
  primary: 
    "bg-[#FF2B43] text-white hover:bg-[#E01E37] font-semibold border border-[#FF2B43] shadow-[0_4px_20px_rgba(255,43,67,0.3)]",
  secondary: 
    "bg-[#0E1114] text-[#F4F5F7] hover:bg-white/[0.06] border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
  outline:
    "bg-transparent text-[#F4F5F7] hover:text-[#FF2B43] border border-white/15 hover:border-[#FF2B43]/60",
  glass:
    "bg-white/[0.03] backdrop-blur-xl text-[#F4F5F7] hover:bg-white/[0.08] hover:text-[#FF2B43] border border-white/10",
  white:
    "bg-white text-[#070809] hover:bg-neutral-200 border border-white shadow-md",
  "on-dark":
    "bg-white/[0.04] text-[#F4F5F7] border border-white/10 hover:border-[#FF2B43]/40 hover:text-[#FF2B43]",
  text: 
    "bg-transparent text-[#F4F5F7] hover:text-[#FF2B43] p-0 min-h-[48px] h-auto border-0 shadow-none font-semibold",
};

const sizeStyles = {
  sm: "h-12 px-5 text-[11px] rounded-full gap-2",
  md: "h-12 px-7 text-[12px] rounded-full gap-2.5",
  lg: "h-14 px-9 text-[13px] rounded-full gap-3",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", arrow = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span>{children}</span>
        {arrow && (
          <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        )}
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
  ({ className, variant = "primary", size = "md", arrow = false, href, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span>{children}</span>
        {arrow && (
          <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        )}
      </Link>
    );
  }
);
ButtonLink.displayName = "ButtonLink";
