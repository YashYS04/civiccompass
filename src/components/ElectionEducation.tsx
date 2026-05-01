'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { BookOpen, Monitor, CheckSquare, Fingerprint, SmartphoneNfc, IdCard } from 'lucide-react';

/**
 * ElectionEducation — Interactive education component.
 * Features:
 * - Tabbed navigation for multi-topic education.
 * - Memoized tab switching.
 * - High-contrast iconography.
 */
const ElectionEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'evm' | 'rules'>('evm');

  const handleTabSwitch = useCallback((tab: 'evm' | 'rules') => {
    setActiveTab(tab);
  }, []);

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    padding: '0.65rem 1rem',
    cursor: 'pointer',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.9rem',
    color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
    borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
    marginBottom: '-0.65rem',
    transition: 'all 0.2s ease',
  });

  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookOpen size={20} color="var(--primary)" />
          Election Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tab List Navigation (ARIA-compliant) */}
        <div role="tablist" aria-label="Election topics" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          <button role="tab" aria-selected={activeTab === 'evm'} aria-controls="panel-evm" onClick={() => handleTabSwitch('evm')} style={tabStyle(activeTab === 'evm')}>
            EVM & VVPAT Guide
          </button>
          <button role="tab" aria-selected={activeTab === 'rules'} aria-controls="panel-rules" onClick={() => handleTabSwitch('rules')} style={tabStyle(activeTab === 'rules')}>
            Polling Day Rules
          </button>
        </div>

        {/* Tab Panels */}
        <div style={{ minHeight: '10rem' }}>
          {activeTab === 'evm' ? (
            <div id="panel-evm" role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <EducationItem 
                Icon={Monitor} 
                title="Electronic Voting Machine (EVM)" 
                desc="A standalone, secure device. You press the blue button next to your candidate's name. A red lamp and a beep confirm your vote." 
              />
              <EducationItem 
                Icon={CheckSquare} 
                title="VVPAT Verification" 
                desc="After voting, a paper slip appears behind a window for 7 seconds showing your chosen candidate. It confirms your vote is recorded correctly." 
              />
            </div>
          ) : (
            <div id="panel-rules" role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <EducationItem 
                Icon={IdCard} 
                title="Mandatory Identity Proof" 
                desc="Carry your original Voter ID (EPIC) or one of the 12 alternative documents like Aadhaar, PAN card, or Driving License." 
              />
              <EducationItem 
                Icon={SmartphoneNfc} 
                title="Device Prohibitions" 
                desc="Mobile phones, smartwatches, and cameras are strictly banned inside the polling compartment to maintain secrecy." 
                isWarning
              />
              <EducationItem 
                Icon={Fingerprint} 
                title="Indelible Ink Marking" 
                desc="A mark of participation. The officer will apply indelible ink on your left index finger after verifying your credentials." 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/** Internal reusable component for education items */
const EducationItem = ({ Icon, title, desc, isWarning }: { Icon: any, title: string, desc: string, isWarning?: boolean }) => (
  <div style={{ display: 'flex', gap: '1.15rem', alignItems: 'flex-start' }}>
    <div style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: isWarning ? '#fee2e2' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={22} color={isWarning ? '#dc2626' : 'var(--primary)'} aria-hidden="true" />
    </div>
    <div>
      <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>{title}</strong>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  </div>
);

export default React.memo(ElectionEducation);
