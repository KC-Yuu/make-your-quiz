import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

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

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) validateAndUpload(files[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0)
      validateAndUpload(e.target.files[0]);
  };

  const validateAndUpload = (file: File) => {
    const validTypes = [
      "application/pdf",
      "text/markdown",
      "text/plain",
      "text/x-markdown",
    ];

    const isMarkdown =
      file.name.endsWith(".md") || file.name.endsWith(".markdown");

    if (validTypes.includes(file.type) || isMarkdown) {
      onFileSelected(file);
    } else {
      alert(
        "Format de fichier non supporté. Veuillez utiliser PDF ou Markdown."
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
          Transformez vos cours en Quiz
        </h2>

        <p className="text-lg text-[var(--color-foreground)]/80 max-w-xl mx-auto">
          Déposez votre cours (PDF ou Markdown). Notre IA le lit et génère un
          quiz personnalisé instantanément.
        </p>

        <p className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-foreground)]/70 bg-[var(--color-foreground)]/10 px-4 py-1 rounded-full">
          <span
            className="w-2 h-2 rounded-full bg-[var(--color-success)] inline-block"
            aria-hidden
          />
          Durée moyenne : 20 à 40 secondes
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Déposer ou sélectionner un fichier"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          rounded-2xl p-10 border-2 border-dashed cursor-pointer
          flex flex-col items-center justify-center text-center
          transition-all duration-200 outline-none
          bg-[var(--color-surface)]
          hover:bg-[var(--color-surface)]/90
          ${
            isDragging
              ? "border-[var(--color-accent)]"
              : "border-[var(--color-foreground)]/30"
          }
        `}
      >
        <UploadCloud
          className="w-12 h-12 text-[var(--color-accent)] mb-4"
          aria-hidden
        />
        <p className="text-[var(--color-primary)] font-medium mb-2">
          Glissez-déposez votre fichier ici
        </p>
        <p className="text-sm text-[var(--color-primary)]">
          (ou cliquez pour sélectionner un fichier)
        </p>
        <input
          type="file"
          accept=".pdf,.md,.markdown,.txt"
          ref={fileInputRef}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
