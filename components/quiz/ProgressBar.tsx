import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = ((current + 1) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs font-bold text-[var(--color-foreground)]/80 uppercase tracking-wider mb-2">
        <span>
          Question {current + 1} / {total}
        </span>
        <span>Progression</span>
      </div>
      <div className="h-2 bg-[var(--color-secondary)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
