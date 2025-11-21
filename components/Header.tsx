import React from "react";
import { BrainCircuit } from "lucide-react";
import { AppState } from "../types";

interface HeaderProps {
  apiKey: string;
  appState: AppState;
  onClearApiKey: () => void;
  onNewQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  apiKey,
  appState,
  onClearApiKey,
  onNewQuiz,
}) => {
  return (
    <header className="flex items-center justify-between py-6 px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <BrainCircuit className="h-8 w-8 text-[var(--color-accent)]" />
        <h1 className="text-2xl font-bold">Make Your Quiz</h1>
      </div>
      <div className="flex items-center gap-4">
        {apiKey && appState !== AppState.API_KEY_INPUT && (
          <button
            onClick={onClearApiKey}
            className="flex items-center gap-1 text-sm font-bold text-[var(--color-foreground)]/80 underline-custom hover:text-[var(--color-danger)] cursor-pointer transition-colors"
          >
            Effacer la clé
          </button>
        )}
        {appState !== AppState.UPLOAD &&
          appState !== AppState.API_KEY_INPUT && (
            <button
              onClick={onNewQuiz}
              className="text-sm font-bold text-[var(--color-foreground)]/80 cursor-pointer underline-custom hover:text-[var(--color-accent)] transition-colors"
            >
              Nouveau Quiz
            </button>
          )}
      </div>
    </header>
  );
};
