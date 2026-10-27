import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  numeral: string;
  label?: string;
  title: string;
  copy?: string;
  icon?: string;
  theme?: "light" | "dark" | "red";
  size?: "standard" | "wide" | "tall" | "featured";
  tags?: string[];
  children?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  numeral,
  label,
  title,
  copy,
  icon,
  theme = "light",
  size = "standard",
  tags,
  children,
  className,
  ...props
}) => {
  const themeStyles = {
    light: "bg-[#FFFFFF] text-[#1E1E1E] border-[#1E1E1E]/10 hover:border-[#9B1C22]/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
    dark: "bg-[#161616] text-[#FFFFFF] border-white/10 hover:border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.18)]",
    red: "bg-[#9B1C22] text-[#FFFFFF] border-[#9B1C22] hover:bg-[#85161C] shadow-[0_4px_24px_rgba(155,28,34,0.22)]",
  };

  const sizeStyles = {
    standard: "col-span-12 md:col-span-6 lg:col-span-4 min-h-[260px]",
    wide: "col-span-12 lg:col-span-8 min-h-[300px]",
    tall: "col-span-12 md:col-span-6 lg:col-span-4 min-h-[420px]",
    featured: "col-span-12 min-h-[320px]",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-6 sm:p-8 rounded-[20px] md:rounded-[24px] border",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden",
        themeStyles[theme],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Top Header: Numeral & Icon/Label */}
      <div className="flex items-center justify-between w-full mb-6">
        <span className="text-[28px] md:text-[34px] font-mono font-bold tracking-tight opacity-40 group-hover:opacity-100 transition-opacity">
          {numeral}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-[8px] border border-current/15 flex items-center justify-center shrink-0">
            <Icon name={icon} size={20} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="my-auto">
        {label && (
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-2 opacity-60">
            {label}
          </span>
        )}
        <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold tracking-[-0.025em] leading-tight mb-3">
          {title}
        </h3>
        {copy && (
          <p className="text-[14px] md:text-[15px] font-light leading-relaxed opacity-75 max-w-md">
            {copy}
          </p>
        )}
        {children}
      </div>

      {/* Bottom Footer Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-current/10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider rounded-[4px] bg-current/5 border border-current/10"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Subtle Ruby Red hover hairline highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9B1C22] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};
