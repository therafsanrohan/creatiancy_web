"use client";

import { useState, useEffect } from "react";

export default function LiveTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const str = new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setTime(`• ${str}`);
      } catch (e) {
        console.error("Invalid time zone", timeZone);
        setTime("");
      }
    };

    updateTime();
    // Update every 30 seconds to ensure the minute rolls over correctly
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // Keep a consistent height/width block to avoid layout shift before hydration
  if (!time) {
    return <span className="opacity-0 inline-block w-12 tracking-normal font-mono">• 00:00 AM</span>;
  }

  return (
    <span className="font-mono tracking-normal normal-case">
      {time}
    </span>
  );
}
