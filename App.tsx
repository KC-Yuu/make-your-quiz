import React, { useState, useCallback, useEffect } from 'react';
import { AppState, QuizQuestion, QuizResult } from './types';
import { FileUpload } from './components/FileUpload';
import { QuizGame } from './components/QuizGame';
import { Results } from './components/Results';
import { Processing } from './components/Processing';
import { ErrorScreen } from './components/ErrorScreen';
import { generateQuizFromContent } from './services/geminiService';
import { BrainCircuit, Trash2 } from 'lucide-react';
import { ApiKeyInput } from './components/ApiKeyInput';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.API_KEY_INPUT);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [requestCount, setRequestCount] = useState<number>(0);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setAppState(AppState.UPLOAD);

      // Load and check usage count
      const today = new Date().toISOString().split('T')[0];
      const usageDate = localStorage.getItem('gemini_usage_date');
      if (usageDate === today) {
        setRequestCount(Number(localStorage.getItem('gemini_usage_count')) || 0);
      } else {
        localStorage.setItem('gemini_usage_count', '0');
        localStorage.setItem('gemini_usage_date', today);
        setRequestCount(0);
      }
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    // Reset usage counter for new key
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('gemini_usage_count', '0');
    localStorage.setItem('gemini_usage_date', today);
    setRequestCount(0);
    setAppState(AppState.UPLOAD);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_usage_count');
    localStorage.removeItem('gemini_usage_date');
    setApiKey('');
    setRequestCount(0);
    setQuestions([]);
    setQuizResult(null);
    setErrorMessage('');
    setFileName('');
    setAppState(AppState.API_KEY_INPUT);
  };

  const handleFileProcess = useCallback(async (file: File) => {
    setAppState(AppState.PROCESSING);
    setFileName(file.name);
    try {
      const generatedQuestions = await generateQuizFromContent(file, apiKey, 'gemini-2.5-flash');
      setQuestions(generatedQuestions);
      setAppState(AppState.QUIZ);

      // Increment usage counter
      const newCount = requestCount + 1;
      setRequestCount(newCount);
      localStorage.setItem('gemini_usage_count', String(newCount));

    } catch (error: any) {
      console.error("Error generating quiz:", error);
      if (error.message === 'QUOTA_EXCEEDED') {
        setErrorMessage("Vous avez atteint votre quota d'API pour aujourd'hui. Veuillez réessayer demain.");
      } else {
        setErrorMessage(error.message || "Une erreur est survenue lors de la génération du quiz.");
      }
      setAppState(AppState.ERROR);
    }
  }, [apiKey, requestCount]);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setAppState(AppState.RESULTS);
  };

  const resetApp = () => {
    setQuestions([]);
    setQuizResult(null);
    setErrorMessage('');
    setFileName('');
    setAppState(AppState.UPLOAD);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">GenAI Quiz Master</h1>
          </div>
          <div className="flex items-center gap-4">
            {apiKey && appState !== AppState.API_KEY_INPUT && (
              <button
                  onClick={handleClearApiKey}
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
              >
                  <Trash2 className="h-4 w-4" />
                  Effacer la clé
              </button>
            )}
            {appState !== AppState.UPLOAD && appState !== AppState.API_KEY_INPUT && (
                <button 
                  onClick={resetApp}
                  className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Nouveau Quiz
                </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl">
          {appState === AppState.API_KEY_INPUT && (
            <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
          )}

          {appState === AppState.UPLOAD && (
            <FileUpload onFileSelected={handleFileProcess} />
          )}

          {appState === AppState.PROCESSING && (
            <Processing fileName={fileName} />
          )}

          {appState === AppState.QUIZ && questions.length > 0 && (
            <QuizGame questions={questions} onComplete={handleQuizComplete} />
          )}

          {appState === AppState.RESULTS && quizResult && (
            <Results result={quizResult} questions={questions} onRetry={resetApp} />
          )}

          {appState === AppState.ERROR && (
            <ErrorScreen message={errorMessage} onRetry={resetApp} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-slate-400 text-sm">
        <p>Propulsé par Google Gemini • Révisions intelligentes</p>
        {apiKey && (
            <p className="mt-2 text-xs">
                Requêtes API aujourd'hui : {requestCount} (estimation)
            </p>
        )}
      </footer>
    </div>
  );
};

export default App;
