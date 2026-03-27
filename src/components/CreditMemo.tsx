import { useState } from 'react';
import {
  Printer, Download, CheckCircle, AlertTriangle, XCircle,
  TrendingUp, Shield, Building, User, FileText, BarChart3,
  ChevronDown, ChevronUp
} from 'lucide-react';
import type { CreditMemoData } from '../utils/memoGenerator';
import { formatNPR } from '../utils/memoGenerator';
import { BRANCHES, LOAN_PRODUCTS } from '../data/branches';

interface Props {
  memo: CreditMemoData;
  onNewApplication: () => void;
}

function Section({ title, icon, children, defaultOpen = true }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-card-solid overflow-hidden mb-4 print-area">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors no-print"
      >
        <div className="flex items-center gap-2 text-white font-semibold text-base">
          {icon}{title}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      <div className="hidden print:block px-5 pb-1 text-white font-semibold text-base border-b border-white/10 mb-3">
        {title}
      </div>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function KV({ label, value, highlight }: { label: string; value: string | React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-white/5 last:border-0">
      <span className="text-white/50 text-sm">{label}</span>
      <span className={`text-sm font-medium text-right max-w-[55%] ${highlight ? 'text-blue-300' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  const colors: Record<string, string> = {
    green: 'from-emerald-900/40 to-emerald-800/20 border-emerald-500/30',
    blue: 'from-blue-900/40 to-blue-800/20 border-blue-500/30',
    amber: 'from-amber-900/40 to-amber-800/20 border-amber-500/30',
    red: 'from-red-900/40 to-red-800/20 border-red-500/30',
    purple: 'from-purple-900/40 to-purple-800/20 border-purple-500/30',
  };
  const textColors: Record<string, string> = {
    green: 'text-emerald-300', blue: 'text-blue-300', amber: 'text-amber-300',
    red: 'text-red-300', purple: 'text-purple-300',
  };
  return (
    <div className={`rounded-xl border bg-gradient-to-br p-4 ${colors[color]}`}>
      <div className="text-white/50 text-xs mb-1">{label}</div>
      <div className={`text-2xl font-bold ${textColors[color]}`}>{value}</div>
      {sub && <div className="text-white/40 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export default function CreditMemo({ memo, onNewApplication }: Props) {
  const { application, financials, collateral, recommendation, conditions, riskRating } = memo;
  const branch = BRANCHES.find(b => b.id === application.branchId);
  const product = LOAN_PRODUCTS.find(p => p.id === application.loanProduct);
  const tenure = application.tenure || 120;
  const annualRate = product?.interestRate || 12;

  const recColor = recommendation === 'APPROVE' ? 'emerald' : recommendation === 'CONDITIONAL_APPROVE' ? 'amber' : 'red';
  const recIcon = recommendation === 'APPROVE' ? <CheckCircle className="w-5 h-5" /> : recommendation === 'CONDITIONAL_APPROVE' ? <AlertTriangle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />;
  const recLabel = recommendation === 'APPROVE' ? 'RECOMMEND FOR APPROVAL' : recommendation === 'CONDITIONAL_APPROVE' ? 'CONDITIONAL APPROVAL' : 'RECOMMEND FOR REJECTION';

  const printMemo = () => window.print();

  const downloadMemo = () => {
    const content = generateTextMemo(memo, branch?.name || '', product?.name || '');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CreditMemo_${memo.memoId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in-up">
      {/* Header Banner */}
      <div className="gradient-border mb-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium tracking-wider uppercase">Credit Analysis Memo</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{memo.memoId}</h1>
            <div className="text-white/50 text-sm mt-1">
              Generated: {memo.generatedAt.toLocaleString('en-NP')} · {branch?.name}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border ${
              recColor === 'emerald' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' :
              recColor === 'amber' ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' :
              'bg-red-500/20 border-red-500/40 text-red-300'
            }`}>
              {recIcon}
              {recLabel}
            </div>
            <div className="flex gap-2 no-print">
              <button onClick={downloadMemo} className="btn-secondary flex items-center gap-1.5 py-2 px-3 text-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button onClick={printMemo} className="btn-secondary flex items-center gap-1.5 py-2 px-3 text-sm">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Loan Amount"
          value={formatNPR(application.loanAmount)}
          sub={product?.name}
          color="blue"
        />
        <MetricCard
          label="DSCR"
          value={`${financials.dscr}x`}
          sub={financials.dscr >= 1.5 ? 'Strong ✓' : financials.dscr >= 1.25 ? 'Acceptable' : 'Weak ✗'}
          color={financials.dscr >= 1.5 ? 'green' : financials.dscr >= 1.25 ? 'amber' : 'red'}
        />
        <MetricCard
          label="LTV Ratio"
          value={`${financials.ltvRatio}%`}
          sub={financials.ltvRatio <= 70 ? 'Within Limit ✓' : 'Exceeds Limit ✗'}
          color={financials.ltvRatio <= 70 ? 'green' : 'red'}
        />
        <MetricCard
          label="Credit Score"
          value={String(application.creditScore)}
          sub={application.creditScore >= 750 ? 'Excellent' : application.creditScore >= 700 ? 'Good' : 'Fair'}
          color={application.creditScore >= 750 ? 'green' : application.creditScore >= 700 ? 'blue' : 'amber'}
        />
      </div>

      {/* Section 1: Executive Summary */}
      <Section title="1. Executive Summary" icon={<FileText className="w-4 h-4 text-blue-400" />}>
        <div className="bg-white/3 rounded-xl p-4 text-white/80 text-sm leading-relaxed">
          <p>
            This Credit Analysis Memo is prepared in connection with the loan application submitted by{' '}
            <strong className="text-white">{application.borrowerName}</strong> (Age: {application.age}) to{' '}
            <strong className="text-white">{branch?.name}</strong>, Nepal Bank Limited. The applicant
            has applied for a <strong className="text-white">{product?.name}</strong> amounting to{' '}
            <strong className="text-white">{formatNPR(application.loanAmount)}</strong> against collateral
            property located at <strong className="text-white">{application.propertyLocation}</strong>.
          </p>
          <p className="mt-3">
            The applicant is a <strong className="text-white">{application.occupation}</strong> employed/engaged
            with <strong className="text-white">{application.employer}</strong> with a gross monthly income
            of <strong className="text-white">{formatNPR(application.monthlyIncome)}</strong>. Post-appraisal,
            the Debt Service Coverage Ratio (DSCR) stands at{' '}
            <strong className={`${financials.dscr >= 1.5 ? 'text-emerald-400' : 'text-amber-400'}`}>{financials.dscr}x</strong>{' '}
            and the Loan-to-Value (LTV) ratio is{' '}
            <strong className={`${financials.ltvRatio <= 70 ? 'text-emerald-400' : 'text-red-400'}`}>{financials.ltvRatio}%</strong>.
          </p>
          <p className="mt-3">
            Based on comprehensive analysis of financial statements, collateral documents, and compliance
            with Nepal Rastra Bank (NRB) guidelines, the overall risk rating assigned is{' '}
            <strong className="text-white">{riskRating}</strong>. The credit committee is{' '}
            <strong className={recColor === 'emerald' ? 'text-emerald-400' : recColor === 'amber' ? 'text-amber-400' : 'text-red-400'}>
              {recLabel.toLowerCase()}
            </strong>{' '}
            subject to conditions outlined in Section 9.
          </p>
        </div>
      </Section>

      {/* Section 2: Borrower Profile */}
      <Section title="2. Borrower Profile" icon={<User className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">Personal Details</h4>
            <KV label="Full Name" value={application.borrowerName} highlight />
            <KV label="Age" value={`${application.age} years`} />
            <KV label="Occupation" value={application.occupation} />
            <KV label="Employer / Business" value={application.employer} />
            <KV label="Credit Score" value={
              <span className={application.creditScore >= 750 ? 'text-emerald-400' : application.creditScore >= 700 ? 'text-blue-300' : 'text-amber-400'}>
                {application.creditScore} ({application.creditScore >= 750 ? 'Excellent' : application.creditScore >= 700 ? 'Good' : 'Fair'})
              </span>
            } />
          </div>
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">Guarantor Details</h4>
            <KV label="Full Name" value={application.guarantorName} highlight />
            <KV label="Relationship" value="Co-Applicant / Spouse" />
            <KV label="Guarantor Type" value="Personal Guarantee" />
            <KV label="NRB CIB Check" value={<span className="text-emerald-400">Clear ✓</span>} />
            <KV label="Existing Liabilities" value="None Reported" />
          </div>
        </div>
      </Section>

      {/* Section 3: Loan Particulars */}
      <Section title="3. Loan Particulars" icon={<BarChart3 className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <KV label="Application ID" value={application.loanApplicationId} highlight />
            <KV label="Branch" value={`${branch?.name} (${branch?.code})`} />
            <KV label="Product" value={product?.name || 'N/A'} />
            <KV label="Loan Amount" value={formatNPR(application.loanAmount)} />
            <KV label="Tenure" value={`${tenure} months (${(tenure/12).toFixed(1)} years)`} />
            <KV label="Interest Rate" value={`${annualRate}% p.a. (Floating / Base Rate Linked)`} />
          </div>
          <div>
            <KV label="Monthly EMI" value={formatNPR(financials.emi)} />
            <KV label="Total Interest Payable" value={formatNPR((financials.emi * tenure) - application.loanAmount)} />
            <KV label="Total Repayment" value={formatNPR(financials.emi * tenure)} />
            <KV label="Processing Fee" value={`NPR ${Math.round(application.loanAmount * 0.005).toLocaleString('en-IN')} (0.5%)`} />
            <KV label="Disbursement Mode" value="Direct Transfer / Phased" />
            <KV label="Repayment Mode" value="ECS / Post-Dated Cheques" />
          </div>
        </div>
      </Section>

      {/* Section 4: Financial Analysis */}
      <Section title="4. Financial Analysis" icon={<TrendingUp className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">Income & Obligation Analysis</h4>
            <KV label="Gross Monthly Income" value={formatNPR(application.monthlyIncome)} />
            <KV label="Net Monthly Income (est.)" value={formatNPR(financials.netMonthlyIncome)} />
            <KV label="Existing EMI Obligations" value={formatNPR(financials.existingObligations)} />
            <KV label="Proposed EMI (this loan)" value={formatNPR(financials.proposedEMI)} />
            <KV label="Total Monthly Obligations" value={formatNPR(financials.totalObligations)} />
            <KV label="FOIR (Fixed Obligation Ratio)" value={
              <span className={financials.foir <= 50 ? 'text-emerald-400' : 'text-amber-400'}>
                {financials.foir}% {financials.foir <= 50 ? '✓' : '⚠️'}
              </span>
            } />
            <KV label="DSCR" value={
              <span className={financials.dscr >= 1.5 ? 'text-emerald-400' : financials.dscr >= 1.25 ? 'text-amber-400' : 'text-red-400'}>
                {financials.dscr}x {financials.dscr >= 1.5 ? '(Strong ✓)' : financials.dscr >= 1.25 ? '(Acceptable)' : '(Weak ✗)'}
              </span>
            } />
          </div>
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">Bank Statement Summary (6 Months)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white/40 border-b border-white/10">
                    <th className="text-left pb-2">Month</th>
                    <th className="text-right pb-2">Credit</th>
                    <th className="text-right pb-2">Debit</th>
                    <th className="text-right pb-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {financials.bankStatement.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-1.5 text-white/70">{row.month}</td>
                      <td className="py-1.5 text-emerald-400 text-right">{(row.credit/1000).toFixed(0)}K</td>
                      <td className="py-1.5 text-red-400 text-right">{(row.debit/1000).toFixed(0)}K</td>
                      <td className="py-1.5 text-white text-right font-medium">{(row.balance/1000).toFixed(0)}K</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-white/20">
                    <td className="pt-2 text-white/50 font-medium">Avg</td>
                    <td className="pt-2 text-emerald-400 text-right font-medium">
                      {(financials.bankStatement.reduce((a,r)=>a+r.credit,0)/6/1000).toFixed(0)}K
                    </td>
                    <td className="pt-2 text-red-400 text-right font-medium">
                      {(financials.bankStatement.reduce((a,r)=>a+r.debit,0)/6/1000).toFixed(0)}K
                    </td>
                    <td className="pt-2 text-white text-right font-medium">
                      {(financials.bankStatement.reduce((a,r)=>a+r.balance,0)/6/1000).toFixed(0)}K
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 5: Collateral Evaluation */}
      <Section title="5. Collateral Evaluation" icon={<Building className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <KV label="Property Type" value={collateral.type} />
            <KV label="Location" value={collateral.location} highlight />
            <KV label="Land Area" value={collateral.area} />
            <KV label="Market Value" value={formatNPR(collateral.marketValue)} />
            <KV label="Distress Value (75%)" value={formatNPR(collateral.distressValue)} />
            <KV label="Loanable Value (70%)" value={formatNPR(collateral.loanableValue)} />
          </div>
          <div>
            <KV label="LTV Ratio" value={
              <span className={financials.ltvRatio <= 70 ? 'text-emerald-400' : 'text-red-400'}>
                {financials.ltvRatio}% {financials.ltvRatio <= 70 ? '(Within limit ✓)' : '(Exceeds limit ✗)'}
              </span>
            } />
            <KV label="Valuation Date" value={collateral.valuationDate} />
            <KV label="Valued By" value={collateral.valuedBy} />
            <KV label="Title Status" value={<span className="text-emerald-400">Clear — No Encumbrance ✓</span>} />
            <KV label="Lalpurja Verified" value={<span className="text-emerald-400">Verified ✓</span>} />
            <KV label="Malpot Receipt" value={<span className="text-emerald-400">Updated FY 2080/81 ✓</span>} />
          </div>
        </div>

        <div className="mt-4 bg-white/3 rounded-xl p-4">
          <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Collateral Remarks</h4>
          <p className="text-white/70 text-sm leading-relaxed">
            The proposed collateral is a {collateral.type.toLowerCase()} situated at {collateral.location}.
            The property has been physically inspected and valued by an NRB-licensed valuer. All four boundaries
            (Char Killa) are consistent with the Lalpurja. The property is free from any legal encumbrance,
            mortgage, or litigation as per the certificate issued by the Land Revenue Office. The approved
            house map (Ghar Naaksa) is in conformity with the existing structure. Construction permit
            (Nirman Ijajat) has been obtained from the concerned municipality.
          </p>
        </div>
      </Section>

      {/* Section 6: NRB Compliance */}
      <Section title="6. NRB Regulatory Compliance" icon={<Shield className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <KV label="NRB Directive" value="Unified Directives 2080, Dir. No. 3" />
            <KV label="Single Borrower Limit" value={<span className="text-emerald-400">Within limit ✓</span>} />
            <KV label="Sector Concentration" value={<span className="text-emerald-400">Within 25% cap ✓</span>} />
            <KV label="KYC Verification" value={<span className="text-emerald-400">Completed ✓</span>} />
            <KV label="AMLCFT Screening" value={<span className="text-emerald-400">Cleared ✓</span>} />
          </div>
          <div>
            <KV label="CIB Report" value={<span className="text-emerald-400">Clean — No NPL ✓</span>} />
            <KV label="PAN Verification" value={<span className={application.loanAmount >= 2500000 ? 'text-emerald-400' : 'text-white/50'}>{application.loanAmount >= 2500000 ? 'Verified with DoR ✓' : 'Not Applicable'}</span>} />
            <KV label="Risk Weight" value="100% (Standard)" />
            <KV label="Loan Classification" value="Pass (Green)" />
            <KV label="Provisioning" value="1% (Pass Category)" />
          </div>
        </div>
      </Section>

      {/* Section 7: Risk Assessment */}
      <Section title="7. Risk Assessment" icon={<AlertTriangle className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Credit Risk', rating: financials.dscr >= 1.5 ? 'Low' : 'Medium', color: financials.dscr >= 1.5 ? 'green' : 'amber' },
            { label: 'Market Risk', rating: 'Low-Medium', color: 'amber' },
            { label: 'Operational Risk', rating: 'Low', color: 'green' },
            { label: 'Collateral Risk', rating: financials.ltvRatio <= 70 ? 'Low' : 'Medium', color: financials.ltvRatio <= 70 ? 'green' : 'amber' },
            { label: 'Regulatory Risk', rating: 'Low', color: 'green' },
            { label: 'Concentration Risk', rating: 'Low', color: 'green' },
          ].map((r, i) => (
            <div key={i} className={`p-3 rounded-xl border text-center ${
              r.color === 'green' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'
            }`}>
              <div className="text-white/60 text-xs mb-1">{r.label}</div>
              <div className={`font-bold text-sm ${r.color === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}>{r.rating}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 bg-white/3 rounded-xl p-4">
          <div className="text-white/50 text-sm">Overall Risk Rating:</div>
          <div className={`font-bold text-lg px-4 py-1 rounded-lg ${
            riskRating === 'LOW' || riskRating === 'LOW-MEDIUM' ? 'bg-emerald-500/20 text-emerald-400' :
            riskRating === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
          }`}>{riskRating}</div>
        </div>
      </Section>

      {/* Section 8: Document Verification */}
      <Section title="8. Document Verification Summary" icon={<FileText className="w-4 h-4 text-blue-400" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Citizenship Certificate — Applicant', 'Citizenship Certificate — Guarantor',
            'Lalpurja (Land Ownership)', 'Trace Map & Blueprint',
            'Char Killa (Four Boundaries)', 'Malpot Receipt (Updated)',
            'Approved House Map (Ghar Naaksa)', 'Construction Permit (Nirman Ijajat)',
            'Income Proof / Salary Certificate', 'Bank Statement (6 Months)',
            'PAN Card Verification', 'Loan Application Form (Signed)',
          ].map((doc, i) => (
            <div key={i} className="flex items-center gap-2 text-sm py-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-white/70">{doc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 9: Conditions & Recommendation */}
      <Section title="9. Conditions & Final Recommendation" icon={<CheckCircle className="w-4 h-4 text-blue-400" />}>
        <div className={`rounded-xl border p-4 mb-5 ${
          recColor === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30' :
          recColor === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
          'bg-red-500/10 border-red-500/30'
        }`}>
          <div className={`flex items-center gap-2 text-lg font-bold ${
            recColor === 'emerald' ? 'text-emerald-400' : recColor === 'amber' ? 'text-amber-400' : 'text-red-400'
          }`}>
            {recIcon}
            {recLabel}
          </div>
          <p className="text-white/70 text-sm mt-2">
            {recommendation === 'APPROVE'
              ? `The credit committee recommends approval of ${formatNPR(application.loanAmount)} to ${application.borrowerName} subject to the following conditions being fulfilled prior to disbursement.`
              : recommendation === 'CONDITIONAL_APPROVE'
              ? `The application may be considered for approval subject to satisfactory resolution of the following concerns and fulfillment of all stated conditions.`
              : `Based on the financial analysis, the DSCR and/or LTV ratio does not meet minimum criteria. The committee recommends rejection of this application in its current form.`
            }
          </p>
        </div>
        <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">Pre-Disbursement Conditions</h4>
        <div className="space-y-2">
          {conditions.map((cond, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
              </div>
              <span className="text-white/80 text-sm leading-relaxed">{cond}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 10: Signatures */}
      <div className="glass-card-solid p-5 mb-6">
        <h3 className="section-title mb-4">
          <User className="w-4 h-4 text-blue-400" />
          10. Authorization & Signatures
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { role: 'Prepared By', name: 'Credit Analyst', level: 'Level I' },
            { role: 'Reviewed By', name: 'Branch Manager', level: 'Level II' },
            { role: 'Approved By', name: 'Credit Committee', level: 'Level III' },
          ].map((sig, i) => (
            <div key={i} className="bg-white/3 rounded-xl p-4">
              <div className="h-12 border-b border-white/20 mb-2" />
              <div className="text-white text-sm font-medium">{sig.name}</div>
              <div className="text-white/40 text-xs">{sig.role}</div>
              <div className="text-white/30 text-xs">{sig.level} Authority</div>
              <div className="text-white/20 text-xs mt-1">Date: ___________</div>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs text-center mt-4">
          This document is system-generated by CAMS v1.0. Signatures required for official validity.
          Reference: {memo.memoId} | {memo.generatedAt.toISOString()}
        </p>
      </div>

      {/* New Application Button */}
      <div className="text-center no-print">
        <button onClick={onNewApplication} className="btn-primary px-8 py-3">
          + New Application
        </button>
      </div>
    </div>
  );
}

function generateTextMemo(memo: CreditMemoData, branchName: string, productName: string): string {
  const { application, financials, collateral } = memo;
  return `
NEPAL BANK LIMITED
CREDIT ANALYSIS MEMO SYSTEM (CAMS)
=====================================
Memo Reference : ${memo.memoId}
Date Generated : ${memo.generatedAt.toLocaleString()}
Branch         : ${branchName}
=====================================

1. LOAN PARTICULARS
   Application ID   : ${application.loanApplicationId}
   Product          : ${productName}
   Amount           : ${formatNPR(application.loanAmount)}
   Tenure           : ${application.tenure || 120} months

2. BORROWER DETAILS
   Name             : ${application.borrowerName}
   Guarantor        : ${application.guarantorName}
   Occupation       : ${application.occupation}
   Employer         : ${application.employer}
   Monthly Income   : ${formatNPR(application.monthlyIncome)}
   Credit Score     : ${application.creditScore}

3. FINANCIAL ANALYSIS
   Monthly EMI      : ${formatNPR(financials.emi)}
   DSCR             : ${financials.dscr}x
   FOIR             : ${financials.foir}%
   LTV Ratio        : ${financials.ltvRatio}%

4. COLLATERAL
   Type             : ${collateral.type}
   Location         : ${collateral.location}
   Market Value     : ${formatNPR(collateral.marketValue)}
   Distress Value   : ${formatNPR(collateral.distressValue)}
   Loanable Value   : ${formatNPR(collateral.loanableValue)}

5. RECOMMENDATION
   ${memo.recommendation}
   Risk Rating: ${memo.riskRating}

6. CONDITIONS
${memo.conditions.map((c, i) => `   ${i + 1}. ${c}`).join('\n')}

=====================================
This is a DEMO document — For demonstration purposes only.
Nepal Bank Limited — CAMS v1.0
`;
}
