'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { BookOpen, Monitor, CheckSquare, Fingerprint, SmartphoneNfc, IdCard } from 'lucide-react';

/**
 * ElectionEducation — An interactive educational component
 * explaining Indian EVM usage, VVPAT verification, and voting rules.
 */
const ElectionEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'evm' | 'rules'>('evm');

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    fontWeight: isActive ? 600 : 400,
    fontSize: '0.9375rem',
    color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
    borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
    marginBottom: '-0.6rem',
    transition: 'color 0.2s, border-color 0.2s',
  });

  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} />
          Election Education (India)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div role="tablist" aria-label="Education topics" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          <button role="tab" aria-selected={activeTab === 'evm'} aria-controls="tab-evm" onClick={() => setActiveTab('evm')} style={tabStyle(activeTab === 'evm')}>
            How EVMs Work
          </button>
          <button role="tab" aria-selected={activeTab === 'rules'} aria-controls="tab-rules" onClick={() => setActiveTab('rules')} style={tabStyle(activeTab === 'rules')}>
            Voting Rules
          </button>
        </div>

        {/* EVM Tab Content */}
        {activeTab === 'evm' && (
          <div id="tab-evm" role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Monitor size={24} color="var(--primary)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Electronic Voting Machine (EVM)</strong>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  An EVM consists of a Control Unit and a Balloting Unit. You press the blue button next to the candidate of your choice. A red light flashes and a beep confirms your vote.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckSquare size={24} color="var(--primary)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>VVPAT (Voter Verifiable Paper Audit Trail)</strong>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  After pressing the EVM button, a printed paper slip appears behind the VVPAT window for 7 seconds. Verify the serial number, name, and symbol of your chosen candidate.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Rules Tab Content */}
        {activeTab === 'rules' && (
          <div id="tab-rules" role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <IdCard size={24} color="var(--primary)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <strong>EPIC / Voter ID is Mandatory</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  You must carry your original Electoral Photo Identity Card (EPIC) or an accepted alternative photo ID (Aadhaar, PAN, Passport).
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <SmartphoneNfc size={24} color="#dc2626" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <strong>No Mobile Phones in Booth</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  Mobile phones, cameras, or any recording devices are strictly prohibited inside the polling booth.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Fingerprint size={24} color="var(--primary)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <strong>Indelible Ink</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  The polling officer marks your left index finger with indelible ink, ensuring the &quot;One Person, One Vote&quot; principle.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(ElectionEducation);
