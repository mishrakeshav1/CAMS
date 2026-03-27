export interface DocumentCategory {
  id: string;
  title: string;
  color: string;
  icon: string;
  documents: DocumentItem[];
}

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  loanTypes?: string[];
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    id: 'identification',
    title: 'Identification Documents',
    color: 'blue',
    icon: '🪪',
    documents: [
      {
        id: 'citizenship_cert',
        name: 'Citizenship Certificate',
        description: 'Copy of citizenship for applicant, spouse, and guarantor',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
      },
      {
        id: 'photographs',
        name: 'Recent Photographs',
        description: 'Passport-size photos of applicant(s) and guarantor',
        required: true,
        acceptedFormats: ['jpg', 'jpeg', 'png'],
      },
      {
        id: 'family_details',
        name: 'Family Details Form',
        description: 'Form with family details from local authority',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
      {
        id: 'pan_card',
        name: 'PAN Card',
        description: 'Required for loans of NPR 25 lakh and above',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
      },
    ]
  },
  {
    id: 'collateral',
    title: 'Collateral Related Documents',
    color: 'emerald',
    icon: '🏛️',
    documents: [
      {
        id: 'lalpurja',
        name: 'Land Ownership Certificate (Lalpurja)',
        description: 'Copy of the land ownership document',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan', 'lap'],
      },
      {
        id: 'trace_map',
        name: 'Trace Map & Blue Print',
        description: 'Latest certified by ward/municipality for financial purpose',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan', 'lap'],
      },
      {
        id: 'char_killa',
        name: 'Four Boundaries (Char Killa)',
        description: 'Certified document from the ward office',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan', 'lap'],
      },
      {
        id: 'malpot',
        name: 'Land Revenue Receipt (Malpot)',
        description: 'Updated receipt showing taxes are paid',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan', 'lap'],
      },
      {
        id: 'transfer_deed',
        name: 'Transfer Deed (Rajinama/Bakaspatra)',
        description: 'Documents showing chain of ownership',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan', 'lap'],
      },
      {
        id: 'house_map',
        name: 'Approved House Map (Ghar Naaksa)',
        description: 'Approved by local authority',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan'],
      },
      {
        id: 'construction_permit',
        name: 'Construction Permit (Nirman Ijajat)',
        description: 'From municipality/VDC',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan'],
      },
      {
        id: 'completion_cert',
        name: 'Building Completion Certificate (Nirman Sampanna)',
        description: 'For ready-made house purchase',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan'],
      },
    ]
  },
  {
    id: 'income',
    title: 'Income Related Documents',
    color: 'amber',
    icon: '💰',
    documents: [
      {
        id: 'salary_cert',
        name: 'Salary Certificate',
        description: 'Letter from employer confirming salary',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
      {
        id: 'bank_statement',
        name: 'Bank Statement (Last 6 Months)',
        description: 'Bank account statement for last 6 months',
        required: true,
        acceptedFormats: ['pdf', 'xlsx', 'xls'],
      },
      {
        id: 'appointment_letter',
        name: 'Appointment Letter / Contract Paper',
        description: 'Employment contract or appointment letter',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
      {
        id: 'tds_receipt',
        name: 'TDS Receipt',
        description: 'Tax Deducted at Source receipt',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
      {
        id: 'firm_registration',
        name: 'Firm/Company Registration Certificate',
        description: 'For self-employed/business owners',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['business_loan', 'overdraft'],
      },
      {
        id: 'pan_vat',
        name: 'PAN/VAT Certificate',
        description: 'PAN or VAT registration certificate',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['business_loan', 'overdraft'],
      },
      {
        id: 'moa_aoa',
        name: 'MOA / AOA',
        description: 'Memorandum and Articles of Association',
        required: false,
        acceptedFormats: ['pdf'],
        loanTypes: ['business_loan'],
      },
      {
        id: 'audited_financial',
        name: 'Audited Financial Statements (Last 3 Years)',
        description: 'Latest audited financials for business assessment',
        required: false,
        acceptedFormats: ['pdf', 'xlsx', 'xls'],
        loanTypes: ['business_loan', 'overdraft'],
      },
      {
        id: 'rental_agreement',
        name: 'Rental Agreement',
        description: 'With tenant identification for rental income',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
      {
        id: 'rental_tax',
        name: 'Rental Tax Receipt',
        description: 'Tax receipt for rental income',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
      {
        id: 'pension_paybook',
        name: 'Pension Paybook (Pension Patta)',
        description: 'For pension income earners',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
      },
    ]
  },
  {
    id: 'other',
    title: 'Other Documents',
    color: 'purple',
    icon: '📋',
    documents: [
      {
        id: 'baina_paper',
        name: 'Baina Paper',
        description: 'Agreement to buy the land (if applicable)',
        required: false,
        acceptedFormats: ['pdf', 'jpg', 'jpeg'],
        loanTypes: ['home_loan', 'lap'],
      },
      {
        id: 'loan_application',
        name: 'Loan Application Form',
        description: 'Duly filled and signed application form',
        required: true,
        acceptedFormats: ['pdf'],
      },
      {
        id: 'valuation_report',
        name: 'Property Valuation Report',
        description: 'Report from approved valuer',
        required: false,
        acceptedFormats: ['pdf'],
        loanTypes: ['home_loan', 'lap'],
      },
    ]
  }
];
