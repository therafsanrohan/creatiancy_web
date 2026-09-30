import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)}>
      {children}
    </div>
  );
}

export function Grid({
  children,
  className,
  cols = 12,
}: {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
}) {
  const colStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
  };

  return (
    <div className={cn("grid gap-4 md:gap-6 lg:gap-8", colStyles[cols], className)}>
      {children}
    </div>
  );
}
