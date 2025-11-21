import React from "react";
import { Loader2, Sparkles } from "lucide-react";

interface ProcessingProps {
  fileName: string;
}

export const Processing: React.FC<ProcessingProps> = ({ fileName }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-[var(--color-surface)] rounded-2xl">
      <div className="relative mb-8">
        <div className="bg-[var(--color-success)]/10 p-4 rounded-full">
          <Sparkles className="w-12 h-12 text-[var(--color-success)] animate-pulse" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
        Analyse en cours...
      </h3>
      <p className="text-[var(--color-muted)] font-normal mb-8 max-w-md">
        L'IA est en train de lire{" "}
        <span className="font-bold text-[var(--color-accent)]">{fileName}</span>{" "}
        et de préparer vos questions de révision.
      </p>

      <div className="flex items-center gap-2 text-sm font-normal text-[var(--color-muted)] bg-[var(--color-muted)]/10 px-4 py-2 rounded-full">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Veuillez patienter, cela peut prendre quelques instants...</span>
      </div>
    </div>
  );
};
