import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center max-w-md">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
        <AlertOctagon className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">Oups, une erreur est survenue</h3>
      <p className="text-slate-600 mb-6">
        {message || "Nous n'avons pas pu générer le quiz. Veuillez vérifier votre fichier et réessayer."}
      </p>
      <button
        onClick={onRetry}
        className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Réessayer
      </button>
    </div>
  );
};
