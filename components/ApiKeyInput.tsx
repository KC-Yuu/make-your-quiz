import React, { useState } from "react";
import { KeyRound } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySubmit: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-8 max-w-md mx-auto text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[var(--color-accent)]/10">
        <KeyRound className="h-6 w-6 text-[var(--color-accent)]" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-[var(--color-primary)]">
        Entrez votre clé d'API Gemini
      </h2>
      <p className="mt-2 text-[var(--color-muted)] font-normal">
        Veuillez entrer votre clé d'API Google Gemini 2.5 Flash pour commencer.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-md">
          <input
            id="api-key"
            name="api-key"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full px-4 py-3 rounded-md bg-[var(--color-muted)]/10 placeholder-[var(--color-muted)]/60 text-[var(--color-primary)] font-normal sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/60 focus:bg-[var(--color-surface)]"
            placeholder="Entrez votre clé d'API Gemini..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-bold bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]/60 transition-colors text-[var(--color-foreground)]"
          >
            Soumettre la Clé API
          </button>
        </div>
      </form>
      <p className="mt-6 text-xs text-[var(--color-muted)]/60 font-normal">
        Votre clé d'API est stockée localement dans votre navigateur et n'est
        jamais envoyée à nos serveurs.
      </p>
    </div>
  );
};
