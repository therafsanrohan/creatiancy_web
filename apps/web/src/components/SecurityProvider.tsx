"use client";

import { useEffect } from 'react';

/**
 * SecurityProvider
 * ----------------
 * Implements basic frontend protection measures to discourage casual source viewing.
 * Note: These measures are not foolproof but add a layer of friction.
 */
export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Specific Key Combos (Inspect, Save, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + SHIFT + I (Inspect)
      // CMD/CTRL + SHIFT + J (Console)
      // CMD/CTRL + U (View Source)
      // CMD/CTRL + S (Save)
      if (
        (e.metaKey || e.ctrlKey) && 
        (e.key === 'i' || e.key === 'j' || e.key === 'u' || e.key === 's')
      ) {
        e.preventDefault();
      }

      // F12 (Inspect)
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
