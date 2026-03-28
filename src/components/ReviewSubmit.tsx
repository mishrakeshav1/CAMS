import { useState } from 'react';
import {
  ClipboardCheck, ChevronRight, User, Fingerprint, MapPin,
  Briefcase, CreditCard, Pencil, Loader2, CheckCircle2
} from 'lucide-react';
import type { ApplicationData, Step } from '../types';
import { provinces, districts, municipalities } from '../data/nepal';

interface Props {
  data: ApplicationData;
  onEdit: (step: Step) => void;
  onSubmit: () => void;
}

function SectionCard({
  icon: Icon,
  title,
  step,
  onEdit,
  children,
  color,
}: {
  icon: typeof User;
  title: string;
  step: Step;
  onEdit: (step: Step) => void;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className="form-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-gray-900">{title}</h2>
        </div>
        <button
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
    </div>
  );
}

export default function ReviewSubmit({ data, onEdit, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { personal, identity, address, employment, card } = data;

  const getProvinceName = (id: string) => provinces.find(p => p.id === id)?.name || id;
  const getDistrictName = (id: string) => districts.find(d => d.id === id)?.name || id;
  const getMunicipalityName = (id: string) => municipalities.find(m => m.id === id)?.name || id;

  const formatAddress = (prefix: 'permanent' | 'current') => {
    const prov = address[`${prefix}Province`];
    const dist = address[`${prefix}District`];
    const muni = address[`${prefix}Municipality`];
    const ward = address[`${prefix}Ward`];
    const tole = address[`${prefix}Tole`];

    const parts = [];
    if (tole) parts.push(tole);
    parts.push(`Ward ${ward}`);
    if (muni) parts.push(getMunicipalityName(muni));
    if (dist) parts.push(getDistrictName(dist));
    if (prov) parts.push(getProvinceName(prov));

    return parts.join(', ');
  };

  const cardNames: Record<string, string> = {
    classic: 'THULIMA Classic',
    gold: 'THULIMA Gold',
    platinum: 'THULIMA Platinum',
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Section Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
            <ClipboardCheck className="w-7 h-7 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Review Your Application</h1>
          <p className="text-gray-500 mt-1">Please verify all details before submitting</p>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {/* Personal Details */}
          <SectionCard icon={User} title="Personal Details" step="personal" onEdit={onEdit} color="bg-brand-100 text-brand-600">
            <InfoRow label="Full Name" value={personal.fullNameEnglish} />
            {personal.fullNameNepali && <InfoRow label="Name (Nepali)" value={personal.fullNameNepali} />}
            <InfoRow label="Date of Birth" value={personal.dateOfBirth} />
            <InfoRow label="Gender" value={personal.gender ? personal.gender.charAt(0).toUpperCase() + personal.gender.slice(1) : ''} />
            <InfoRow label="Marital Status" value={personal.maritalStatus ? personal.maritalStatus.charAt(0).toUpperCase() + personal.maritalStatus.slice(1) : ''} />
            <InfoRow label="Father's Name" value={personal.fatherName} />
            <InfoRow label="Grandfather's Name" value={personal.grandfatherName} />
            {personal.motherName && <InfoRow label="Mother's Name" value={personal.motherName} />}
            {personal.spouseName && <InfoRow label="Spouse's Name" value={personal.spouseName} />}
            <InfoRow label="Mobile" value={`+977 ${personal.mobileNumber}`} />
            <InfoRow label="Email" value={personal.email} />
          </SectionCard>

          {/* Identity */}
          <SectionCard icon={Fingerprint} title="Identity Details" step="identity" onEdit={onEdit} color="bg-purple-100 text-purple-600">
            <InfoRow label="Citizenship No." value={identity.citizenshipNumber} />
            <InfoRow label="Issued Date" value={identity.citizenshipIssuedDate} />
            <InfoRow label="Issued District" value={identity.citizenshipIssuedDistrict} />
            {identity.panNumber && <InfoRow label="PAN Number" value={identity.panNumber} />}
            <InfoRow label="Photo" value={identity.photoFile ? 'Uploaded' : 'Not uploaded'} />
            <InfoRow label="Citizenship (Front)" value={identity.citizenshipFrontFile ? 'Uploaded' : 'Not uploaded'} />
            <InfoRow label="Citizenship (Back)" value={identity.citizenshipBackFile ? 'Uploaded' : 'Not uploaded'} />
          </SectionCard>

          {/* Address */}
          <SectionCard icon={MapPin} title="Address Details" step="address" onEdit={onEdit} color="bg-emerald-100 text-emerald-600">
            <InfoRow label="Permanent Address" value={formatAddress('permanent')} />
            <InfoRow
              label="Current Address"
              value={address.sameAsPermanent ? 'Same as permanent' : formatAddress('current')}
            />
          </SectionCard>

          {/* Employment */}
          <SectionCard icon={Briefcase} title="Employment" step="employment" onEdit={onEdit} color="bg-amber-100 text-amber-600">
            <InfoRow label="Employment Type" value={employment.employmentType ? employment.employmentType.charAt(0).toUpperCase() + employment.employmentType.slice(1).replace('-', ' ') : ''} />
            <InfoRow label="Employer" value={employment.employerName} />
            <InfoRow label="Designation" value={employment.designation} />
            {employment.employerAddress && <InfoRow label="Employer Address" value={employment.employerAddress} />}
            <InfoRow label="Years of Service" value={employment.yearsOfService.replace('-', ' to ') + (employment.yearsOfService === '5+' ? '' : ' years')} />
            <InfoRow label="Monthly Salary" value={`NPR ${Number(employment.monthlySalary).toLocaleString('en-NP')}`} />
            {employment.otherIncome && Number(employment.otherIncome) > 0 && (
              <InfoRow label="Other Income" value={`NPR ${Number(employment.otherIncome).toLocaleString('en-NP')}`} />
            )}
            <InfoRow label="Salary Slip" value={employment.salarySlipFile ? 'Uploaded' : 'Not uploaded'} />
            <InfoRow label="Bank Statement" value={employment.bankStatementFile ? 'Uploaded' : 'Not uploaded'} />
          </SectionCard>

          {/* Card Selection */}
          <SectionCard icon={CreditCard} title="Card Selected" step="card" onEdit={onEdit} color="bg-pink-100 text-pink-600">
            <div className="flex items-center gap-3 py-2">
              <div className={`w-16 h-10 rounded-lg ${
                card.selectedCard === 'classic' ? 'bg-gradient-card' :
                card.selectedCard === 'gold' ? 'bg-gradient-card-gold' :
                'bg-gradient-card-coral'
              }`} />
              <div>
                <p className="font-bold text-gray-900">{cardNames[card.selectedCard] || card.selectedCard}</p>
                <p className="text-xs text-gray-500">First year annual fee waived</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Declaration */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800 text-xs leading-relaxed">
              <strong>Declaration:</strong> I hereby declare that all the information provided is true and correct to the
              best of my knowledge. I authorize THULIMA Bank to verify this information as per NRB KYC/AML
              guidelines and understand that any false information may lead to rejection of my application.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <p className="text-gray-400 text-xs text-center mt-3">
            By submitting, you agree to THULIMA Bank's credit card terms.
          </p>
        </div>
      </div>
    </div>
  );
}
