import { useState, useCallback } from 'react';
import { Fingerprint, Upload, Camera, X, ChevronRight, FileText } from 'lucide-react';
import type { IdentityDetails } from '../types';
import { districts } from '../data/nepal';

interface Props {
  data: IdentityDetails;
  onNext: (data: IdentityDetails) => void;
}

function FileUploadBox({
  label,
  file,
  onUpload,
  onRemove,
  icon: Icon,
  accept = 'image/*',
}: {
  label: string;
  file: File | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  icon: typeof Camera;
  accept?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onUpload(f);
  };

  if (file) {
    return (
      <div className="border-2 border-brand-200 bg-brand-50 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-brand-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
        </div>
        <button onClick={onRemove} className="p-1 hover:bg-brand-100 rounded-lg">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <label className="border-2 border-dashed border-gray-200 hover:border-brand-400 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-white hover:bg-brand-50/50">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-xs text-gray-400">JPG, PNG or PDF (max 5MB)</span>
      <input type="file" className="hidden" accept={accept} onChange={handleChange} />
    </label>
  );
}

export default function IdentityVerification({ data, onNext }: Props) {
  const [form, setForm] = useState<IdentityDetails>(data);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const allDistricts = districts.map(d => d.name).sort();

  const update = (field: keyof IdentityDetails, value: string | File | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.citizenshipNumber.trim()) e.citizenshipNumber = 'Citizenship number is required';
    if (!form.citizenshipIssuedDate) e.citizenshipIssuedDate = 'Issue date is required';
    if (!form.citizenshipIssuedDistrict) e.citizenshipIssuedDistrict = 'Issue district is required';
    if (!form.photoFile) e.photoFile = 'Photo is required';
    if (!form.citizenshipFrontFile) e.citizenshipFrontFile = 'Front photo of citizenship is required';
    if (!form.citizenshipBackFile) e.citizenshipBackFile = 'Back photo of citizenship is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Section Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <Fingerprint className="w-7 h-7 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Identity Verification</h1>
          <p className="text-gray-500 mt-1">As required by Nepal Rastra Bank KYC norms</p>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {/* Citizenship Number */}
          <div>
            <label className="label">Citizenship Certificate Number *</label>
            <input
              type="text"
              className={`input-field ${errors.citizenshipNumber ? 'input-error' : ''}`}
              placeholder="e.g., 12-34-56-78901"
              value={form.citizenshipNumber}
              onChange={e => update('citizenshipNumber', e.target.value)}
            />
            {errors.citizenshipNumber && <p className="text-red-500 text-xs mt-1">{errors.citizenshipNumber}</p>}
          </div>

          {/* Issue Date & District */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Issued Date *</label>
              <input
                type="date"
                className={`input-field ${errors.citizenshipIssuedDate ? 'input-error' : ''}`}
                value={form.citizenshipIssuedDate}
                onChange={e => update('citizenshipIssuedDate', e.target.value)}
              />
              {errors.citizenshipIssuedDate && <p className="text-red-500 text-xs mt-1">{errors.citizenshipIssuedDate}</p>}
            </div>
            <div>
              <label className="label">Issued District *</label>
              <select
                className={`select-field ${errors.citizenshipIssuedDistrict ? 'input-error' : ''}`}
                value={form.citizenshipIssuedDistrict}
                onChange={e => update('citizenshipIssuedDistrict', e.target.value)}
              >
                <option value="">Select</option>
                {allDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.citizenshipIssuedDistrict && <p className="text-red-500 text-xs mt-1">{errors.citizenshipIssuedDistrict}</p>}
            </div>
          </div>

          {/* PAN Number (Optional) */}
          <div>
            <label className="label">PAN Number <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., 123456789"
              value={form.panNumber}
              onChange={e => update('panNumber', e.target.value)}
            />
            <p className="text-gray-400 text-xs mt-1">Required for credit limit above NPR 2,00,000</p>
          </div>

          {/* Document Uploads */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-gray-900">Upload Documents</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Recent Passport-Size Photo *</p>
                <FileUploadBox
                  label="Upload your photo"
                  file={form.photoFile}
                  onUpload={f => update('photoFile', f)}
                  onRemove={() => update('photoFile', null)}
                  icon={Camera}
                />
                {errors.photoFile && <p className="text-red-500 text-xs mt-1">{errors.photoFile}</p>}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Citizenship Certificate - Front *</p>
                <FileUploadBox
                  label="Upload front side"
                  file={form.citizenshipFrontFile}
                  onUpload={f => update('citizenshipFrontFile', f)}
                  onRemove={() => update('citizenshipFrontFile', null)}
                  icon={Upload}
                  accept="image/*,.pdf"
                />
                {errors.citizenshipFrontFile && <p className="text-red-500 text-xs mt-1">{errors.citizenshipFrontFile}</p>}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Citizenship Certificate - Back *</p>
                <FileUploadBox
                  label="Upload back side"
                  file={form.citizenshipBackFile}
                  onUpload={f => update('citizenshipBackFile', f)}
                  onRemove={() => update('citizenshipBackFile', null)}
                  icon={Upload}
                  accept="image/*,.pdf"
                />
                {errors.citizenshipBackFile && <p className="text-red-500 text-xs mt-1">{errors.citizenshipBackFile}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* NRB Notice */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>NRB KYC Requirement:</strong> As per Nepal Rastra Bank Directive No. 19, all financial institutions must collect citizenship details and a recent photograph for customer identification during account/card onboarding.
          </p>
        </div>

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
