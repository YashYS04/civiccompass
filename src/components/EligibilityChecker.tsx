'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { ShieldCheck } from 'lucide-react';

/** Indian voter eligibility questions based on ECI rules */
const QUESTIONS = [
  { id: 'age', question: 'Will you be 18 years or older on the qualifying date (usually Jan 1st)?' },
  { id: 'citizen', question: 'Are you a Citizen of India?' },
  { id: 'registered', question: 'Have you filled Form 6 and enrolled your name in the Electoral Roll (Voter List)?' },
];

/**
 * EligibilityChecker — A step-by-step guided form that checks
 * whether a user meets the basic requirements to vote in India.
 */
const EligibilityChecker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [QUESTIONS[currentStep].id]: answer }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  if (isComplete) {
    const isEligible = answers.age && answers.citizen;
    const needsRegistration = !answers.registered;

    return (
      <Card style={{ margin: '1rem 0' }}>
        <CardHeader>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} />
            Eligibility Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEligible ? (
            <div role="alert" style={{ color: 'var(--primary)' }}>
              <p><strong>Good news!</strong> You meet the basic requirements to vote.</p>
              {needsRegistration ? (
                <p>
                  However, you still need to register. Submit <strong>Form 6</strong> online
                  via the Voter Helpline App or the ECI portal (
                  <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">voters.eci.gov.in</a>).
                </p>
              ) : (
                <p>You are registered and ready to go. Ensure you have your EPIC (Voter ID) card or an accepted photo ID for polling day!</p>
              )}
            </div>
          ) : (
            <div role="alert" style={{ color: '#dc2626' }}>
              <p>Based on your answers, you may not be eligible to vote in this upcoming election.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={reset} variant="outline">Check Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} />
          Eligibility Checker
        </CardTitle>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
          Step {currentStep + 1} of {QUESTIONS.length}
        </p>
      </CardHeader>
      <CardContent>
        <p id="eligibility-question" style={{ fontSize: '1.125rem', fontWeight: 500 }}>
          {QUESTIONS[currentStep].question}
        </p>
      </CardContent>
      <CardFooter style={{ gap: '0.5rem' }}>
        <Button onClick={() => handleAnswer(true)} variant="primary" aria-describedby="eligibility-question">Yes</Button>
        <Button onClick={() => handleAnswer(false)} variant="secondary" aria-describedby="eligibility-question">No</Button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(EligibilityChecker);
