import React from "react";
import * as Icons from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IconName = keyof typeof Icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  strokeWidth = 1.5,
  className,
  ...props
}) => {
  // @ts-ignore
  const LucideIcon = Icons[name] as React.ComponentType<any>;

  if (!LucideIcon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={cn("shrink-0", className)}
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0 text-current", className)}
      {...props}
    />
  );
};
