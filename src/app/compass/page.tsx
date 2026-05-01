'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Compass, BookOpen, User } from 'lucide-react';
import Link from 'next/link';

/**
 * Optimized Lazy Loading:
 * - Load interactive tools with standard SSR for SEO/Accessibility.
 * - Load Chat assistant and Maps with ssr: false as they rely on client-side state/APIs.
 */
const ElectionEducation = dynamic(() => import('@/components/ElectionEducation'), { ssr: true });
const EligibilityChecker = dynamic(() => import('@/components/EligibilityChecker'), { ssr: true });
const TimelineViewer = dynamic(() => import('@/components/TimelineViewer'), { ssr: true });
const MapLocator = dynamic(() => import('@/components/MapLocator'), { ssr: false, loading: () => <div style={{ height: '200px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Interactive Map...</div> });
const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { ssr: false, loading: () => <div style={{ height: '400px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Initializing AI Assistant...</div> });

/**
 * CompassPage — Production-ready voter dashboard.
 * Implements a balanced two-column layout with sticky navigation and contextual tools.
 */
export default function CompassPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
      {/* App Header */}
      <header
        role="banner"
        style={{
          backgroundColor: 'var(--card)',
          borderBottom: '1px solid var(--border)',
          padding: '0.75rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--foreground)' }}>
            <Compass color="var(--primary)" size={24} />
            <span style={{ letterSpacing: '-0.02em' }}>Civic Compass AI</span>
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', borderRadius: '2rem', backgroundColor: 'var(--muted)' }}>
              <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                <User size={14} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Citizen</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Layout */}
      <main className="container" role="main" style={{ flex: 1, padding: '2rem 1rem', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Section: Contextual Guides & Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
              Voter Dashboard
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem' }}>
              Essential tools to prepare you for the upcoming Indian elections.
            </p>
          </div>

          <Suspense fallback={<div>Loading Dashboard Content...</div>}>
            <section aria-label="Educational Resources">
              <ElectionEducation />
            </section>
            
            <section aria-label="Voter Tools">
              <EligibilityChecker />
              <MapLocator />
            </section>

            <section aria-label="Election Timeline">
              <TimelineViewer />
            </section>
          </Suspense>
        </div>

        {/* Right Section: Sticky AI Chat Assistant */}
        <aside 
          aria-label="AI Guide" 
          style={{ 
            height: 'calc(100vh - 7rem)', 
            position: 'sticky', 
            top: '5.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingLeft: '0.25rem' }}>
            <BookOpen size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>AI Guide</h2>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>LIVE</span>
            </div>
          </div>
          
          <div style={{ flex: 1, minHeight: 0 }}>
            <Suspense fallback={<div>Initializing Assistant...</div>}>
              <ChatInterface />
            </Suspense>
          </div>
        </aside>
      </main>

      <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
        <p>© 2026 Civic Compass AI • Non-partisan Election Guidance Service</p>
      </footer>
    </div>
  );
}
