import { useState } from 'react';
import { CreditCard, ChevronRight, Check, Star, Crown, Gem } from 'lucide-react';
import type { CardSelection as CardSelectionType, CardType } from '../types';

interface Props {
  data: CardSelectionType;
  monthlySalary: string;
  onNext: (data: CardSelectionType) => void;
}

interface CardOption {
  type: CardType;
  name: string;
  tagline: string;
  gradient: string;
  icon: typeof Star;
  annualFee: string;
  creditLimit: string;
  features: string[];
  minSalary: number;
  popular?: boolean;
}

export default function CardSelection({ data, monthlySalary, onNext }: Props) {
  const [form, setForm] = useState<CardSelectionType>(data);
  const [errors, setErrors] = useState<string>('');

  const salary = Number(monthlySalary.replace(/\D/g, '')) || 0;

  const cards: CardOption[] = [
    {
      type: 'classic',
      name: 'THULIMA Classic',
      tagline: 'Your perfect first card',
      gradient: 'bg-gradient-card',
      icon: Star,
      annualFee: 'FREE first year, then NPR 500/yr',
      creditLimit: `Up to NPR ${(salary * 2).toLocaleString('en-NP')}`,
      features: [
        '1% cashback on all spends',
        'Free SMS alerts',
        'Contactless payments',
        'Online shopping enabled',
        '45-day interest-free period',
      ],
      minSalary: 25000,
    },
    {
      type: 'gold',
      name: 'THULIMA Gold',
      tagline: 'For the ambitious you',
      gradient: 'bg-gradient-card-gold',
      icon: Crown,
      annualFee: 'FREE first year, then NPR 1,500/yr',
      creditLimit: `Up to NPR ${(salary * 2.5).toLocaleString('en-NP')}`,
      features: [
        '2% cashback on dining & travel',
        '1.5% cashback on everything else',
        'Airport lounge access (2x/year)',
        'Travel insurance NPR 5 Lakh',
        'EMI conversion facility',
        'Priority customer support',
      ],
      minSalary: 40000,
      popular: true,
    },
    {
      type: 'platinum',
      name: 'THULIMA Platinum',
      tagline: 'Premium privileges await',
      gradient: 'bg-gradient-card-coral',
      icon: Gem,
      annualFee: 'FREE first year, then NPR 3,000/yr',
      creditLimit: `Up to NPR ${(salary * 3).toLocaleString('en-NP')}`,
      features: [
        '3% cashback on dining & travel',
        '2% cashback on everything else',
        'Unlimited airport lounge access',
        'Travel insurance NPR 10 Lakh',
        'Concierge service',
        'Reward points 3X multiplier',
        'Fuel surcharge waiver',
      ],
      minSalary: 60000,
    },
  ];

  const handleSelect = (type: CardType) => {
    const card = cards.find(c => c.type === type);
    if (card && salary >= card.minSalary) {
      setForm(prev => ({ ...prev, selectedCard: type }));
      setErrors('');
    }
  };

  const handleSubmit = () => {
    if (!form.selectedCard) {
      setErrors('Please select a card');
      return;
    }
    if (!form.agreedToTerms) {
      setErrors('You must agree to the terms and conditions');
      return;
    }
    onNext(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Section Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
            <CreditCard className="w-7 h-7 text-pink-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Choose Your Card</h1>
          <p className="text-gray-500 mt-1">Select the card that matches your lifestyle</p>
        </div>

        {/* Cards */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {cards.map((card) => {
            const isEligible = salary >= card.minSalary;
            const isSelected = form.selectedCard === card.type;
            const Icon = card.icon;

            return (
              <div
                key={card.type}
                onClick={() => isEligible && handleSelect(card.type)}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'ring-4 ring-brand-400 ring-offset-2 shadow-glow'
                    : isEligible
                    ? 'hover:shadow-card-hover'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Popular Badge */}
                {card.popular && (
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Selected Check */}
                {isSelected && (
                  <div className="absolute top-3 left-3 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                    <Check className="w-4 h-4 text-brand-600" />
                  </div>
                )}

                {/* Card Visual */}
                <div className={`${card.gradient} p-5 pb-4`}>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-white/60 text-xs font-medium tracking-wider uppercase">THULIMA Bank</p>
                      <p className="text-white font-bold text-lg">{card.name.split(' ')[1]}</p>
                    </div>
                    <Icon className="w-8 h-8 text-white/60" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-white/80 font-mono text-sm tracking-widest">
                      &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; ****
                    </div>
                    <div className="w-10 h-6 bg-gradient-to-br from-yellow-300/80 to-yellow-500/80 rounded" />
                  </div>
                </div>

                {/* Card Details */}
                <div className="bg-white p-5">
                  <p className="text-gray-500 text-sm mb-3">{card.tagline}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Credit Limit</p>
                      <p className="text-sm font-bold text-gray-900">{card.creditLimit}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Annual Fee</p>
                      <p className="text-sm font-bold text-gray-900">{card.annualFee.split(',')[0]}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {card.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>

                  {!isEligible && (
                    <div className="mt-3 bg-red-50 rounded-lg p-2 text-center">
                      <p className="text-red-600 text-xs font-medium">
                        Min. salary NPR {card.minSalary.toLocaleString('en-NP')}/month required
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Terms */}
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              checked={form.agreedToTerms}
              onChange={e => {
                setForm(prev => ({ ...prev, agreedToTerms: e.target.checked }));
                if (errors) setErrors('');
              }}
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              I agree to THULIMA Bank's{' '}
              <span className="text-brand-600 font-medium">Credit Card Terms & Conditions</span>,{' '}
              <span className="text-brand-600 font-medium">Privacy Policy</span>, and authorize the bank
              to verify my information as per NRB KYC/AML regulations.
            </span>
          </label>
          {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="btn-primary w-full flex items-center justify-center gap-2 group"
          >
            Review Application
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
