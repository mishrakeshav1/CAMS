import { useState } from 'react';
import { ChevronRight, User, Building, Hash, DollarSign, Briefcase, UserCheck, Info, Wand2 } from 'lucide-react';
import { BRANCHES, LOAN_PRODUCTS } from '../data/branches';
import { DEMO_APPLICANTS } from '../data/demoData';
import type { LoanApplication } from '../utils/memoGenerator';

interface Props {
  onSubmit: (data: LoanApplication) => void;
}

export default function BasicInfoForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Partial<LoanApplication>>({
    loanProduct: '',
    branchId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDemo, setShowDemo] = useState(false);

  const set = (field: keyof LoanApplication, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.borrowerName?.trim()) e.borrowerName = 'Borrower name is required';
    if (!form.guarantorName?.trim()) e.guarantorName = 'Guarantor name is required';
    if (!form.branchId) e.branchId = 'Select a branch';
    if (!form.loanApplicationId?.trim()) e.loanApplicationId = 'Application ID is required';
    if (!form.loanAmount || form.loanAmount <= 0) e.loanAmount = 'Enter valid loan amount';
    if (!form.loanProduct) e.loanProduct = 'Select a loan product';
    if (!form.occupation?.trim()) e.occupation = 'Enter occupation';
    if (!form.employer?.trim()) e.employer = 'Enter employer/business name';
    if (!form.monthlyIncome || form.monthlyIncome <= 0) e.monthlyIncome = 'Enter monthly income';
    if (!form.propertyValue || form.propertyValue <= 0) e.propertyValue = 'Enter property value';
    if (!form.propertyLocation?.trim()) e.propertyLocation = 'Enter property location';
    if (!form.age || form.age < 18 || form.age > 70) e.age = 'Age must be between 18 and 70';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit({
      ...form as LoanApplication,
      creditScore: 700 + Math.floor(Math.random() * 120),
      tenure: 120,
    });
  };

  const loadDemo = (idx: number) => {
    const d = DEMO_APPLICANTS[idx];
    setForm({
      borrowerName: d.borrowerName,
      guarantorName: d.guarantorName,
      branchId: d.branchId,
      loanApplicationId: d.loanApplicationId,
      loanAmount: d.loanAmount,
      loanProduct: d.loanProduct,
      occupation: d.occupation,
      employer: d.employer,
      monthlyIncome: d.monthlyIncome,
      creditScore: d.creditScore,
      propertyValue: d.propertyValue,
      propertyLocation: d.propertyLocation,
      age: d.age,
      tenure: 120,
    });
    setErrors({});
    setShowDemo(false);
  };

  const selectedProduct = LOAN_PRODUCTS.find(p => p.id === form.loanProduct);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">New Loan Application</h1>
        <p className="text-blue-300">Fill in the borrower's basic details before uploading documents</p>
      </div>

      {/* Demo Loader */}
      <div className="mb-6">
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="flex items-center gap-2 bg-nepal-gold/10 hover:bg-nepal-gold/20 border border-nepal-gold/30 rounded-xl px-4 py-2.5 text-nepal-gold text-sm font-medium transition-all w-full sm:w-auto"
        >
          <Wand2 className="w-4 h-4" />
          Load Demo Application
          <ChevronRight className={`w-4 h-4 transition-transform ${showDemo ? 'rotate-90' : ''}`} />
        </button>
        {showDemo && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in-up">
            {DEMO_APPLICANTS.map((d, i) => (
              <button
                key={i}
                onClick={() => loadDemo(i)}
                className="glass-card-solid p-3 text-left hover:border-blue-500/50 transition-all"
              >
                <div className="font-medium text-white text-sm">{d.borrowerName}</div>
                <div className="text-blue-300 text-xs mt-0.5">{LOAN_PRODUCTS.find(p => p.id === d.loanProduct)?.name}</div>
                <div className="text-white/40 text-xs">NPR {(d.loanAmount / 100000).toFixed(1)}L</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-5">
          <div className="glass-card-solid p-5">
            <h3 className="section-title mb-4">
              <User className="w-4 h-4 text-blue-400" />
              Borrower Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Full Name of Borrower *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Rajesh Kumar Sharma"
                  value={form.borrowerName || ''}
                  onChange={e => set('borrowerName', e.target.value)}
                />
                {errors.borrowerName && <p className="text-red-400 text-xs mt-1">{errors.borrowerName}</p>}
              </div>
              <div>
                <label className="label">Full Name of Guarantor *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Sita Devi Sharma"
                  value={form.guarantorName || ''}
                  onChange={e => set('guarantorName', e.target.value)}
                />
                {errors.guarantorName && <p className="text-red-400 text-xs mt-1">{errors.guarantorName}</p>}
              </div>
              <div>
                <label className="label">Age of Borrower *</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 38"
                  min={18} max={70}
                  value={form.age || ''}
                  onChange={e => set('age', parseInt(e.target.value))}
                />
                {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
              </div>
              <div>
                <label className="label">Occupation *</label>
                <select
                  className="select-field"
                  value={form.occupation || ''}
                  onChange={e => set('occupation', e.target.value)}
                >
                  <option value="">— Select Occupation —</option>
                  <option value="Salaried">Salaried Employee</option>
                  <option value="Self-Employed">Self-Employed Professional</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Pensioner">Pensioner / Retired</option>
                  <option value="NRN">Non-Resident Nepali (NRN)</option>
                </select>
                {errors.occupation && <p className="text-red-400 text-xs mt-1">{errors.occupation}</p>}
              </div>
              <div>
                <label className="label">Employer / Business Name *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Nepal Telecom / ABC Traders"
                  value={form.employer || ''}
                  onChange={e => set('employer', e.target.value)}
                />
                {errors.employer && <p className="text-red-400 text-xs mt-1">{errors.employer}</p>}
              </div>
              <div>
                <label className="label">Monthly Gross Income (NPR) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">NPR</span>
                  <input
                    type="number"
                    className="input-field pl-14"
                    placeholder="e.g. 150000"
                    value={form.monthlyIncome || ''}
                    onChange={e => set('monthlyIncome', parseInt(e.target.value))}
                  />
                </div>
                {errors.monthlyIncome && <p className="text-red-400 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          <div className="glass-card-solid p-5">
            <h3 className="section-title mb-4">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Loan Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Branch *</label>
                <select
                  className="select-field"
                  value={form.branchId || ''}
                  onChange={e => set('branchId', e.target.value)}
                >
                  <option value="">— Select Branch —</option>
                  {BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.district})</option>
                  ))}
                </select>
                {errors.branchId && <p className="text-red-400 text-xs mt-1">{errors.branchId}</p>}
              </div>
              <div>
                <label className="label">Loan Application ID *</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    className="input-field pl-10"
                    placeholder="e.g. HBL-2024-KTM-00891"
                    value={form.loanApplicationId || ''}
                    onChange={e => set('loanApplicationId', e.target.value)}
                  />
                </div>
                {errors.loanApplicationId && <p className="text-red-400 text-xs mt-1">{errors.loanApplicationId}</p>}
              </div>
              <div>
                <label className="label">Loan Product *</label>
                <div className="grid grid-cols-2 gap-2">
                  {LOAN_PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => set('loanProduct', p.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        form.loanProduct === p.id
                          ? 'bg-nepal-blue/30 border-blue-400 text-white'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <div className="text-lg mb-1">{p.icon}</div>
                      <div className="text-sm font-medium leading-tight">{p.name}</div>
                      <div className="text-xs opacity-60 mt-0.5">{p.interestRate}% p.a.</div>
                    </button>
                  ))}
                </div>
                {errors.loanProduct && <p className="text-red-400 text-xs mt-1">{errors.loanProduct}</p>}
              </div>
              <div>
                <label className="label">
                  Loan Amount (NPR) *
                  {selectedProduct && (
                    <span className="ml-2 text-white/40">max {(selectedProduct.maxAmount / 10000000).toFixed(0)} Cr</span>
                  )}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="number"
                    className="input-field pl-10"
                    placeholder="e.g. 8500000"
                    value={form.loanAmount || ''}
                    onChange={e => set('loanAmount', parseInt(e.target.value))}
                  />
                </div>
                {errors.loanAmount && <p className="text-red-400 text-xs mt-1">{errors.loanAmount}</p>}
              </div>
            </div>
          </div>

          <div className="glass-card-solid p-5">
            <h3 className="section-title mb-4">
              <Building className="w-4 h-4 text-blue-400" />
              Collateral / Property
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Property Market Value (NPR) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">NPR</span>
                  <input
                    type="number"
                    className="input-field pl-14"
                    placeholder="e.g. 12000000"
                    value={form.propertyValue || ''}
                    onChange={e => set('propertyValue', parseInt(e.target.value))}
                  />
                </div>
                {errors.propertyValue && <p className="text-red-400 text-xs mt-1">{errors.propertyValue}</p>}
              </div>
              <div>
                <label className="label">Property Location *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Baneshwor-10, Kathmandu"
                  value={form.propertyLocation || ''}
                  onChange={e => set('propertyLocation', e.target.value)}
                />
                {errors.propertyLocation && <p className="text-red-400 text-xs mt-1">{errors.propertyLocation}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      {form.loanAmount && form.propertyValue && (
        <div className="mt-5 glass-card p-4 flex items-start gap-3 border-blue-500/20 animate-fade-in-up">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="text-blue-300 font-medium">Quick LTV Preview: </span>
            <span className="text-white">
              {((form.loanAmount / form.propertyValue) * 100).toFixed(1)}%
              {(form.loanAmount / form.propertyValue) <= 0.70
                ? ' — Within acceptable limits ✅'
                : ' — Exceeds 70% ceiling ⚠️ (reduce loan amount or increase collateral)'}
            </span>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
          Proceed to Document Upload
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
