import { useState, useCallback } from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import PersonalDetails from './components/PersonalDetails';
import IdentityVerification from './components/IdentityVerification';
import AddressDetails from './components/AddressDetails';
import EmploymentDetails from './components/EmploymentDetails';
import CardSelection from './components/CardSelection';
import ReviewSubmit from './components/ReviewSubmit';
import Success from './components/Success';
import type {
  Step,
  PersonalDetails as PersonalDetailsType,
  IdentityDetails,
  AddressDetails as AddressDetailsType,
  EmploymentDetails as EmploymentDetailsType,
  CardSelection as CardSelectionType,
  ApplicationData,
} from './types';
import {
  initialPersonalDetails,
  initialIdentityDetails,
  initialAddressDetails,
  initialEmploymentDetails,
  initialCardSelection,
  STEP_ORDER,
} from './types';

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [personal, setPersonal] = useState<PersonalDetailsType>(initialPersonalDetails);
  const [identity, setIdentity] = useState<IdentityDetails>(initialIdentityDetails);
  const [address, setAddress] = useState<AddressDetailsType>(initialAddressDetails);
  const [employment, setEmployment] = useState<EmploymentDetailsType>(initialEmploymentDetails);
  const [card, setCard] = useState<CardSelectionType>(initialCardSelection);

  const goBack = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(step);
    if (currentIndex > 0) {
      setStep(STEP_ORDER[currentIndex - 1]);
    }
  }, [step]);

  const handlePersonalNext = (data: PersonalDetailsType) => {
    setPersonal(data);
    setStep('identity');
  };

  const handleIdentityNext = (data: IdentityDetails) => {
    setIdentity(data);
    setStep('address');
  };

  const handleAddressNext = (data: AddressDetailsType) => {
    setAddress(data);
    setStep('employment');
  };

  const handleEmploymentNext = (data: EmploymentDetailsType) => {
    setEmployment(data);
    setStep('card');
  };

  const handleCardNext = (data: CardSelectionType) => {
    setCard(data);
    setStep('review');
  };

  const handleEdit = (targetStep: Step) => {
    setStep(targetStep);
  };

  const handleSubmit = () => {
    setStep('success');
  };

  const handleNewApplication = () => {
    setStep('welcome');
    setPersonal(initialPersonalDetails);
    setIdentity(initialIdentityDetails);
    setAddress(initialAddressDetails);
    setEmployment(initialEmploymentDetails);
    setCard(initialCardSelection);
  };

  const applicationData: ApplicationData = {
    personal,
    identity,
    address,
    employment,
    card,
  };

  const showBack = step !== 'welcome' && step !== 'success' && step !== 'personal';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentStep={step}
        onBack={showBack ? goBack : undefined}
      />

      {step === 'welcome' && (
        <Welcome onStart={() => setStep('personal')} />
      )}

      {step === 'personal' && (
        <PersonalDetails data={personal} onNext={handlePersonalNext} />
      )}

      {step === 'identity' && (
        <IdentityVerification data={identity} onNext={handleIdentityNext} />
      )}

      {step === 'address' && (
        <AddressDetails data={address} onNext={handleAddressNext} />
      )}

      {step === 'employment' && (
        <EmploymentDetails data={employment} onNext={handleEmploymentNext} />
      )}

      {step === 'card' && (
        <CardSelection
          data={card}
          monthlySalary={employment.monthlySalary}
          onNext={handleCardNext}
        />
      )}

      {step === 'review' && (
        <ReviewSubmit
          data={applicationData}
          onEdit={handleEdit}
          onSubmit={handleSubmit}
        />
      )}

      {step === 'success' && (
        <Success
          data={applicationData}
          onNewApplication={handleNewApplication}
        />
      )}
    </div>
  );
}
