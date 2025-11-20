import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../types';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionIndex: number, isCorrect: boolean, userAnswerIndex: number }[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    const newAnswer = {
      questionIndex: currentIndex,
      isCorrect,
      userAnswerIndex: selectedOption
    };

    setUserAnswers([...userAnswers, newAnswer]);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Calculate final score
      const score = userAnswers.filter(a => a.isCorrect).length;
      onComplete({
        score,
        total: questions.length,
        details: userAnswers
      });
    }
  };

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span>Progression</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 leading-tight">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = "border-slate-200 hover:bg-slate-50 hover:border-indigo-300";
              let icon = null;

              if (isAnswered) {
                if (index === currentQuestion.correctAnswerIndex) {
                  buttonStyle = "bg-green-50 border-green-500 text-green-800";
                  icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
                } else if (index === selectedOption) {
                  buttonStyle = "bg-red-50 border-red-500 text-red-800";
                  icon = <XCircle className="w-5 h-5 text-red-600" />;
                } else {
                  buttonStyle = "border-slate-100 opacity-50";
                }
              } else if (selectedOption === index) {
                buttonStyle = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                >
                  <span className="font-medium text-lg">{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-fade-in">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm uppercase mb-1">Explication</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-100 flex justify-end">
          {!isAnswered ? (
             <button
               onClick={handleSubmitAnswer}
               disabled={selectedOption === null}
               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               Valider
             </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              {currentIndex < questions.length - 1 ? 'Question Suivante' : 'Voir les Résultats'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
