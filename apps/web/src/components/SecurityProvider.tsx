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

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {

      if (
        (e.metaKey || e.ctrlKey) && 
        (e.key === 'i' || e.key === 'j' || e.key === 'u' || e.key === 's')
      ) {
        e.preventDefault();
      }

      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
