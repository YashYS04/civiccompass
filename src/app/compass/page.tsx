'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Compass, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Lazy-load heavy interactive components for better initial page performance
const ElectionEducation = dynamic(() => import('@/components/ElectionEducation'), { ssr: true });
const EligibilityChecker = dynamic(() => import('@/components/EligibilityChecker'), { ssr: true });
const TimelineViewer = dynamic(() => import('@/components/TimelineViewer'), { ssr: true });
const MapLocator = dynamic(() => import('@/components/MapLocator'), { ssr: false, loading: () => <p>Loading map...</p> });
const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { ssr: false, loading: () => <p>Loading AI...</p> });

/**
 * CompassPage — The main interactive voter dashboard.
 * Combines education, eligibility checking, timeline, and AI chat
 * into a two-column responsive layout.
 */
export default function CompassPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Navigation Header */}
      <header
        role="banner"
        style={{
          backgroundColor: 'var(--card)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <Compass color="var(--primary)" />
            Civic Compass AI (India)
          </Link>
          <nav aria-label="User profile">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Logged in as Citizen</span>
              <div aria-hidden="true" style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                C
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" role="main" style={{ flex: 1, padding: '2rem 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Interactive Voting Tools */}
        <section aria-label="Voting tools">
          <div style={{ marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Voter Dashboard</h1>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Complete these steps to ensure you are ready for the upcoming election.
            </p>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <ElectionEducation />
            <EligibilityChecker />
            <TimelineViewer />
            <MapLocator />
          </Suspense>
        </section>

        {/* Right Column: AI Chat Assistant */}
        <aside aria-label="AI Guide" style={{ height: 'calc(100vh - 8rem)', position: 'sticky', top: '5rem' }}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} />
              AI Guide
            </h2>
            <Suspense fallback={<p>Loading AI assistant...</p>}>
              <ChatInterface />
            </Suspense>
          </div>
        </aside>
      </main>
    </div>
  );
}
