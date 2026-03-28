import { useState } from 'react';
import { User, Phone, Mail, Users, ChevronRight } from 'lucide-react';
import type { PersonalDetails as PersonalDetailsType } from '../types';

interface Props {
  data: PersonalDetailsType;
  onNext: (data: PersonalDetailsType) => void;
}

export default function PersonalDetails({ data, onNext }: Props) {
  const [form, setForm] = useState<PersonalDetailsType>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalDetailsType, string>>>({});

  const update = (field: keyof PersonalDetailsType, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof PersonalDetailsType, string>> = {};

    if (!form.fullNameEnglish.trim()) e.fullNameEnglish = 'Full name is required';
    if (!form.dateOfBirth) {
      e.dateOfBirth = 'Date of birth is required';
    } else {
      const age = Math.floor((Date.now() - new Date(form.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 21 || age > 30) e.dateOfBirth = 'You must be between 21-30 years old';
    }
    if (!form.gender) e.gender = 'Please select gender';
    if (!form.maritalStatus) e.maritalStatus = 'Please select marital status';
    if (!form.fatherName.trim()) e.fatherName = "Father's name is required";
    if (!form.grandfatherName.trim()) e.grandfatherName = "Grandfather's name is required";
    if (!form.mobileNumber.trim()) {
      e.mobileNumber = 'Mobile number is required';
    } else if (!/^(97|98)\d{8}$/.test(form.mobileNumber.replace(/\s/g, ''))) {
      e.mobileNumber = 'Enter a valid Nepal mobile number';
    }
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address';
    }

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
          <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
            <User className="w-7 h-7 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Personal Details</h1>
          <p className="text-gray-500 mt-1">As per your citizenship certificate</p>
        </div>

        {/* Form */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {/* Full Name English */}
          <div>
            <label className="label">Full Name (English) *</label>
            <input
              type="text"
              className={`input-field ${errors.fullNameEnglish ? 'input-error' : ''}`}
              placeholder="e.g., Ram Bahadur Thapa"
              value={form.fullNameEnglish}
              onChange={e => update('fullNameEnglish', e.target.value)}
            />
            {errors.fullNameEnglish && <p className="text-red-500 text-xs mt-1">{errors.fullNameEnglish}</p>}
          </div>

          {/* Full Name Nepali */}
          <div>
            <label className="label">Full Name (Nepali)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., राम बहादुर थापा"
              value={form.fullNameNepali}
              onChange={e => update('fullNameNepali', e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label">Date of Birth *</label>
            <input
              type="date"
              className={`input-field ${errors.dateOfBirth ? 'input-error' : ''}`}
              value={form.dateOfBirth}
              onChange={e => update('dateOfBirth', e.target.value)}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 21)).toISOString().split('T')[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 30)).toISOString().split('T')[0]}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Gender & Marital Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Gender *</label>
              <select
                className={`select-field ${errors.gender ? 'input-error' : ''}`}
                value={form.gender}
                onChange={e => update('gender', e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
            <div>
              <label className="label">Marital Status *</label>
              <select
                className={`select-field ${errors.maritalStatus ? 'input-error' : ''}`}
                value={form.maritalStatus}
                onChange={e => update('maritalStatus', e.target.value)}
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
              {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
            </div>
          </div>

          {/* Nationality */}
          <div>
            <label className="label">Nationality</label>
            <input
              type="text"
              className="input-field bg-gray-50"
              value={form.nationality}
              readOnly
            />
          </div>

          {/* Family Details Section */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-gray-900">Family Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Father's Name *</label>
                <input
                  type="text"
                  className={`input-field ${errors.fatherName ? 'input-error' : ''}`}
                  placeholder="Father's full name"
                  value={form.fatherName}
                  onChange={e => update('fatherName', e.target.value)}
                />
                {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
              </div>

              <div>
                <label className="label">Mother's Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Mother's full name"
                  value={form.motherName}
                  onChange={e => update('motherName', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Grandfather's Name *</label>
                <input
                  type="text"
                  className={`input-field ${errors.grandfatherName ? 'input-error' : ''}`}
                  placeholder="Grandfather's full name"
                  value={form.grandfatherName}
                  onChange={e => update('grandfatherName', e.target.value)}
                />
                {errors.grandfatherName && <p className="text-red-500 text-xs mt-1">{errors.grandfatherName}</p>}
              </div>

              {form.maritalStatus === 'married' && (
                <div>
                  <label className="label">Spouse's Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Spouse's full name"
                    value={form.spouseName}
                    onChange={e => update('spouseName', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-gray-900">Contact Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Mobile Number *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">+977</span>
                  <input
                    type="tel"
                    className={`input-field pl-16 ${errors.mobileNumber ? 'input-error' : ''}`}
                    placeholder="98XXXXXXXX"
                    value={form.mobileNumber}
                    onChange={e => update('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>
                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
              </div>

              <div>
                <label className="label">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    className={`input-field pl-12 ${errors.email ? 'input-error' : ''}`}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
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
