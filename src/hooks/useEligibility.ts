import { useState, useCallback } from 'react';

export interface EligibilityStep {
  id: string;
  question: string;
}

const STEPS: EligibilityStep[] = [
  { id: 'age', question: 'Will you be 18 years or older on the qualifying date (usually Jan 1st)?' },
  { id: 'citizen', question: 'Are you a Citizen of India?' },
  { id: 'registered', question: 'Have you filled Form 6 and enrolled your name in the Electoral Roll?' },
];

/**
 * useEligibility — Custom hook for voter eligibility wizard logic.
 * Encapsulates state transitions and result calculation.
 */
export function useEligibility() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = useCallback((answer: boolean) => {
    const stepId = STEPS[currentStep].id;
    setAnswers((prev) => ({ ...prev, [stepId]: answer }));

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentStep]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  }, []);

  const results = isComplete ? {
    isEligible: answers.age && answers.citizen,
    needsRegistration: !answers.registered
  } : null;

  return {
    currentStep,
    totalSteps: STEPS.length,
    question: STEPS[currentStep].question,
    handleAnswer,
    reset,
    isComplete,
    results
  };
}
