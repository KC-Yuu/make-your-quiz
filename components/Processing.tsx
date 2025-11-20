import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface ProcessingProps {
  fileName: string;
}

export const Processing: React.FC<ProcessingProps> = ({ fileName }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl shadow-xl border border-indigo-50">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-25"></div>
        <div className="relative bg-white p-4 rounded-full border-4 border-indigo-100">
          <Sparkles className="w-12 h-12 text-indigo-600 animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyse en cours...</h3>
      <p className="text-slate-600 mb-8 max-w-md">
        L'IA est en train de lire <span className="font-semibold text-indigo-700">{fileName}</span> et de préparer vos questions de révision.
      </p>
      
      <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Génération du QCM via Gemini 2.5 Flash</span>
      </div>
    </div>
  );
};
