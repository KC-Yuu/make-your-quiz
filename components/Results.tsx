import React, { useEffect, useState } from 'react';
import { QuizQuestion, QuizResult } from '../types';
import { Trophy, RotateCcw, Award, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultsProps {
  result: QuizResult;
  questions: QuizQuestion[];
  onRetry: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, questions, onRetry }) => {
  const percentage = Math.round((result.score / result.total) * 100);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (percentage >= 70) {
      setShowConfetti(true);
    }
  }, [percentage]);

  const getFeedback = () => {
    if (percentage === 100) return { text: "Excellent ! Maîtrise parfaite.", color: "text-green-600", icon: <Trophy className="w-12 h-12 text-yellow-500" /> };
    if (percentage >= 70) return { text: "Très bien ! Vous avez compris l'essentiel.", color: "text-indigo-600", icon: <Award className="w-12 h-12 text-indigo-500" /> };
    if (percentage >= 40) return { text: "Pas mal, mais quelques révisions sont nécessaires.", color: "text-orange-600", icon: <Award className="w-12 h-12 text-orange-500" /> };
    return { text: "Il faut revoir le cours.", color: "text-red-600", icon: <AlertTriangle className="w-12 h-12 text-red-500" /> };
  };

  const feedback = getFeedback();

  const chartData = [
    { name: 'Correct', value: result.score },
    { name: 'Incorrect', value: result.total - result.score },
  ];
  const COLORS = ['#16a34a', '#dc2626'];

  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-50 rounded-full animate-bounce-slow">
              {feedback.icon}
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Score: {percentage}%
          </h2>
          <p className={`text-lg font-medium ${feedback.color} mb-8`}>
            {feedback.text} ({result.score}/{result.total})
          </p>

          {/* Chart Section */}
          <div className="h-48 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <button
            onClick={onRetry}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Charger un autre cours
          </button>
        </div>

        {/* Detailed Review */}
        <div className="bg-slate-50 p-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Correction détaillée</h3>
          <div className="space-y-4">
            {result.details.map((detail, index) => {
              const question = questions[detail.questionIndex];
              return (
                <div key={index} className={`p-4 rounded-xl border ${detail.isCorrect ? 'bg-white border-green-200' : 'bg-white border-red-200'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`font-bold text-sm px-2 py-0.5 rounded ${detail.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      Q{index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 mb-2">{question.question}</p>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2 text-slate-500">
                          <span className="w-20 text-xs uppercase font-bold">Votre réponse:</span>
                          <span className={detail.isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                            {question.options[detail.userAnswerIndex]}
                          </span>
                        </div>
                        {!detail.isCorrect && (
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="w-20 text-xs uppercase font-bold">Correct:</span>
                            <span className="text-green-600 font-medium">
                              {question.options[question.correctAnswerIndex]}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
                        💡 {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
