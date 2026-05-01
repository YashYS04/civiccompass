'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { MapPin } from 'lucide-react';
import { usePincode } from '@/hooks/usePincode';
import MapFrame from './map/MapFrame';

const MAPS_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY || '';

/**
 * MapLocator — High-level container for the polling booth search.
 * Structure: Uses custom hook for logic and MapFrame for display.
 */
const MapLocator: React.FC = () => {
  const [localPin, setLocalPin] = useState('');
  const { searchQuery, error, search } = usePincode();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(localPin);
  };

  /** Efficiency: Memoize computed URLs to avoid re-renders on keystrokes */
  const { mapSrc, externalLink } = useMemo(() => {
    if (!searchQuery) return { mapSrc: '', externalLink: '' };
    const query = encodeURIComponent(searchQuery);
    return {
      mapSrc: `https://www.google.com/maps/embed/v1/search?key=${MAPS_KEY}&q=polling+booth+${query},India&zoom=14`,
      externalLink: `https://www.google.com/maps/search/polling+booth+${query},India`
    };
  }, [searchQuery]);

  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={20} color="var(--primary)" />
          Find Your Polling Booth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Enter your 6-digit PIN code..."
            value={localPin}
            onChange={(e) => setLocalPin(e.target.value)}
            aria-label="Enter PIN code"
            maxLength={6}
          />
          <Button type="submit">Search</Button>
        </form>

        {error && <ErrorMessage message={error} />}

        {searchQuery ? (
          <MapFrame pincode={searchQuery} src={mapSrc} externalLink={externalLink} />
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
};

const ErrorMessage = ({ message }: { message: string }) => (
  <p role="alert" style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem', fontWeight: 500 }}>
    {message}
  </p>
);

const EmptyState = () => (
  <div style={{ textAlign: 'center', padding: '2.5rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius)' }}>
    <p style={{ color: 'var(--muted-foreground)', margin: 0, fontSize: '0.9375rem' }}>
      Enter your area PIN code to locate nearby polling booths on the map.
    </p>
  </div>
);

export default React.memo(MapLocator);
