'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Clock } from 'lucide-react';

const TIMELINE_EVENTS = [
  { phase: 'Phase 1', title: 'Notification by ECI', description: 'Formal announcement and issuance of the election notification.' },
  { phase: 'Phase 2', title: 'Nominations & Scrutiny', description: 'Candidates file nominations; RO verifies eligibility and validity.' },
  { phase: 'Phase 3', title: 'Campaigning Period', description: 'Intense public engagement phase (ends 48 hours before poll start).' },
  { phase: 'Phase 4', title: 'The Poll (Voting Day)', description: 'Citizens cast votes at designated polling booths across the country.' },
  { phase: 'Phase 5', title: 'Counting & Result', description: 'EVMs are unsealed, votes counted, and results officially declared.' },
];

/**
 * TimelineViewer — Displays the sequential stages of an Indian election.
 * Efficiency: Static data memoized automatically via React.memo.
 */
const TimelineViewer: React.FC = () => {
  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Clock size={20} color="var(--primary)" />
          Standard Election Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol 
          aria-label="Voter journey phases" 
          style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: '0.5rem 0 0 0.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem', 
            borderLeft: '2px solid var(--border)', 
            paddingLeft: '1.75rem' 
          }}
        >
          {TIMELINE_EVENTS.map((event, index) => (
            <li key={index} style={{ position: 'relative' }}>
              {/* Timeline Connector Dot */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-2.15rem',
                  top: '0.35rem',
                  width: '0.85rem',
                  height: '0.85rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  border: '3px solid var(--background)',
                  boxShadow: '0 0 0 2px var(--border)',
                }}
              />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em', marginBottom: '0.1rem' }}>
                {event.phase.toUpperCase()}
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>{event.title}</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                {event.description}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default React.memo(TimelineViewer);
