import { useState } from 'react';
import { Briefcase, ChevronRight, IndianRupee, Upload, FileText, X } from 'lucide-react';
import type { EmploymentDetails as EmploymentDetailsType } from '../types';

interface Props {
  data: EmploymentDetailsType;
  onNext: (data: EmploymentDetailsType) => void;
}

export default function EmploymentDetails({ data, onNext }: Props) {
  const [form, setForm] = useState<EmploymentDetailsType>(data);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const update = (field: keyof EmploymentDetailsType, value: string | File | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const formatCurrency = (val: string) => {
    const num = val.replace(/\D/g, '');
    return num ? Number(num).toLocaleString('en-NP') : '';
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.employmentType) e.employmentType = 'Employment type is required';
    if (!form.employerName.trim()) e.employerName = 'Employer name is required';
    if (!form.designation.trim()) e.designation = 'Designation is required';
    if (!form.yearsOfService.trim()) e.yearsOfService = 'Years of service is required';
    if (!form.monthlySalary.trim()) {
      e.monthlySalary = 'Monthly salary is required';
    } else {
      const salary = Number(form.monthlySalary.replace(/\D/g, ''));
      if (salary < 25000) e.monthlySalary = 'Minimum NPR 25,000 required';
    }
    if (!form.salarySlipFile) e.salarySlipFile = 'Latest salary slip is required';
    if (!form.bankStatementFile) e.bankStatementFile = '3-month bank statement is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext(form);
  };

  const FileUpload = ({
    label,
    file,
    field,
    desc,
  }: {
    label: string;
    file: File | null;
    field: keyof EmploymentDetailsType;
    desc: string;
  }) => {
    if (file && file instanceof File) {
      return (
        <div className="border-2 border-brand-200 bg-brand-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-brand-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button onClick={() => update(field, null)} className="p-1 hover:bg-brand-100 rounded-lg">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      );
    }
    return (
      <label className="border-2 border-dashed border-gray-200 hover:border-brand-400 rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-white hover:bg-brand-50/50">
        <Upload className="w-6 h-6 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-400">{desc}</span>
        <input
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) update(field, f);
          }}
        />
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Section Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase className="w-7 h-7 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Employment & Income</h1>
          <p className="text-gray-500 mt-1">Your employment and salary details</p>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {/* Employment Type */}
          <div>
            <label className="label">Employment Type *</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'private', label: 'Private Sector' },
                { value: 'government', label: 'Government' },
                { value: 'semi-government', label: 'Semi-Government' },
                { value: 'ngo', label: 'NGO / INGO' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => update('employmentType', opt.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                    form.employmentType === opt.value
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
          </div>

          {/* Employer Name */}
          <div>
            <label className="label">Employer / Organization Name *</label>
            <input
              type="text"
              className={`input-field ${errors.employerName ? 'input-error' : ''}`}
              placeholder="e.g., Nepal Telecom"
              value={form.employerName}
              onChange={e => update('employerName', e.target.value)}
            />
            {errors.employerName && <p className="text-red-500 text-xs mt-1">{errors.employerName}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="label">Designation / Position *</label>
            <input
              type="text"
              className={`input-field ${errors.designation ? 'input-error' : ''}`}
              placeholder="e.g., Software Engineer"
              value={form.designation}
              onChange={e => update('designation', e.target.value)}
            />
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
          </div>

          {/* Employer Address */}
          <div>
            <label className="label">Employer Address</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Bhadrakali, Kathmandu"
              value={form.employerAddress}
              onChange={e => update('employerAddress', e.target.value)}
            />
          </div>

          {/* Years of Service */}
          <div>
            <label className="label">Years of Service *</label>
            <select
              className={`select-field ${errors.yearsOfService ? 'input-error' : ''}`}
              value={form.yearsOfService}
              onChange={e => update('yearsOfService', e.target.value)}
            >
              <option value="">Select</option>
              <option value="less-than-1">Less than 1 year</option>
              <option value="1-2">1-2 years</option>
              <option value="2-3">2-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
            {errors.yearsOfService && <p className="text-red-500 text-xs mt-1">{errors.yearsOfService}</p>}
          </div>

          {/* Income Section */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-gray-900">Income Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Monthly Salary (NPR) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">NPR</span>
                  <input
                    type="text"
                    className={`input-field pl-14 ${errors.monthlySalary ? 'input-error' : ''}`}
                    placeholder="e.g., 50,000"
                    value={formatCurrency(form.monthlySalary)}
                    onChange={e => update('monthlySalary', e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                {errors.monthlySalary && <p className="text-red-500 text-xs mt-1">{errors.monthlySalary}</p>}
              </div>

              <div>
                <label className="label">Other Monthly Income (NPR) <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">NPR</span>
                  <input
                    type="text"
                    className="input-field pl-14"
                    placeholder="e.g., 10,000"
                    value={formatCurrency(form.otherIncome)}
                    onChange={e => update('otherIncome', e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              {form.otherIncome && Number(form.otherIncome) > 0 && (
                <div>
                  <label className="label">Source of Other Income</label>
                  <select
                    className="select-field"
                    value={form.sourceOfOtherIncome}
                    onChange={e => update('sourceOfOtherIncome', e.target.value)}
                  >
                    <option value="">Select source</option>
                    <option value="rental">Rental Income</option>
                    <option value="freelance">Freelance / Consulting</option>
                    <option value="investment">Investment Returns</option>
                    <option value="family">Family Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Document Uploads */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-gray-900">Income Documents</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Latest Salary Slip / Certificate *</p>
                <FileUpload
                  label="Upload salary slip"
                  file={form.salarySlipFile}
                  field="salarySlipFile"
                  desc="PDF or Image (max 5MB)"
                />
                {errors.salarySlipFile && <p className="text-red-500 text-xs mt-1">{errors.salarySlipFile}</p>}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Bank Statement (Last 3 Months) *</p>
                <FileUpload
                  label="Upload bank statement"
                  file={form.bankStatementFile}
                  field="bankStatementFile"
                  desc="PDF or Image (max 5MB)"
                />
                {errors.bankStatementFile && <p className="text-red-500 text-xs mt-1">{errors.bankStatementFile}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Credit Limit Preview */}
        {form.monthlySalary && Number(form.monthlySalary) >= 25000 && (
          <div className="mt-6 bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl p-4 border border-brand-100 animate-scale-in">
            <p className="text-xs text-brand-600 font-semibold mb-1">Estimated Credit Limit</p>
            <p className="text-2xl font-bold text-brand-700">
              NPR {(Number(form.monthlySalary) * 2).toLocaleString('en-NP')} - {(Number(form.monthlySalary) * 3).toLocaleString('en-NP')}
            </p>
            <p className="text-xs text-gray-500 mt-1">Based on 2-3x monthly salary. Final limit subject to verification.</p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <button
            onClick={handleSubmit}
            className="btn-primary w-full flex items-center justify-center gap-2 group"
          >
            Continue
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
