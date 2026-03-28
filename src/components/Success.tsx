import { useEffect, useState } from 'react';
import { CheckCircle2, CreditCard, Clock, Phone, Mail, ArrowRight, Download, Share2 } from 'lucide-react';
import type { ApplicationData } from '../types';

interface Props {
  data: ApplicationData;
  onNewApplication: () => void;
}

function ConfettiPiece({ delay, left, color }: { delay: number; left: number; color: string }) {
  return (
    <div
      className="confetti-piece rounded-sm"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        backgroundColor: color,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
}

export default function Success({ data, onNewApplication }: Props) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const refNumber = `THU-CC-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const confettiColors = ['#4F46E5', '#EC4899', '#F59E0B', '#10B981', '#8B5CF6', '#F43F5E'];

  const cardNames: Record<string, string> = {
    classic: 'THULIMA Classic',
    gold: 'THULIMA Gold',
    platinum: 'THULIMA Platinum',
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={Math.random() * 2}
              left={Math.random() * 100}
              color={confettiColors[i % confettiColors.length]}
            />
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto px-4 pt-12 pb-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>

          {showContent && (
            <>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 animate-fade-in-up">
                Application Submitted!
              </h1>
              <p className="text-gray-500 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                You're one step closer to your {cardNames[data.card.selectedCard] || ''} card.
              </p>
            </>
          )}
        </div>

        {showContent && (
          <>
            {/* Reference Card */}
            <div className="form-card mb-4 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Application Reference</p>
                <p className="text-2xl font-bold text-brand-600 tracking-wider font-mono">{refNumber}</p>
                <p className="text-xs text-gray-400 mt-2">Save this number for tracking your application</p>
              </div>
            </div>

            {/* Card Preview */}
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className={`${
                data.card.selectedCard === 'classic' ? 'bg-gradient-card' :
                data.card.selectedCard === 'gold' ? 'bg-gradient-card-gold' :
                'bg-gradient-card-coral'
              } rounded-2xl p-6 shadow-xl aspect-[1.6/1] flex flex-col justify-between`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white/60 text-xs font-medium tracking-wider uppercase">THULIMA Bank</div>
                    <div className="text-white font-bold text-lg mt-1">
                      {cardNames[data.card.selectedCard] || ''}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-80" />
                </div>
                <div>
                  <div className="text-white/80 font-mono text-base tracking-[0.2em] mb-2">
                    &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; ****
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/40 text-[10px] uppercase">Card Holder</div>
                      <div className="text-white text-sm font-semibold">{data.personal.fullNameEnglish.toUpperCase()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/40 text-[10px] uppercase">Status</div>
                      <div className="text-yellow-300 text-sm font-semibold">Processing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="form-card mb-4 animate-fade-in-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-500" />
                What Happens Next?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Application Review',
                    desc: 'Our team will review your application within 24 hours.',
                    time: 'Within 24 hours',
                  },
                  {
                    step: '2',
                    title: 'Document Verification',
                    desc: 'Your KYC documents will be verified as per NRB norms.',
                    time: '1-2 business days',
                  },
                  {
                    step: '3',
                    title: 'Credit Assessment',
                    desc: 'We will assess your credit eligibility and set your limit.',
                    time: '2-3 business days',
                  },
                  {
                    step: '4',
                    title: 'Card Delivery',
                    desc: 'Your card will be delivered to your registered address.',
                    time: '5-7 business days',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      {i < 3 && <div className="w-px h-full bg-brand-100 my-1" />}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      <span className="inline-block mt-1 text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="form-card mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <h2 className="font-bold text-gray-900 mb-3">Need Help?</h2>
              <div className="space-y-3">
                <a href="tel:+977-1-XXXXXXX" className="flex items-center gap-3 text-gray-700 hover:text-brand-600 transition-colors">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Call us</p>
                    <p className="text-xs text-gray-400">+977-1-XXXXXXX (Sun-Fri, 10AM-5PM)</p>
                  </div>
                </a>
                <a href="mailto:cards@thulimabank.com.np" className="flex items-center gap-3 text-gray-700 hover:text-brand-600 transition-colors">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email us</p>
                    <p className="text-xs text-gray-400">cards@thulimabank.com.np</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
              <button
                onClick={onNewApplication}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                New Application
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-400 text-xs mt-8">
              THULIMA Bank Ltd. | Licensed by Nepal Rastra Bank
              <br />
              Member: Nepal Bankers' Association
            </p>
          </>
        )}
      </div>
    </div>
  );
}
