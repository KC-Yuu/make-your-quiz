import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md mx-auto text-center">
      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
        <KeyRound className="h-6 w-6 text-indigo-600" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-slate-900">Clé d'API Gemini</h2>
      <p className="mt-2 text-slate-500">
        Veuillez entrer votre clé d'API Google Gemini 2.5 Flash pour commencer.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="api-key" className="sr-only">
              Clé d'API Gemini
            </label>
            <input
              id="api-key"
              name="api-key"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Entrez votre clé d'API Gemini..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Sauvegarder et commencer
          </button>
        </div>
      </form>
      <p className="mt-6 text-xs text-slate-400">
        Votre clé d'API est stockée localement dans votre navigateur et n'est jamais envoyée à nos serveurs.
      </p>
    </div>
  );
};
