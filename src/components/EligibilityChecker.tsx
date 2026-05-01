'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { useEligibility } from '@/hooks/useEligibility';

/**
 * EligibilityChecker — Interactive wizard for voter eligibility.
 * Uses the useEligibility hook to manage state and transitions.
 */
const EligibilityChecker: React.FC = () => {
  const { currentStep, totalSteps, question, handleAnswer, reset, isComplete, results } = useEligibility();

  if (isComplete && results) {
    return (
      <Card style={{ margin: '1rem 0' }}>
        <CardHeader>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color={results.isEligible ? 'var(--primary)' : '#dc2626'} />
            Eligibility Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          {results.isEligible ? (
            <div role="alert" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>You are eligible to vote!</p>
              {results.needsRegistration ? (
                <div style={{ backgroundColor: 'var(--muted)', padding: '1rem', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--primary)' }}>
                  <p style={{ margin: 0, fontSize: '0.9375rem' }}>
                    <strong>Action Required:</strong> You still need to register. Submit <strong>Form 6</strong> via 
                    <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ margin: '0 4px' }}>voters.eci.gov.in</a> 
                    to enroll in the Electoral Roll.
                  </p>
                </div>
              ) : (
                <p style={{ color: 'var(--muted-foreground)' }}>
                  You are registered and ready. Ensure you carry your EPIC (Voter ID) or an accepted photo ID to the polling booth.
                </p>
              )}
            </div>
          ) : (
            <div role="alert" style={{ color: '#dc2626' }}>
              <p style={{ fontWeight: 600 }}>Not currently eligible.</p>
              <p style={{ fontSize: '0.9375rem' }}>Only Indian citizens aged 18 or older on the qualifying date can vote in general elections.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={reset} variant="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RotateCcw size={16} /> Check Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <ShieldCheck size={20} />
            Eligibility Checker
          </CardTitle>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>
            STEP {currentStep + 1} OF {totalSteps}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ minHeight: '4rem', display: 'flex', alignItems: 'center' }}>
          <p id="q-text" style={{ fontSize: '1.125rem', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
            {question}
          </p>
        </div>
      </CardContent>
      <CardFooter style={{ gap: '0.75rem' }}>
        <Button onClick={() => handleAnswer(true)} variant="primary" style={{ flex: 1 }} aria-describedby="q-text">
          Yes
        </Button>
        <Button onClick={() => handleAnswer(false)} variant="secondary" style={{ flex: 1 }} aria-describedby="q-text">
          No
        </Button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(EligibilityChecker);
