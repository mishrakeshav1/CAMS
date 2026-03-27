import { Building2, Shield } from 'lucide-react';

interface HeaderProps {
  step?: number;
  totalSteps?: number;
}

export default function Header({ step, totalSteps }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-nepal-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nepal-blue to-blue-700 flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-nepal-red rounded-full border-2 border-nepal-dark" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">Nepal Bank Ltd.</div>
              <div className="text-blue-300 text-xs font-medium tracking-wider">CAMS — Credit Analysis & Memo System</div>
            </div>
          </div>

          {/* Center — progress if available */}
          {step && totalSteps && (
            <div className="hidden md:flex items-center gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i + 1 < step
                        ? 'bg-emerald-500 text-white'
                        : i + 1 === step
                        ? 'bg-nepal-blue text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-nepal-dark'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-8 h-0.5 mx-1 transition-all duration-300 ${i + 1 < step ? 'bg-emerald-500' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 text-xs font-medium">Secure Session</span>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-white/60 text-xs">Credit Officer</div>
              <div className="text-white text-sm font-medium">Demo Mode</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
