"use client";

import { useState, useEffect } from "react";

export default function LiveTime({ timeZone }: { timeZone: string }) {
  // Helper to format time safely on both server and client
  const formatTime = () => {
    try {
      const str = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      return `• ${str}`;
    } catch (e) {
      return "";
    }
  };

  // Initialize state with server-side time to avoid hydration mismatch and empty clock flash
  const [time, setTime] = useState<string>(formatTime);

  useEffect(() => {
    const updateTime = () => {
      setTime(formatTime());
    };

    updateTime();
    // Update every 10 seconds for seamless precision timing
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // If time could not be resolved, fall back cleanly
  if (!time) {
    return <span className="font-mono tracking-normal opacity-40">• 12:00 AM</span>;
  }

  return (
    <span className="font-mono tracking-normal normal-case" suppressHydrationWarning>
      {time}
    </span>
  );
}
