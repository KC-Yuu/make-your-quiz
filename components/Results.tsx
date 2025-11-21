import React, { useEffect, useState } from "react";
import { QuizQuestion, QuizResult } from "../types";
import { RotateCcw } from "lucide-react";
import { ScoreSummary } from "./results/ScoreSummary";
import { ResultChart } from "./results/ResultChart";
import { DetailedReview } from "./results/DetailedReview";

interface ResultsProps {
  result: QuizResult;
  questions: QuizQuestion[];
  onRetry: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  result,
  questions,
  onRetry,
}) => {
  const percentage = Math.round((result.score / result.total) * 100);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (percentage >= 70) setShowConfetti(true);
  }, [percentage]);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden">
        <ScoreSummary
          score={result.score}
          total={result.total}
          percentage={percentage}
          showConfetti={showConfetti}
        />

        {/* Chart Section */}
        <div className="px-8 pb-8">
          <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6">
            Répartition des réponses
          </h3>
          <ResultChart score={result.score} total={result.total} />

          <div className="mt-6 text-center">
            <button
              onClick={onRetry}
              className="flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-bold bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]/60 transition-colors mx-auto items-center cursor-pointer gap-2 text-[var(--color-foreground)]"
            >
              <RotateCcw className="w-5 h-5" />
              Charger un autre cours
            </button>
          </div>
        </div>

        {/* Detailed Review */}
        <DetailedReview result={result} questions={questions} />
      </div>
    </div>
  );
};
