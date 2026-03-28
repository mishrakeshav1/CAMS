import { CreditCard, Shield, Clock, Zap, ChevronRight, Sparkles } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative px-6 pt-8 pb-16 sm:px-8 max-w-lg mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-brand-600 font-extrabold text-lg">T</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">THULIMA</span>
          </div>

          {/* Headline */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">For Young Professionals</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Your First
              <br />
              Credit Card,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Made Simple.
              </span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Apply in under 5 minutes. No paperwork. Designed for young salaried professionals in Nepal.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <button
              onClick={onStart}
              className="w-full bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              Apply Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-white/50 text-sm text-center mt-4">
              Ages 21-30 &bull; Salaried employees &bull; Nepali citizens
            </p>
          </div>

          {/* Floating Card Preview */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="relative mx-auto max-w-xs">
              <div className="animate-card-tilt">
                <div className="bg-gradient-card rounded-2xl p-6 shadow-2xl aspect-[1.6/1] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white/60 text-xs font-medium tracking-wider uppercase">THULIMA Bank</div>
                      <div className="text-white font-bold text-sm mt-1">Credit Card</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-80" />
                  </div>
                  <div>
                    <div className="text-white/80 font-mono text-base tracking-[0.2em] mb-2">
                      &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 1234
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-white/40 text-[10px] uppercase">Card Holder</div>
                        <div className="text-white text-sm font-semibold">YOUR NAME</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/40 text-[10px] uppercase">Expires</div>
                        <div className="text-white text-sm font-semibold">12/28</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card shadow reflection */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-card rounded-2xl opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-12 sm:px-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Why THULIMA?
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: <Clock className="w-6 h-6" />,
              title: '5-Minute Apply',
              desc: 'Quick digital application',
              color: 'bg-brand-100 text-brand-600',
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'NRB Compliant',
              desc: 'Meets all KYC norms',
              color: 'bg-emerald-100 text-emerald-600',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Instant Decision',
              desc: 'Know in 24 hours',
              color: 'bg-amber-100 text-amber-600',
            },
            {
              icon: <CreditCard className="w-6 h-6" />,
              title: 'Zero Annual Fee',
              desc: 'First year free',
              color: 'bg-pink-100 text-pink-600',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-3`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Section */}
      <div className="px-6 py-8 sm:px-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>

        <div className="space-y-4">
          {[
            { step: '1', title: 'Fill Your Details', desc: 'Personal, identity & employment info' },
            { step: '2', title: 'Upload Documents', desc: 'Citizenship, photo & salary slip' },
            { step: '3', title: 'Choose Your Card', desc: 'Classic, Gold or Platinum' },
            { step: '4', title: 'Get Approved', desc: 'Decision within 24 hours' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div className="px-6 py-8 sm:px-8 max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-brand-50 to-purple-50 rounded-3xl p-6 border border-brand-100">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Eligibility</h3>
          <ul className="space-y-3">
            {[
              'Nepali citizen aged 21-30',
              'Salaried employee (private, government, or NGO)',
              'Minimum monthly income NPR 25,000',
              'Valid citizenship certificate',
              'Active bank account',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-12 sm:px-8 max-w-lg mx-auto">
        <button
          onClick={onStart}
          className="btn-primary w-full text-lg flex items-center justify-center gap-3 group"
        >
          Start Application
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-gray-400 text-xs text-center mt-4">
          Your data is secured with bank-grade encryption. By applying, you agree to THULIMA Bank's terms and NRB KYC regulations.
        </p>
      </div>
    </div>
  );
}
