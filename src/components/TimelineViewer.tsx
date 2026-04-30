import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Clock } from 'lucide-react';

/** Typical phases of an Indian General Election as per ECI guidelines */
const TIMELINE_EVENTS = [
  { phase: 'Phase 1', title: 'Notification by ECI', description: 'The Election Commission issues the formal notification for the election.' },
  { phase: 'Phase 2', title: 'Filing Nominations', description: 'Candidates file their nomination papers with the Returning Officer.' },
  { phase: 'Phase 3', title: 'Campaigning', description: 'Political parties and candidates campaign (ends 48 hours before polling).' },
  { phase: 'Phase 4', title: 'Polling Day', description: 'Voters cast their votes using EVMs at designated polling stations.' },
  { phase: 'Phase 5', title: 'Counting & Results', description: 'Votes are counted and the final results are declared.' },
];

/**
 * TimelineViewer — Displays the phases of an Indian General Election
 * in an interactive vertical timeline format.
 */
const TimelineViewer: React.FC = () => {
  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} />
          Election Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol aria-label="Election timeline phases" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid var(--border)', marginLeft: '1rem', paddingLeft: '1.5rem' }}>
          {TIMELINE_EVENTS.map((event, index) => (
            <li key={index} style={{ position: 'relative' }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-1.85rem',
                  top: '0.25rem',
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  border: '2px solid var(--background)',
                }}
              />
              <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{event.phase}</div>
              <div style={{ fontWeight: 500 }}>{event.title}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{event.description}</div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default React.memo(TimelineViewer);
