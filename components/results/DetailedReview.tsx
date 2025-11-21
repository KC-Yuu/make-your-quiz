import React from "react";
import { QuizQuestion, QuizResult } from "../../types";

interface DetailedReviewProps {
  result: QuizResult;
  questions: QuizQuestion[];
}

export const DetailedReview: React.FC<DetailedReviewProps> = ({
  result,
  questions,
}) => {
  return (
    <div className="p-8">
      <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6">
        Correction détaillée
      </h3>
      <div className="space-y-4">
        {result.details.map((detail, index) => {
          const question = questions[detail.questionIndex];
          return (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                detail.isCorrect
                  ? "bg-[var(--color-success)]/5"
                  : "bg-[var(--color-danger)]/5"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`font-bold text-sm px-2 py-0.5 rounded ${
                    detail.isCorrect
                      ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                      : "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                  }`}
                >
                  Q{index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[var(--color-primary)] mb-2">
                    {question.question}
                  </p>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-muted)]/70">
                      <span className="w-20 text-xs uppercase font-bold">
                        Votre réponse:
                      </span>
                      <span
                        className={
                          detail.isCorrect
                            ? "text-[var(--color-success)] font-bold"
                            : "text-[var(--color-danger)] font-bold"
                        }
                      >
                        {question.options[detail.userAnswerIndex]}
                      </span>
                    </div>
                    {!detail.isCorrect && (
                      <div className="flex items-center gap-2 text-[var(--color-muted)]/70">
                        <span className="w-20 text-xs uppercase font-bold">
                          Correct:
                        </span>
                        <span className="text-[var(--color-success)] font-bold">
                          {question.options[question.correctAnswerIndex]}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-muted)]/60 italic bg-[var(--color-muted)]/5 p-2 rounded">
                    💡 {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
