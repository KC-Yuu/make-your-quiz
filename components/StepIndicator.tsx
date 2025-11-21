import React from "react";

interface StepIndicatorProps {
  title: string;
  helper: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  title,
  helper,
}) => {
  return (
    <div className="mb-6 text-center">
      <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-foreground)]/10 text-[var(--color-foreground)]/80 px-4 py-1 text-xs font-bold uppercase tracking-widest">
        {title}
      </span>
      <p className="mt-2 text-sm font-normal text-[var(--color-foreground)]/70">
        {helper}
      </p>
    </div>
  );
};
