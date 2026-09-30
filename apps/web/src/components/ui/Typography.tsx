import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Heading({
  children,
  level = 2,
  className,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const baseStyles = "font-heading font-semibold tracking-tight text-[var(--text)]";
  
  const sizeStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-extrabold",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg uppercase tracking-wider",
  };

  return (
    <Tag className={cn(baseStyles, sizeStyles[level], className)}>
      {children}
    </Tag>
  );
}

export function Text({
  children,
  className,
  variant = "body",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "body" | "muted" | "lead" | "small";
}) {
  const baseStyles = "font-sans font-normal";
  
  const variantStyles = {
    body: "text-base md:text-lg text-[var(--text)]",
    muted: "text-base md:text-lg text-[var(--muted-fg)]",
    lead: "text-xl md:text-2xl text-[var(--muted-fg)] font-light",
    small: "text-sm md:text-base text-[var(--muted-fg)]",
  };

  return (
    <p className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </p>
  );
}
