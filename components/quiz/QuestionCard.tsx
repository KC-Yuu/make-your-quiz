import React from "react";
import { QuizQuestion } from "../../types";
import { OptionButton } from "./OptionButton";
import { ExplanationBox } from "./ExplanationBox";

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOption: number | null;
  isAnswered: boolean;
  currentIndex: number;
  totalQuestions: number;
  onOptionClick: (index: number) => void;
  onSubmitAnswer: () => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  isAnswered,
  currentIndex,
  totalQuestions,
  onOptionClick,
  onSubmitAnswer,
  onNext,
}) => {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden">
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              index={index}
              isSelected={selectedOption === index}
              isAnswered={isAnswered}
              isCorrect={index === question.correctAnswerIndex}
              isSelectedWrong={index === selectedOption && isAnswered}
              onClick={onOptionClick}
            />
          ))}
        </div>

        <ExplanationBox
          explanation={question.explanation}
          isVisible={isAnswered}
        />
      </div>

      <div className="p-4 sm:px-8 flex justify-end">
        {!isAnswered ? (
          <button
            onClick={onSubmitAnswer}
            disabled={selectedOption === null}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-[var(--color-foreground)] font-bold py-2.5 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-foreground)] font-bold py-2.5 px-6 rounded-md flex items-center gap-2 cursor-pointer transition-colors"
          >
            {currentIndex < totalQuestions - 1
              ? "Question Suivante"
              : "Voir les Résultats"}
          </button>
        )}
      </div>
    </div>
  );
};
