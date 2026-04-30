import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem' }}>
            <Compass color="var(--primary)" size={32} />
            Civic Compass AI
          </div>
          <Link href="/compass" style={{ padding: '0.5rem 1.5rem', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: 'var(--radius)', fontWeight: 500, textDecoration: 'none' }}>
            Open App
          </Link>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{ padding: '6rem 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Navigate Democracy with Confidence.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Your personalized, AI-powered guide to election processes, timelines, and voter eligibility. Making civic engagement accessible for everyone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/compass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '1.125rem', textDecoration: 'none' }}>
                Get Started <ArrowRight size={20} />
              </Link>
              <Link href="#features" style={{ padding: '1rem 2rem', backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)', borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '1.125rem', textDecoration: 'none' }}>
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ padding: '5rem 0', backgroundColor: 'var(--card)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Smart Features for Smart Citizens</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--background)' }}>
                <ShieldCheck size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Eligibility Check</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>Quickly determine if you meet the requirements to vote in upcoming elections with our step-by-step guided form.</p>
              </div>

              <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--background)' }}>
                <Clock size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Interactive Timeline</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>Never miss a deadline. Keep track of registration deadlines, early voting dates, and election day.</p>
              </div>

              <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--background)' }}>
                <MapPin size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Polling Locator</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>Find exact locations for early voting and election day polling booths based on your current ZIP code.</p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--muted-foreground)' }}>
        <div className="container">
          <p>© 2026 Civic Compass AI. Built for the community.</p>
        </div>
      </footer>
    </div>
  );
}
