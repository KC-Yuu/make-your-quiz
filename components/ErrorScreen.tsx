import React from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="bg-[var(--color-surface)] p-8 rounded-2xl text-center max-w-md mx-auto">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-danger)]/10 rounded-full mb-6">
        <AlertOctagon className="w-8 h-8 text-[var(--color-danger)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">
        Oups, une erreur est survenue
      </h3>
      <p className="text-[var(--color-muted)] font-normal mb-6">
        {message ||
          "Nous n'avons pas pu générer le quiz. Veuillez vérifier votre fichier et réessayer."}
      </p>
      <button
        onClick={onRetry}
        className="bg-[var(--color-muted)]/10 hover:bg-[var(--color-accent)]/10 text-[var(--color-primary)] font-bold py-2.5 px-6 rounded-md flex items-center justify-center gap-2 mx-auto transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Réessayer
      </button>
    </div>
  );
};
