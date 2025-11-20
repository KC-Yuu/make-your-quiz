import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, FileType } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndUpload(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    const validTypes = ['application/pdf', 'text/markdown', 'text/plain', 'text/x-markdown'];
    const isMarkdown = file.name.endsWith('.md') || file.name.endsWith('.markdown');

    if (validTypes.includes(file.type) || isMarkdown) {
      onFileSelected(file);
    } else {
      alert("Format de fichier non supporté. Veuillez utiliser PDF ou Markdown.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Transformez vos cours en Quiz</h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Déposez votre cours (PDF ou Markdown). Notre IA va le lire et générer un test de révision personnalisé instantanément.
        </p>
      </div>

      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ease-in-out cursor-pointer
          flex flex-col items-center justify-center bg-white shadow-sm group
          ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.md,.txt"
          onChange={handleInputChange}
        />

        <div className={`p-4 rounded-full bg-indigo-100 mb-4 group-hover:bg-indigo-200 transition-colors`}>
          <UploadCloud className="w-10 h-10 text-indigo-600" />
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Cliquez ou glissez un fichier ici
        </h3>
        <p className="text-slate-500 mb-6 text-center">
          Supporte les fichiers PDF (.pdf) et Markdown (.md)
        </p>

        <div className="flex gap-4 text-xs text-slate-400 uppercase tracking-wider font-semibold">
          <div className="flex items-center gap-1">
            <FileType className="w-4 h-4" /> PDF
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" /> Markdown
          </div>
        </div>
      </div>
    </div>
  );
};
