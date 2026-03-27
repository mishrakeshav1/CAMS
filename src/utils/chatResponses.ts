export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LoanInfo {
  borrowerName?: string;
  loanProduct?: string;
  loanAmount?: number;
  creditScore?: number;
  dscr?: number;
  ltvRatio?: number;
  monthlyIncome?: number;
  emi?: number;
}

const formatNPR = (amount: number) =>
  `NPR ${amount.toLocaleString('en-IN')}`;

const RESPONSES: Record<string, (info: LoanInfo) => string> = {
  greeting: () =>
    `Hello! I'm your CAMS Credit Analysis Assistant. I can help you understand the loan application, review documents, assess risks, and answer any questions about the credit memo. What would you like to know?`,

  dscr: (info) =>
    `**Debt Service Coverage Ratio (DSCR)**\n\nFor this application:\n- DSCR: **${info.dscr?.toFixed(2) || 'N/A'}x**\n- ${(info.dscr || 0) >= 1.5 ? '✅ Exceeds minimum requirement of 1.25x — Strong repayment capacity.' : (info.dscr || 0) >= 1.25 ? '⚠️ Meets minimum requirement of 1.25x — Acceptable but monitor closely.' : '❌ Below minimum requirement of 1.25x — High risk of default.'}\n\nFormula: Net Annual Income ÷ Annual Debt Service\nA DSCR above 1.5x indicates comfortable repayment ability.`,

  ltv: (info) =>
    `**Loan-to-Value (LTV) Ratio**\n\nFor this application:\n- LTV: **${info.ltvRatio?.toFixed(1) || 'N/A'}%**\n- Loan Amount: ${formatNPR(info.loanAmount || 0)}\n- ${(info.ltvRatio || 0) <= 70 ? '✅ Within acceptable limit (max 70% for home loans).' : '⚠️ Exceeds standard 70% ceiling — requires additional collateral or higher margin.'}\n\nLower LTV = Lower risk for the bank. Nepal Rastra Bank guideline: Max 65% for LAP, 70% for home loans.`,

  eligibility: (info) =>
    `**Loan Eligibility Analysis**\n\n- Borrower: ${info.borrowerName || 'N/A'}\n- Monthly Income: ${formatNPR(info.monthlyIncome || 0)}\n- Proposed EMI: ${formatNPR(info.emi || 0)}\n- EMI-to-Income Ratio: ${info.monthlyIncome ? ((( info.emi || 0) / info.monthlyIncome) * 100).toFixed(1) + '%' : 'N/A'}\n- Credit Score: ${info.creditScore || 'N/A'}\n\n${(info.creditScore || 0) >= 750 ? '✅ Excellent credit profile' : (info.creditScore || 0) >= 650 ? '✅ Good credit profile' : '⚠️ Fair credit profile — additional due diligence required'}`,

  documents: () =>
    `**Required Document Checklist**\n\n**Identification:**\n✅ Citizenship Certificate (Applicant + Guarantor)\n✅ Recent Passport Photos\n✅ Family Details Form (Ward Office)\n⚠️ PAN Card (mandatory for loans ≥ NPR 25 lakh)\n\n**Collateral:**\n✅ Lalpurja (Land Ownership)\n✅ Trace Map & Blueprint (Ward Certified)\n✅ Char Killa (Four Boundaries)\n✅ Malpot Receipt (Updated)\n\n**Income:**\n✅ Salary Certificate / Business Registration\n✅ Bank Statement (6 months)\n✅ TDS Receipt / Audited Financials\n\n**Other:**\n✅ Loan Application Form\n⚠️ Baina Paper (if purchasing land)`,

  collateral: (info) =>
    `**Collateral Assessment**\n\nFor this loan application:\n- LTV Ratio: ${info.ltvRatio?.toFixed(1)}%\n- The collateral should be valued by an **NRB-approved valuer**\n- Physical verification is mandatory before disbursement\n\n**Key checks:**\n1. Title clear — no encumbrance\n2. Four boundaries consistent with Lalpurja\n3. No legal dispute on the property\n4. Construction matches approved map\n5. Land category must be **Aawas** (residential) for home loans`,

  risk: (info) =>
    `**Risk Assessment Summary**\n\n**Financial Risks:**\n- DSCR: ${info.dscr?.toFixed(2)}x ${(info.dscr || 0) >= 1.5 ? '(Low Risk)' : '(Medium Risk)'}\n- LTV: ${info.ltvRatio?.toFixed(1)}% ${(info.ltvRatio || 0) <= 70 ? '(Acceptable)' : '(Monitor)'}\n- Credit Score: ${info.creditScore} ${(info.creditScore || 0) >= 720 ? '(Good)' : '(Fair)'}\n\n**Mitigants:**\n- Personal guarantee from co-applicant\n- Property insurance mandatory\n- Life insurance assignment\n\n**Overall Risk: ${(info.dscr || 0) >= 1.5 && (info.ltvRatio || 0) <= 70 ? 'LOW-MEDIUM' : 'MEDIUM'}**`,

  nrb: () =>
    `**Nepal Rastra Bank (NRB) Guidelines for Real Estate Loans**\n\n1. **LTV Limits:** Max 60% (LAP), 65% (HL without insurance), 70% (HL with insurance)\n2. **Risk Weight:** 100% for standard housing loans\n3. **Provisioning:** 1% (pass), 5% (watch), 25% (sub-standard)\n4. **Single Borrower Limit:** Max 25% of core capital\n5. **Real Estate Sector Limit:** Max 25% of total credit portfolio\n6. **Concentration Risk:** Branch-level monitoring required\n\nReference: NRB Unified Directives 2080, Directive No. 3`,

  emi: (info) =>
    `**EMI Calculation**\n\n- Loan Amount: ${formatNPR(info.loanAmount || 0)}\n- Monthly EMI: ${formatNPR(info.emi || 0)}\n- Monthly Income: ${formatNPR(info.monthlyIncome || 0)}\n- EMI/Income Ratio: ${info.monthlyIncome ? (((info.emi || 0) / info.monthlyIncome) * 100).toFixed(1) + '%' : 'N/A'}\n\n**Formula:** EMI = P × r × (1+r)^n / [(1+r)^n - 1]\nWhere P = Principal, r = monthly rate, n = tenure in months\n\n✅ EMI/Income ratio should ideally be below 50% for approval`,

  default: () =>
    `I can help you with information about:\n\n• **DSCR** — Debt Service Coverage Ratio analysis\n• **LTV** — Loan-to-Value ratio\n• **Eligibility** — Borrower eligibility assessment\n• **Documents** — Required document checklist\n• **Collateral** — Property valuation guidelines\n• **Risk** — Risk assessment summary\n• **NRB** — Nepal Rastra Bank guidelines\n• **EMI** — EMI calculation and analysis\n\nType any of these keywords or ask a specific question!`
};

export function getChatResponse(userMessage: string, loanInfo: LoanInfo): string {
  const msg = userMessage.toLowerCase();

  if (msg.match(/\b(hi|hello|hey|namaste|good\s*(morning|afternoon|evening))\b/)) {
    return RESPONSES.greeting(loanInfo);
  }
  if (msg.match(/\b(dscr|debt service|coverage ratio|repayment capacity)\b/)) {
    return RESPONSES.dscr(loanInfo);
  }
  if (msg.match(/\b(ltv|loan.to.value|collateral value|margin)\b/)) {
    return RESPONSES.ltv(loanInfo);
  }
  if (msg.match(/\b(eligible|eligibility|qualify|qualification|can.*approve)\b/)) {
    return RESPONSES.eligibility(loanInfo);
  }
  if (msg.match(/\b(document|checklist|required|missing doc|what.*need)\b/)) {
    return RESPONSES.documents(loanInfo);
  }
  if (msg.match(/\b(collateral|property|lalpurja|land|valuation|security)\b/)) {
    return RESPONSES.collateral(loanInfo);
  }
  if (msg.match(/\b(risk|risky|concern|issue|problem|flag)\b/)) {
    return RESPONSES.risk(loanInfo);
  }
  if (msg.match(/\b(nrb|nepal rastra|guideline|directive|regulation|compliance)\b/)) {
    return RESPONSES.nrb(loanInfo);
  }
  if (msg.match(/\b(emi|installment|monthly payment|repayment amount)\b/)) {
    return RESPONSES.emi(loanInfo);
  }
  if (msg.match(/\b(recommend|decision|approve|reject|sanction)\b/)) {
    return `**Credit Recommendation**\n\nBased on the analysis:\n- DSCR: ${loanInfo.dscr?.toFixed(2)}x\n- LTV: ${loanInfo.ltvRatio?.toFixed(1)}%\n- Credit Score: ${loanInfo.creditScore}\n\n**Recommendation: ${(loanInfo.dscr || 0) >= 1.5 && (loanInfo.creditScore || 0) >= 700 ? '✅ RECOMMEND FOR APPROVAL' : (loanInfo.dscr || 0) >= 1.25 ? '⚠️ CONDITIONAL APPROVAL — pending additional due diligence' : '❌ RECOMMEND FOR REJECTION'}**\n\nFinal decision authority rests with the Credit Committee per loan amount threshold.`;
  }
  if (msg.match(/\b(interest|rate|lending rate)\b/)) {
    return `**Interest Rate Information**\n\nCurrent lending rates (indicative):\n- Home Loan: **11.5% p.a.** (floating)\n- Loan Against Property: **12.5% p.a.**\n- Business Loan: **12.0% p.a.**\n- Overdraft: **13.0% p.a.**\n\nRates are linked to the bank's Base Rate and subject to change per NRB guidelines. Final rate determined at Credit Committee level.`;
  }
  if (msg.match(/\b(pan|vat|tax|tds)\b/)) {
    return `**Tax Document Requirements**\n\n- **PAN Card:** Mandatory for loans ≥ NPR 25 lakh per Income Tax Act\n- **TDS Receipt:** Required for salaried employees\n- **VAT Certificate:** Required for VAT-registered businesses\n- **Income Tax Clearance:** Required for loans above NPR 1 crore\n\n⚠️ Verify PAN against DoR database before processing`;
  }
  if (msg.match(/\b(guarantor|co-applicant|surety)\b/)) {
    return `**Guarantor Requirements**\n\n1. Valid citizenship certificate\n2. Must have independent income source\n3. No existing NPL accounts\n4. Credit check mandatory\n5. Net worth must cover guaranteed amount\n\n**Documents needed:**\n- Citizenship copy\n- Photo\n- Income proof\n- Bank statement\n- Property ownership (if property guarantor)`;
  }

  return RESPONSES.default(loanInfo);
}
