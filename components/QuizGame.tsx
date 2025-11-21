import React, { useState } from "react";
import { QuizQuestion, QuizResult } from "../types";
import { ProgressBar } from "./quiz/ProgressBar";
import { QuestionCard } from "./quiz/QuestionCard";

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  questions,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    { questionIndex: number; isCorrect: boolean; userAnswerIndex: number }[]
  >([]);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    setUserAnswers([
      ...userAnswers,
      {
        questionIndex: currentIndex,
        isCorrect,
        userAnswerIndex: selectedOption,
      },
    ]);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const score = userAnswers.filter((a) => a.isCorrect).length;
      onComplete({ score, total: questions.length, details: userAnswers });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar current={currentIndex} total={questions.length} />
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        isAnswered={isAnswered}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onOptionClick={handleOptionClick}
        onSubmitAnswer={handleSubmitAnswer}
        onNext={handleNext}
      />
    </div>
  );
};
