'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { MapPin, ExternalLink } from 'lucide-react';
import { isValidPincode } from '@/lib/utils';

/** Google Maps Embed API key from environment */
const MAPS_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY || '';

/**
 * MapLocator — Uses Google Maps Embed API (search mode) to show
 * polling booths near a given Indian PIN code.
 */
const MapLocator: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidPincode(pincode)) {
      setError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setSearchQuery(pincode.trim());
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
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Enter your PIN code (e.g. 110001)..."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            aria-label="Enter PIN code to find polling booth"
            maxLength={6}
          />
          <Button type="submit">Search</Button>
        </form>
        {error && (
          <p role="alert" style={{ color: '#dc2626', fontSize: '0.875rem', margin: '0 0 1rem' }}>{error}</p>
        )}

        {searchQuery ? (
          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', marginTop: '0.5rem' }}>
            <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--muted)' }}>
              <iframe
                key={searchQuery}
                title={`Polling booths near ${searchQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              />
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Polling booths near PIN {searchQuery}</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  Standard Polling Hours: 7:00 AM – 6:00 PM
                </p>
              </div>
              <a
                href={externalMapLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--primary)', whiteSpace: 'nowrap' }}
              >
                Open in Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Enter your area PIN code above to find nearby polling booths on the map.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(MapLocator);
