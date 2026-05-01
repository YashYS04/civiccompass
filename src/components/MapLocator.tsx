'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { MapPin, ExternalLink } from 'lucide-react';
import { usePincode } from '@/hooks/usePincode';

const MAPS_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY || '';

/**
 * MapLocator — Visual interface for locating polling booths.
 * Uses the usePincode hook for search logic and validation.
 */
const MapLocator: React.FC = () => {
  const [localPin, setLocalPin] = useState('');
  const { searchQuery, error, search } = usePincode();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(localPin);
  };

  const mapSrc = searchQuery
    ? `https://www.google.com/maps/embed/v1/search?key=${MAPS_KEY}&q=polling+booth+${encodeURIComponent(searchQuery)},India&zoom=14`
    : '';

  const externalMapLink = searchQuery
    ? `https://www.google.com/maps/search/polling+booth+${encodeURIComponent(searchQuery)},India`
    : '';

  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={20} />
          Find Your Polling Booth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Enter your 6-digit PIN code..."
            value={localPin}
            onChange={(e) => setLocalPin(e.target.value)}
            aria-label="Enter PIN code"
            maxLength={6}
          />
          <Button type="submit" variant="primary">Search</Button>
        </form>

        {error && (
          <p role="alert" style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        {searchQuery ? (
          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ width: '100%', height: '350px', backgroundColor: 'var(--muted)' }}>
              <iframe
                title={`Polling stations near ${searchQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapSrc}
              />
            </div>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block' }}>Polling Stations near {searchQuery}</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  ECI standard polling hours: 7:00 AM – 6:00 PM
                </p>
              </div>
              <a
                href={externalMapLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--primary)' }}
              >
                Directions <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius)' }}>
            <p style={{ color: 'var(--muted-foreground)', margin: 0 }}>
              Enter your PIN above to see a live map of polling booths in your constituency.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(MapLocator);
