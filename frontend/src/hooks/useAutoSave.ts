import { useState, useEffect, useRef } from 'react';

// Generic auto-save hook
export const useAutoSave = <T>(key: string, data: T, delay: number = 2000) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to save data
    timeoutRef.current = window.setTimeout(async () => {
      setIsSaving(true);
      try {
        // Save to localStorage
        localStorage.setItem(key, JSON.stringify(data));
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    // Cleanup timeout on unmount or when data/key changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, delay]);

  // Load saved data
  const loadSavedData = (): T | null => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load saved data:', error);
      return null;
    }
  };

  // Clear saved data
  const clearSavedData = () => {
    localStorage.removeItem(key);
  };

  return { isSaving, lastSaved, loadSavedData, clearSavedData };
};