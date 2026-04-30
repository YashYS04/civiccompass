import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ShieldCheck, Clock, MapPin, BookOpen } from 'lucide-react';

/**
 * Home — Landing page for Civic Compass AI.
 * Presents the value proposition and links to the interactive voter dashboard.
 * Server Component — no client JS shipped for this page.
 */
export default function Home() {
  /** Reusable style for feature cards */
  const featureCardStyle: React.CSSProperties = {
    padding: '2rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    backgroundColor: 'var(--background)',
    transition: 'box-shadow 0.2s ease',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header role="banner" style={{ padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem' }}>
            <Compass color="var(--primary)" size={32} aria-hidden="true" />
            Civic Compass AI
          </div>
          <Link
            href="/compass"
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)',
              fontWeight: 500,
            }}
          >
            Open App
          </Link>
        </div>
      </header>

      <main role="main">
        {/* Hero Section */}
        <section style={{ padding: '6rem 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Navigate Democracy with Confidence.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Your AI-powered guide to Indian election processes, timelines, and voter eligibility. Making civic engagement accessible for every citizen.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/compass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                }}
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <Link
                href="#features"
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" aria-label="Key features" style={{ padding: '5rem 0', backgroundColor: 'var(--card)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>
              Smart Features for Smart Citizens
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={featureCardStyle}>
                <ShieldCheck size={40} color="var(--primary)" aria-hidden="true" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Eligibility Check</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  Guided wizard verifying age, citizenship, and Electoral Roll enrollment per ECI rules.
                </p>
              </div>

              <div style={featureCardStyle}>
                <Clock size={40} color="var(--primary)" aria-hidden="true" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Election Timeline</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  Visual timeline of all five phases — from ECI notification to counting day.
                </p>
              </div>

              <div style={featureCardStyle}>
                <MapPin size={40} color="var(--primary)" aria-hidden="true" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Polling Locator</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  Enter your PIN code to find polling booths on a live Google Map with directions.
                </p>
              </div>

              <div style={featureCardStyle}>
                <BookOpen size={40} color="var(--primary)" aria-hidden="true" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>EVM Education</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  Learn how EVMs and VVPAT machines work, and understand voting-day rules.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--muted-foreground)' }}>
        <div className="container">
          <p>© {new Date().getFullYear()} Civic Compass AI. Built for the community.</p>
        </div>
      </footer>
    </div>
  );
}
