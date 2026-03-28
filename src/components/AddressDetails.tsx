import { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Copy } from 'lucide-react';
import type { AddressDetails as AddressDetailsType } from '../types';
import { provinces, getDistrictsByProvince, getMunicipalitiesByDistrict } from '../data/nepal';

interface Props {
  data: AddressDetailsType;
  onNext: (data: AddressDetailsType) => void;
}

function AddressBlock({
  prefix,
  form,
  update,
  errors,
}: {
  prefix: 'permanent' | 'current';
  form: AddressDetailsType;
  update: (field: keyof AddressDetailsType, value: string | boolean) => void;
  errors: Partial<Record<string, string>>;
}) {
  const provinceKey = `${prefix}Province` as keyof AddressDetailsType;
  const districtKey = `${prefix}District` as keyof AddressDetailsType;
  const municipalityKey = `${prefix}Municipality` as keyof AddressDetailsType;
  const wardKey = `${prefix}Ward` as keyof AddressDetailsType;
  const toleKey = `${prefix}Tole` as keyof AddressDetailsType;

  const selectedProvince = form[provinceKey] as string;
  const selectedDistrict = form[districtKey] as string;
  const filteredDistricts = selectedProvince ? getDistrictsByProvince(selectedProvince) : [];
  const filteredMunicipalities = selectedDistrict ? getMunicipalitiesByDistrict(selectedDistrict) : [];

  return (
    <div className="space-y-3">
      {/* Province */}
      <div>
        <label className="label">Province *</label>
        <select
          className={`select-field ${errors[provinceKey] ? 'input-error' : ''}`}
          value={form[provinceKey] as string}
          onChange={e => {
            update(provinceKey, e.target.value);
            update(districtKey, '');
            update(municipalityKey, '');
          }}
        >
          <option value="">Select Province</option>
          {provinces.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors[provinceKey] && <p className="text-red-500 text-xs mt-1">{errors[provinceKey]}</p>}
      </div>

      {/* District */}
      <div>
        <label className="label">District *</label>
        <select
          className={`select-field ${errors[districtKey] ? 'input-error' : ''}`}
          value={form[districtKey] as string}
          onChange={e => {
            update(districtKey, e.target.value);
            update(municipalityKey, '');
          }}
          disabled={!selectedProvince}
        >
          <option value="">Select District</option>
          {filteredDistricts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        {errors[districtKey] && <p className="text-red-500 text-xs mt-1">{errors[districtKey]}</p>}
      </div>

      {/* Municipality */}
      <div>
        <label className="label">Municipality / Rural Municipality *</label>
        <select
          className={`select-field ${errors[municipalityKey] ? 'input-error' : ''}`}
          value={form[municipalityKey] as string}
          onChange={e => update(municipalityKey, e.target.value)}
          disabled={!selectedDistrict}
        >
          <option value="">Select Municipality</option>
          {filteredMunicipalities.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
        {errors[municipalityKey] && <p className="text-red-500 text-xs mt-1">{errors[municipalityKey]}</p>}
      </div>

      {/* Ward & Tole */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Ward No. *</label>
          <input
            type="number"
            className={`input-field ${errors[wardKey] ? 'input-error' : ''}`}
            placeholder="e.g., 5"
            value={form[wardKey] as string}
            onChange={e => update(wardKey, e.target.value)}
            min="1"
            max="33"
          />
          {errors[wardKey] && <p className="text-red-500 text-xs mt-1">{errors[wardKey]}</p>}
        </div>
        <div>
          <label className="label">Tole / Street</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., Thamel"
            value={form[toleKey] as string}
            onChange={e => update(toleKey, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default function AddressDetails({ data, onNext }: Props) {
  const [form, setForm] = useState<AddressDetailsType>(data);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const update = (field: keyof AddressDetailsType, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Copy permanent to current when checkbox is checked
  useEffect(() => {
    if (form.sameAsPermanent) {
      setForm(prev => ({
        ...prev,
        currentProvince: prev.permanentProvince,
        currentDistrict: prev.permanentDistrict,
        currentMunicipality: prev.permanentMunicipality,
        currentWard: prev.permanentWard,
        currentTole: prev.permanentTole,
      }));
    }
  }, [form.sameAsPermanent, form.permanentProvince, form.permanentDistrict, form.permanentMunicipality, form.permanentWard, form.permanentTole]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    // Permanent address
    if (!form.permanentProvince) e.permanentProvince = 'Required';
    if (!form.permanentDistrict) e.permanentDistrict = 'Required';
    if (!form.permanentMunicipality) e.permanentMunicipality = 'Required';
    if (!form.permanentWard) e.permanentWard = 'Required';

    // Current address (if different)
    if (!form.sameAsPermanent) {
      if (!form.currentProvince) e.currentProvince = 'Required';
      if (!form.currentDistrict) e.currentDistrict = 'Required';
      if (!form.currentMunicipality) e.currentMunicipality = 'Required';
      if (!form.currentWard) e.currentWard = 'Required';
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
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
            <MapPin className="w-7 h-7 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Address Details</h1>
          <p className="text-gray-500 mt-1">Your permanent and current address in Nepal</p>
        </div>

        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {/* Permanent Address */}
          <div className="form-card">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center text-xs font-bold">P</span>
              Permanent Address
            </h2>
            <AddressBlock prefix="permanent" form={form} update={update} errors={errors} />
          </div>

          {/* Same as Permanent Toggle */}
          <label className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={form.sameAsPermanent}
                onChange={e => update('sameAsPermanent', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-brand-500 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform" />
            </div>
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Current address same as permanent</span>
            </div>
          </label>

          {/* Current Address */}
          {!form.sameAsPermanent && (
            <div className="form-card animate-fade-in-up">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-xs font-bold">C</span>
                Current Address
              </h2>
              <AddressBlock prefix="current" form={form} update={update} errors={errors} />
            </div>
          )}
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
