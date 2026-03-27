import { BRANCHES, LOAN_PRODUCTS } from '../data/branches';

export interface LoanApplication {
  borrowerName: string;
  guarantorName: string;
  branchId: string;
  loanApplicationId: string;
  loanAmount: number;
  loanProduct: string;
  occupation: string;
  employer: string;
  monthlyIncome: number;
  creditScore: number;
  propertyValue: number;
  propertyLocation: string;
  age: number;
  tenure?: number;
  uploadedFiles?: Record<string, { name: string; size: number }[]>;
}

export interface CreditMemoData {
  memoId: string;
  generatedAt: Date;
  application: LoanApplication;
  financials: {
    emi: number;
    dscr: number;
    ltvRatio: number;
    existingObligations: number;
    netMonthlyIncome: number;
    proposedEMI: number;
    totalObligations: number;
    foir: number;
    bankStatement: { month: string; credit: number; debit: number; balance: number }[];
  };
  collateral: {
    type: string;
    location: string;
    area: string;
    marketValue: number;
    distressValue: number;
    loanableValue: number;
    valuationDate: string;
    valuedBy: string;
  };
  recommendation: 'APPROVE' | 'CONDITIONAL_APPROVE' | 'REJECT';
  conditions: string[];
  riskRating: 'LOW' | 'LOW-MEDIUM' | 'MEDIUM' | 'MEDIUM-HIGH' | 'HIGH';
}

export function generateCreditMemo(app: LoanApplication): CreditMemoData {
  const product = LOAN_PRODUCTS.find(p => p.id === app.loanProduct);
  const branch = BRANCHES.find(b => b.id === app.branchId);
  const tenure = app.tenure || (product?.maxTenureMonths || 120);
  const monthlyRate = (product?.interestRate || 12) / 100 / 12;
  const emi = Math.round(
    (app.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  );
  const existingObligations = Math.round(app.monthlyIncome * 0.08);
  const totalObligations = emi + existingObligations;
  const netMonthlyIncome = Math.round(app.monthlyIncome * 0.87); // after tax
  const dscr = parseFloat((netMonthlyIncome / totalObligations).toFixed(2));
  const ltvRatio = parseFloat(((app.loanAmount / app.propertyValue) * 100).toFixed(1));
  const foir = parseFloat(((totalObligations / netMonthlyIncome) * 100).toFixed(1));
  const distressValue = Math.round(app.propertyValue * 0.75);
  const loanableValue = Math.round(app.propertyValue * 0.70);

  // Generate realistic bank statement
  const months = ['Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025'];
  let balance = Math.round(app.monthlyIncome * 1.8);
  const bankStatement = months.map(month => {
    const credit = Math.round(app.monthlyIncome * (0.9 + Math.random() * 0.3));
    const debit = Math.round(credit * (0.7 + Math.random() * 0.2));
    balance = balance + credit - debit;
    return { month, credit, debit, balance: Math.max(balance, 50000) };
  });

  let recommendation: 'APPROVE' | 'CONDITIONAL_APPROVE' | 'REJECT' = 'APPROVE';
  let riskRating: 'LOW' | 'LOW-MEDIUM' | 'MEDIUM' | 'MEDIUM-HIGH' | 'HIGH' = 'LOW';
  const conditions: string[] = [];

  if (dscr < 1.25) {
    recommendation = 'REJECT';
    riskRating = 'HIGH';
  } else if (dscr < 1.5 || ltvRatio > 70 || app.creditScore < 700) {
    recommendation = 'CONDITIONAL_APPROVE';
    riskRating = 'MEDIUM';
    if (ltvRatio > 70) conditions.push('Reduce loan amount to achieve LTV ≤ 70%');
    if (app.creditScore < 700) conditions.push('Additional collateral security required');
    if (dscr < 1.5) conditions.push('Life insurance policy assignment mandatory');
  } else {
    riskRating = dscr >= 1.8 ? 'LOW' : 'LOW-MEDIUM';
  }

  // Standard conditions
  conditions.push('Property insurance (fire & peril) to be assigned in favor of bank');
  conditions.push('Life insurance of borrower to be assigned in favor of bank');
  conditions.push('All original title documents to be held by bank');
  conditions.push('Quarterly monitoring of account operations');
  if (app.loanAmount >= 2500000) conditions.push('PAN card verification with DoR mandatory');
  if (app.loanProduct === 'business_loan') {
    conditions.push('Annual submission of audited financial statements');
    conditions.push('Stock/debtors statement quarterly');
  }

  return {
    memoId: `CAMS-${branch?.code || 'HQ'}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
    generatedAt: new Date(),
    application: app,
    financials: {
      emi,
      dscr,
      ltvRatio,
      existingObligations,
      netMonthlyIncome,
      proposedEMI: emi,
      totalObligations,
      foir,
      bankStatement,
    },
    collateral: {
      type: app.loanProduct === 'home_loan' ? 'Residential Property' : 'Commercial / Residential Property',
      location: app.propertyLocation,
      area: `${(150 + Math.floor(Math.random() * 200))} sq. meters`,
      marketValue: app.propertyValue,
      distressValue,
      loanableValue,
      valuationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-NP'),
      valuedBy: 'Er. Prakash Raj Shrestha (NRB Licensed Valuer - LV-2019-0145)',
    },
    recommendation,
    conditions,
    riskRating,
  };
}

export function formatNPR(amount: number): string {
  if (amount >= 10000000) return `NPR ${(amount / 10000000).toFixed(2)} Crore`;
  if (amount >= 100000) return `NPR ${(amount / 100000).toFixed(2)} Lakh`;
  return `NPR ${amount.toLocaleString('en-IN')}`;
}
