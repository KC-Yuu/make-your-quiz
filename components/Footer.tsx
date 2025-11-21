import React from "react";

interface FooterProps {
  apiKey: string;
  requestCount: number;
}

export const Footer: React.FC<FooterProps> = ({ apiKey, requestCount }) => {
  return (
    <footer className="py-6 px-4 text-center text-[var(--color-foreground)]/70 text-sm font-normal">
      <p>Propulsé par Google Gemini • Révisions intelligentes</p>
      {apiKey && (
        <p className="mt-2 text-xs text-[var(--color-foreground)]/60 font-normal">
          Requêtes API aujourd'hui : {requestCount} (estimation)
        </p>
      )}
    </footer>
  );
};
