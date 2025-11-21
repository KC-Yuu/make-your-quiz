import React from "react";
import { HelpCircle } from "lucide-react";

interface ExplanationBoxProps {
  explanation: string;
  isVisible: boolean;
}

export const ExplanationBox: React.FC<ExplanationBoxProps> = ({
  explanation,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="mt-6 p-4 bg-[var(--color-highlight)]/10 rounded-xl">
      <div className="flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
        <div>
          <h4 className="font-bold text-[var(--color-primary)] text-sm uppercase mb-1">
            Explication
          </h4>
          <p className="text-[var(--color-muted)] font-normal text-sm leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
