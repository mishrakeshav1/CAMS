import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Download, Folder } from 'lucide-react';
import { DOCUMENT_CATEGORIES, type DocumentItem } from '../data/documentTypes';
import type { LoanApplication } from '../utils/memoGenerator';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  docId: string;
}

interface Props {
  application: LoanApplication;
  onBack: () => void;
  onSubmit: (files: Record<string, UploadedFile[]>) => void;
}

function DocDropzone({ doc, files, onDrop, onRemove }: {
  doc: DocumentItem;
  files: UploadedFile[];
  onDrop: (docId: string, accepted: File[]) => void;
  onRemove: (docId: string, idx: number) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted) => onDrop(doc.id, accepted),
    accept: doc.acceptedFormats.reduce((acc, ext) => {
      if (ext === 'pdf') acc['application/pdf'] = ['.pdf'];
      if (ext === 'jpg' || ext === 'jpeg') acc['image/jpeg'] = ['.jpg', '.jpeg'];
      if (ext === 'png') acc['image/png'] = ['.png'];
      if (ext === 'xlsx' || ext === 'xls') {
        acc['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] = ['.xlsx'];
        acc['application/vnd.ms-excel'] = ['.xls'];
      }
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 5,
  });

  const uploaded = files.length > 0;

  return (
    <div className={`rounded-xl border transition-all ${
      uploaded ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 bg-white/3'
    }`}>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-2">
            <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
              uploaded ? 'bg-emerald-500' : doc.required ? 'bg-red-500/20 border border-red-500/40' : 'bg-white/10 border border-white/20'
            }`}>
              {uploaded
                ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                : doc.required
                ? <AlertCircle className="w-3 h-3 text-red-400" />
                : <span className="text-white/30 text-xs">○</span>
              }
            </div>
            <div>
              <div className="text-white text-sm font-medium leading-tight">{doc.name}</div>
              <div className="text-white/40 text-xs mt-0.5">{doc.description}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {doc.acceptedFormats.map(f => (
                  <span key={f} className="text-xs bg-white/10 text-white/50 rounded px-1.5 py-0.5">.{f}</span>
                ))}
                {doc.required && <span className="badge-danger text-xs">Required</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded files */}
        {files.length > 0 && (
          <div className="space-y-1.5 mb-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-emerald-500/10 rounded-lg px-2.5 py-1.5">
                <File className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-300 text-xs truncate flex-1">{f.name}</span>
                <span className="text-white/30 text-xs">{(f.size / 1024).toFixed(0)}KB</span>
                <button onClick={() => onRemove(doc.id, i)} className="text-white/30 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Drop zone */}
        <div
          {...getRootProps()}
          className={`border border-dashed rounded-lg px-3 py-2 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-center gap-2 text-xs text-white/40">
            <Upload className="w-3.5 h-3.5" />
            {isDragActive ? 'Drop here...' : 'Drop file or click to upload'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DocumentUpload({ application, onBack, onSubmit }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({});
  const [activeCategory, setActiveCategory] = useState('identification');

  const handleDrop = useCallback((docId: string, accepted: File[]) => {
    setUploadedFiles(prev => ({
      ...prev,
      [docId]: [
        ...(prev[docId] || []),
        ...accepted.map(f => ({ name: f.name, size: f.size, type: f.type, docId }))
      ]
    }));
  }, []);

  const handleRemove = useCallback((docId: string, idx: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [docId]: (prev[docId] || []).filter((_, i) => i !== idx)
    }));
  }, []);

  const allDocs = DOCUMENT_CATEGORIES.flatMap(c => c.documents);
  const requiredDocs = allDocs.filter(d => d.required);
  const uploadedCount = Object.values(uploadedFiles).filter(v => v.length > 0).length;
  const requiredUploaded = requiredDocs.filter(d => (uploadedFiles[d.id] || []).length > 0).length;

  const downloadDemoDocPackage = () => {
    // Create a text file listing all demo documents
    const content = `DEMO DOCUMENT PACKAGE
Nepal Bank Limited — CAMS System
Application: ${application.loanApplicationId}
Borrower: ${application.borrowerName}
Generated: ${new Date().toLocaleDateString('en-NP')}

NOTE: This is a demo package. In production, actual scanned documents would be provided.

REQUIRED DOCUMENTS CHECKLIST:
${requiredDocs.map(d => `  ✅ ${d.name}`).join('\n')}

OPTIONAL DOCUMENTS:
${allDocs.filter(d => !d.required).map(d => `  ☐ ${d.name}`).join('\n')}

For demonstration, all uploaded files will be treated as validated.
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Demo_DocPackage_${application.loanApplicationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const simulateAllUploads = () => {
    const simulated: Record<string, UploadedFile[]> = {};
    allDocs.forEach(doc => {
      simulated[doc.id] = [{
        name: `${doc.id}_demo.pdf`,
        size: 150000 + Math.floor(Math.random() * 350000),
        type: 'application/pdf',
        docId: doc.id,
      }];
    });
    setUploadedFiles(simulated);
  };

  const activeCategory_ = DOCUMENT_CATEGORIES.find(c => c.id === activeCategory)!;
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/50 bg-blue-500/10 text-blue-300',
    emerald: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
    amber: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
    purple: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Document Upload</h1>
        <p className="text-blue-300">Upload all required documents for {application.borrowerName}'s application</p>
      </div>

      {/* Progress Bar */}
      <div className="glass-card-solid p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-white text-2xl font-bold">{uploadedCount}</div>
            <div className="text-white/50 text-xs">Documents Uploaded</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div className="text-emerald-400 text-2xl font-bold">{requiredUploaded}/{requiredDocs.length}</div>
            <div className="text-white/50 text-xs">Required Complete</div>
          </div>
          <div className="w-40 bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(requiredUploaded / requiredDocs.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadDemoDocPackage}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Demo Docs
          </button>
          <button
            onClick={simulateAllUploads}
            className="flex items-center gap-1.5 bg-nepal-gold/10 hover:bg-nepal-gold/20 border border-nepal-gold/30 rounded-xl px-3 py-2 text-nepal-gold text-sm transition-all"
          >
            <Folder className="w-4 h-4" />
            Auto-Fill Demo
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-52 flex-shrink-0 space-y-2">
          {DOCUMENT_CATEGORIES.map(cat => {
            const catDocs = cat.documents;
            const catUploaded = catDocs.filter(d => (uploadedFiles[d.id] || []).length > 0).length;
            const catRequired = catDocs.filter(d => d.required).length;
            const catReqUploaded = catDocs.filter(d => d.required && (uploadedFiles[d.id] || []).length > 0).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  activeCategory === cat.id
                    ? colorMap[cat.color]
                    : 'border-white/10 bg-white/3 text-white/60 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{cat.icon}</span>
                  <span className="font-medium text-sm">{cat.title}</span>
                </div>
                <div className="text-xs opacity-70">
                  {catUploaded}/{catDocs.length} uploaded
                  {catRequired > 0 && ` · ${catReqUploaded}/${catRequired} req`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="glass-card-solid p-5">
            <h3 className="section-title mb-4">
              <span className="text-xl">{activeCategory_.icon}</span>
              {activeCategory_.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeCategory_.documents.map(doc => (
                <DocDropzone
                  key={doc.id}
                  doc={doc}
                  files={uploadedFiles[doc.id] || []}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-3">
          {requiredUploaded < requiredDocs.length && (
            <span className="text-amber-400 text-sm">
              ⚠️ {requiredDocs.length - requiredUploaded} required document(s) missing
            </span>
          )}
          <button
            onClick={() => onSubmit(uploadedFiles)}
            className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
          >
            Generate Credit Memo
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
