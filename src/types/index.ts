export interface PersonalDetails {
  fullNameEnglish: string;
  fullNameNepali: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  nationality: string;
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  spouseName: string;
  mobileNumber: string;
  email: string;
}

export interface IdentityDetails {
  citizenshipNumber: string;
  citizenshipIssuedDate: string;
  citizenshipIssuedDistrict: string;
  panNumber: string;
  photoFile: File | null;
  citizenshipFrontFile: File | null;
  citizenshipBackFile: File | null;
}

export interface AddressDetails {
  permanentProvince: string;
  permanentDistrict: string;
  permanentMunicipality: string;
  permanentWard: string;
  permanentTole: string;
  sameAsPermanent: boolean;
  currentProvince: string;
  currentDistrict: string;
  currentMunicipality: string;
  currentWard: string;
  currentTole: string;
}

export interface EmploymentDetails {
  employmentType: 'private' | 'government' | 'semi-government' | 'ngo' | '';
  employerName: string;
  designation: string;
  employerAddress: string;
  yearsOfService: string;
  monthlySalary: string;
  otherIncome: string;
  sourceOfOtherIncome: string;
  salarySlipFile: File | null;
  bankStatementFile: File | null;
}

export type CardType = 'classic' | 'gold' | 'platinum';

export interface CardSelection {
  selectedCard: CardType | '';
  agreedToTerms: boolean;
}

export interface ApplicationData {
  personal: PersonalDetails;
  identity: IdentityDetails;
  address: AddressDetails;
  employment: EmploymentDetails;
  card: CardSelection;
}

export type Step = 'welcome' | 'personal' | 'identity' | 'address' | 'employment' | 'card' | 'review' | 'success';

export const STEP_ORDER: Step[] = ['welcome', 'personal', 'identity', 'address', 'employment', 'card', 'review', 'success'];

export const STEP_LABELS: Record<Step, string> = {
  welcome: 'Welcome',
  personal: 'Personal Info',
  identity: 'Identity',
  address: 'Address',
  employment: 'Employment',
  card: 'Choose Card',
  review: 'Review',
  success: 'Done',
};

export const initialPersonalDetails: PersonalDetails = {
  fullNameEnglish: '',
  fullNameNepali: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  nationality: 'Nepali',
  fatherName: '',
  motherName: '',
  grandfatherName: '',
  spouseName: '',
  mobileNumber: '',
  email: '',
};

export const initialIdentityDetails: IdentityDetails = {
  citizenshipNumber: '',
  citizenshipIssuedDate: '',
  citizenshipIssuedDistrict: '',
  panNumber: '',
  photoFile: null,
  citizenshipFrontFile: null,
  citizenshipBackFile: null,
};

export const initialAddressDetails: AddressDetails = {
  permanentProvince: '',
  permanentDistrict: '',
  permanentMunicipality: '',
  permanentWard: '',
  permanentTole: '',
  sameAsPermanent: false,
  currentProvince: '',
  currentDistrict: '',
  currentMunicipality: '',
  currentWard: '',
  currentTole: '',
};

export const initialEmploymentDetails: EmploymentDetails = {
  employmentType: '',
  employerName: '',
  designation: '',
  employerAddress: '',
  yearsOfService: '',
  monthlySalary: '',
  otherIncome: '',
  sourceOfOtherIncome: '',
  salarySlipFile: null,
  bankStatementFile: null,
};

export const initialCardSelection: CardSelection = {
  selectedCard: '',
  agreedToTerms: false,
};
