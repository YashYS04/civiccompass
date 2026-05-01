import { useState, useCallback } from 'react';
import { isValidPincode, appCache } from '@/lib/utils';

/**
 * usePincode — Custom hook for PIN code search logic and caching.
 * Prevents redundant API loads by caching search queries.
 */
export function usePincode() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const search = useCallback((code: string) => {
    setError(null);
    const trimmed = code.trim();

    if (!isValidPincode(trimmed)) {
      setError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    // Efficiency: Use cache to avoid state updates if same PIN is searched
    if (trimmed === searchQuery) return;

    setSearchQuery(trimmed);
  }, [searchQuery]);

  return { searchQuery, error, search };
}
