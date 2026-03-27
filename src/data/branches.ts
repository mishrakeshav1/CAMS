export const BRANCHES = [
  { id: 'KTM-001', name: 'Kathmandu Main Branch', district: 'Kathmandu', code: 'KTM' },
  { id: 'PKH-002', name: 'Pokhara Lakeside Branch', district: 'Kaski', code: 'PKH' },
  { id: 'BRT-003', name: 'Birgunj Commercial Branch', district: 'Parsa', code: 'BRT' },
  { id: 'BRT-004', name: 'Biratnagar Industrial Branch', district: 'Morang', code: 'BNR' },
  { id: 'BTW-005', name: 'Butwal Highway Branch', district: 'Rupandehi', code: 'BTW' },
  { id: 'DHN-006', name: 'Dhangadhi Western Branch', district: 'Kailali', code: 'DHN' },
  { id: 'NPJ-007', name: 'Nepalgunj Central Branch', district: 'Banke', code: 'NPJ' },
  { id: 'HTP-008', name: 'Hetauda Industrial Branch', district: 'Makwanpur', code: 'HTP' },
  { id: 'ITH-009', name: 'Itahari Trade Branch', district: 'Sunsari', code: 'ITH' },
  { id: 'JNK-010', name: 'Janakpur Cultural Branch', district: 'Dhanusha', code: 'JNK' },
];

export const LOAN_PRODUCTS = [
  {
    id: 'home_loan',
    name: 'Home Loan',
    maxAmount: 50000000,
    maxTenureMonths: 240,
    interestRate: 11.5,
    description: 'Residential property purchase or construction',
    icon: '🏠'
  },
  {
    id: 'overdraft',
    name: 'Overdraft Facility',
    maxAmount: 10000000,
    maxTenureMonths: 12,
    interestRate: 13.0,
    description: 'Short-term working capital facility',
    icon: '💳'
  },
  {
    id: 'lap',
    name: 'Loan Against Property',
    maxAmount: 30000000,
    maxTenureMonths: 180,
    interestRate: 12.5,
    description: 'Mortgage against existing property',
    icon: '🏢'
  },
  {
    id: 'business_loan',
    name: 'Business Loan',
    maxAmount: 25000000,
    maxTenureMonths: 84,
    interestRate: 12.0,
    description: 'Business expansion and working capital',
    icon: '💼'
  },
];
