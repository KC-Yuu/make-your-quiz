import React from "react";

interface ScoreSummaryProps {
  score: number;
  total: number;
  percentage: number;
  showConfetti: boolean;
}

interface Feedback {
  text: string;
  color: string;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  score,
  total,
  percentage,
}) => {
  const getFeedback = (): Feedback => {
    if (percentage === 100)
      return {
        text: "Excellent ! Maîtrise parfaite.",
        color: "text-[var(--color-success)]",
      };
    if (percentage >= 70)
      return {
        text: "Très bien ! Vous avez compris l'essentiel.",
        color: "text-[var(--color-accent)]",
      };
    if (percentage >= 40)
      return {
        text: "Pas mal, mais quelques révisions sont nécessaires.",
        color: "text-[var(--color-warning)]",
      };
    return {
      text: "Il faut revoir le cours.",
      color: "text-[var(--color-danger)]",
    };
  };

  const feedback = getFeedback();

  return (
    <div className="p-8 sm:p-12 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-2">
        Score: {percentage}%
      </h2>
      <p className={`text-lg font-bold ${feedback.color} mb-8`}>
        {feedback.text} ({score}/{total})
      </p>
    </div>
  );
};
