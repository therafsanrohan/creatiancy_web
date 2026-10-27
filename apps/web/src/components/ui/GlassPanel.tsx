import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "heavy";
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  intensity = "medium",
  ...props
}) => {
  const intensityStyles = {
    subtle: "bg-white/[0.06] backdrop-blur-[16px] border-white/[0.12]",
    medium: "bg-white/[0.09] backdrop-blur-[20px] saturate-[140%] border-white/[0.16]",
    heavy: "bg-white/[0.14] backdrop-blur-[24px] saturate-[150%] border-white/[0.20]",
  };

  return (
    <div
      className={cn(
        "rounded-[16px] md:rounded-[20px] border shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        "relative overflow-hidden transition-all duration-300",
        intensityStyles[intensity],
        className
      )}
      {...props}
    >
      {/* Soft inner highlight hairline */}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
      {children}
    </div>
  );
};
