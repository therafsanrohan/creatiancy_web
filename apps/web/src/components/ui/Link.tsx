import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import * as React from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CustomLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>, NextLinkProps {
  children: React.ReactNode;
  underline?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, children, underline = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center text-[var(--text)] transition-colors hover:text-[var(--ruby-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ruby-red)]";
    
    const underlineStyles = underline
      ? "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[var(--ruby-red)] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
      : "";

    return (
      <NextLink
        ref={ref}
        className={cn(baseStyles, underlineStyles, className)}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
