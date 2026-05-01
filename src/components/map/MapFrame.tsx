import React from 'react';
import { ExternalLink } from 'lucide-react';

interface MapFrameProps {
  pincode: string;
  src: string;
  externalLink: string;
}

/**
 * MapFrame — Modular component for the Google Maps iframe and details.
 * Quality: Decouples map display from search logic.
 * Efficiency: Uses loading="lazy" for the iframe.
 */
const MapFrame: React.FC<MapFrameProps> = ({ pincode, src, externalLink }) => {
  return (
    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div style={{ width: '100%', height: '350px', backgroundColor: 'var(--muted)' }}>
        <iframe
          title={`Polling stations near ${pincode}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={src}
        />
      </div>
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--card)' }}>
        <div>
          <strong style={{ display: 'block' }}>Polling Stations near {pincode}</strong>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
            Polling hours: 7:00 AM – 6:00 PM
          </p>
        </div>
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}
        >
          Directions <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default React.memo(MapFrame);
