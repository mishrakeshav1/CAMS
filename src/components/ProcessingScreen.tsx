import { useEffect, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  borrowerName: string;
  onComplete: () => void;
}

const STEPS = [
  { label: 'Extracting document data...', duration: 800 },
  { label: 'Verifying borrower identity...', duration: 700 },
  { label: 'Analyzing financial statements...', duration: 900 },
  { label: 'Computing DSCR & LTV ratios...', duration: 600 },
  { label: 'Cross-referencing NRB directives...', duration: 750 },
  { label: 'Assessing collateral value...', duration: 650 },
  { label: 'Running credit risk model...', duration: 800 },
  { label: 'Generating comprehensive memo...', duration: 700 },
];

export default function ProcessingScreen({ borrowerName, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let totalDelay = 0;
    STEPS.forEach((step, i) => {
      totalDelay += step.duration;
      setTimeout(() => {
        setCurrentStep(i);
        setCompletedSteps(prev => [...prev, i - 1]);
      }, totalDelay - step.duration);
    });
    setTimeout(() => {
      setCompletedSteps(STEPS.map((_, i) => i));
      setTimeout(onComplete, 500);
    }, totalDelay + 200);
  }, [onComplete]);

  const progress = ((completedSteps.length) / STEPS.length) * 100;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Animated Logo */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-nepal-blue to-blue-700 flex items-center justify-center animate-pulse-glow">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                  <circle
                    cx="20" cy="20" r="18"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${progress * 1.13} 113`}
                    strokeLinecap="round"
                    transform="rotate(-90 20 20)"
                    className="transition-all duration-500"
                  />
                  <text x="20" y="25" textAnchor="middle" className="fill-white" fontSize="10" fontWeight="bold">
                    {Math.round(progress)}%
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6">Analyzing Application</h2>
          <p className="text-blue-300 mt-1">Processing documents for <strong>{borrowerName}</strong></p>
        </div>

        {/* Steps */}
        <div className="space-y-3 glass-card-solid p-5">
          {STEPS.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = currentStep === i && !isDone;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isDone ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="flex-shrink-0">
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/20" />
                  )}
                </div>
                <span className={`text-sm ${isDone ? 'text-emerald-300' : isActive ? 'text-white' : 'text-white/40'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-xs mt-4">
          AI-powered analysis · NRB Compliant · Secure Processing
        </p>
      </div>
    </div>
  );
}
