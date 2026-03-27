import { useState, useCallback } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import BasicInfoForm from './components/BasicInfoForm';
import DocumentUpload from './components/DocumentUpload';
import ProcessingScreen from './components/ProcessingScreen';
import CreditMemo from './components/CreditMemo';
import ChatWidget from './components/ChatWidget';
import { generateCreditMemo, type LoanApplication, type CreditMemoData } from './utils/memoGenerator';

type Step = 'landing' | 'basic-info' | 'documents' | 'processing' | 'memo';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, { name: string; size: number }[]>>({});
  const [creditMemo, setCreditMemo] = useState<CreditMemoData | null>(null);

  const handleBasicInfoSubmit = (data: LoanApplication) => {
    setApplication(data);
    setStep('documents');
  };

  const handleDocumentsSubmit = (files: Record<string, { name: string; size: number }[]>) => {
    setUploadedFiles(files);
    setStep('processing');
  };

  const handleProcessingComplete = useCallback(() => {
    if (application) {
      const memo = generateCreditMemo({ ...application, uploadedFiles });
      setCreditMemo(memo);
      setStep('memo');
    }
  }, [application, uploadedFiles]);

  const handleNewApplication = () => {
    setStep('landing');
    setApplication(null);
    setUploadedFiles({});
    setCreditMemo(null);
  };

  const stepNum = step === 'basic-info' ? 1 : step === 'documents' ? 2 : step === 'processing' ? 3 : step === 'memo' ? 4 : undefined;

  return (
    <div className="min-h-screen bg-nepal-dark">
      {step !== 'landing' && step !== 'processing' && (
        <Header step={stepNum} totalSteps={4} />
      )}
      {step === 'landing' && (
        <>
          <Header />
          <LandingPage onStart={() => setStep('basic-info')} />
        </>
      )}
      {step === 'basic-info' && (
        <BasicInfoForm onSubmit={handleBasicInfoSubmit} />
      )}
      {step === 'documents' && application && (
        <DocumentUpload
          application={application}
          onBack={() => setStep('basic-info')}
          onSubmit={handleDocumentsSubmit}
        />
      )}
      {step === 'processing' && application && (
        <ProcessingScreen
          borrowerName={application.borrowerName}
          onComplete={handleProcessingComplete}
        />
      )}
      {step === 'memo' && creditMemo && (
        <>
          <CreditMemo memo={creditMemo} onNewApplication={handleNewApplication} />
          <ChatWidget memo={creditMemo} />
        </>
      )}
    </div>
  );
}
