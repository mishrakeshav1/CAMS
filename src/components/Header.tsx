import { ArrowLeft, Shield } from 'lucide-react';
import type { Step } from '../types';
import { STEP_ORDER, STEP_LABELS } from '../types';

interface HeaderProps {
  currentStep: Step;
  onBack?: () => void;
}

const FORM_STEPS = STEP_ORDER.filter(s => s !== 'welcome' && s !== 'success');

export default function Header({ currentStep, onBack }: HeaderProps) {
  if (currentStep === 'welcome' || currentStep === 'success') return null;

  const currentIndex = FORM_STEPS.indexOf(currentStep);
  const totalSteps = FORM_STEPS.length;
  const progress = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-lg mx-auto px-4 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">T</span>
                </div>
                <span className="font-bold text-gray-900 text-sm">THULIMA</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">Secure</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {STEP_LABELS[currentStep]}
            </span>
            <span className="text-xs font-medium text-gray-400">
              {currentIndex + 1} of {totalSteps}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-between mt-2 px-1">
            {FORM_STEPS.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < currentIndex
                      ? 'bg-brand-500'
                      : i === currentIndex
                      ? 'bg-brand-600 ring-4 ring-brand-100'
                      : 'bg-gray-200'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
