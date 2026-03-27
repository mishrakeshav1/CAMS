import { Building2, FileText, Shield, Zap, BarChart3, MessageCircle, ChevronRight, Upload, CheckCircle } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #003893 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, #DC143C 0%, transparent 50%)`
          }} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-5 bg-blue-500"
              style={{
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-nepal-blue/20 border border-nepal-blue/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-nepal-gold rounded-full animate-pulse" />
            <span className="text-blue-300 text-sm font-medium">Nepal Bank Limited — Internal System</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 leading-tight">
            Credit Analysis &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Memo System
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            CAMS — AI-powered credit memo generation for Nepal Bank's loan processing workflow.
            NRB-compliant, comprehensive, and instant.
          </p>

          {/* CTA */}
          <button
            onClick={onStart}
            className="btn-primary text-xl px-10 py-5 inline-flex items-center gap-3 shadow-2xl shadow-blue-500/30"
          >
            <FileText className="w-6 h-6" />
            Start New Application
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-white/30 text-sm mt-4">Demo Version — No real data is processed</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* How it works */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">How CAMS Works</h2>
          <p className="text-white/50">From application to credit memo in minutes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-16">
          {[
            { icon: FileText, title: 'Enter Details', desc: 'Fill borrower information, loan product, and collateral details', step: '01' },
            { icon: Upload, title: 'Upload Documents', desc: 'Upload all required KYC, collateral, and income documents', step: '02' },
            { icon: BarChart3, title: 'AI Analysis', desc: 'CAMS computes DSCR, LTV, FOIR, and risk ratings automatically', step: '03' },
            { icon: CheckCircle, title: 'Get Credit Memo', desc: 'Receive a comprehensive, NRB-compliant credit analysis memo', step: '04' },
          ].map((item, i) => (
            <div key={i} className="glass-card-solid p-5 relative overflow-hidden">
              <div className="absolute top-3 right-3 text-white/5 text-5xl font-black">{item.step}</div>
              <div className="w-10 h-10 rounded-xl bg-nepal-blue/30 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              {i < 3 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-5 h-5 text-white/20" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Building2,
              color: 'blue',
              title: '10 Branch Support',
              desc: 'Coverage across Kathmandu, Pokhara, Birgunj, Biratnagar, Butwal, and more Nepal districts'
            },
            {
              icon: BarChart3,
              color: 'emerald',
              title: 'Auto Financial Analysis',
              desc: 'Automatic computation of DSCR, LTV, FOIR, and risk ratings per NRB guidelines'
            },
            {
              icon: Upload,
              color: 'amber',
              title: 'Multi-Format Upload',
              desc: 'Supports PDF, JPEG, PNG, Excel (XLSX/XLS) document uploads with drag & drop'
            },
            {
              icon: Shield,
              color: 'purple',
              title: 'NRB Compliant',
              desc: 'Aligned with Nepal Rastra Bank Unified Directives 2080 and sector limits'
            },
            {
              icon: MessageCircle,
              color: 'pink',
              title: 'Credit AI Assistant',
              desc: 'Built-in chat assistant to answer questions about documents, DSCR, LTV, and regulations'
            },
            {
              icon: Zap,
              color: 'orange',
              title: '4 Loan Products',
              desc: 'Home Loan, Overdraft, Loan Against Property, and Business Loan processing'
            },
          ].map((feature, i) => {
            const colorMap: Record<string, string> = {
              blue: 'text-blue-400 bg-blue-500/10',
              emerald: 'text-emerald-400 bg-emerald-500/10',
              amber: 'text-amber-400 bg-amber-500/10',
              purple: 'text-purple-400 bg-purple-500/10',
              pink: 'text-pink-400 bg-pink-500/10',
              orange: 'text-orange-400 bg-orange-500/10',
            };
            return (
              <div key={i} className="glass-card p-5 hover:bg-white/8 transition-all group">
                <div className={`w-10 h-10 rounded-xl ${colorMap[feature.color]} flex items-center justify-center mb-3`}>
                  <feature.icon className={`w-5 h-5 ${colorMap[feature.color].split(' ')[0]}`} />
                </div>
                <h3 className="text-white font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Document types */}
        <div className="mt-12 glass-card-solid p-6">
          <h3 className="text-white font-bold text-lg mb-4">Document Categories Supported</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🪪', title: 'Identification', items: ['Citizenship Certificate', 'Photographs', 'Family Details', 'PAN Card'] },
              { icon: '🏛️', title: 'Collateral', items: ['Lalpurja', 'Trace Map', 'Char Killa', 'Malpot Receipt'] },
              { icon: '💰', title: 'Income', items: ['Salary Certificate', 'Bank Statement', 'Audited Financials', 'TDS Receipt'] },
              { icon: '📋', title: 'Other', items: ['Baina Paper', 'Loan Application', 'Valuation Report', 'MOA/AOA'] },
            ].map((cat, i) => (
              <div key={i} className="bg-white/3 rounded-xl p-4">
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="text-white font-medium text-sm mb-2">{cat.title}</div>
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500/60 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button onClick={onStart} className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            Get Started
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
