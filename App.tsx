import React, { useState, useCallback, useEffect } from "react";
import { AppState, QuizQuestion, QuizResult } from "./types";
import { FileUpload } from "./components/FileUpload";
import { QuizGame } from "./components/QuizGame";
import { Results } from "./components/Results";
import { Processing } from "./components/Processing";
import { ErrorScreen } from "./components/ErrorScreen";
import { generateQuizFromContent } from "./services/geminiService";
import { ApiKeyInput } from "./components/ApiKeyInput";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StepIndicator } from "./components/StepIndicator";

const stepCopy: Record<AppState, { title: string; helper: string }> = {
  [AppState.API_KEY_INPUT]: {
    title: "Connectez votre clé Gemini",
    helper: "Ajoutez votre clé API pour rendre le générateur disponible.",
  },
  [AppState.UPLOAD]: {
    title: "Importez votre fichier",
    helper: "Déposez un PDF ou un Markdown pour créer un quiz personnalisé.",
  },
  [AppState.PROCESSING]: {
    title: "Analyse en cours",
    helper: "L'IA lit votre document et prépare les questions.",
  },
  [AppState.QUIZ]: {
    title: "Répondez au quiz",
    helper: "Choisissez la bonne réponse pour chaque question proposée.",
  },
  [AppState.RESULTS]: {
    title: "Résultats disponibles",
    helper: "Analysez vos réponses et identifiez les notions à revoir.",
  },
  [AppState.ERROR]: {
    title: "Un imprévu est survenu",
    helper: "Relancez le processus ou vérifiez votre fichier.",
  },
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.API_KEY_INPUT);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [requestCount, setRequestCount] = useState<number>(0);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("gemini_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setAppState(AppState.UPLOAD);

      const today = new Date().toISOString().split("T")[0];
      const usageDate = localStorage.getItem("gemini_usage_date");
      if (usageDate === today) {
        setRequestCount(
          Number(localStorage.getItem("gemini_usage_count")) || 0
        );
      } else {
        localStorage.setItem("gemini_usage_count", "0");
        localStorage.setItem("gemini_usage_date", today);
        setRequestCount(0);
      }
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("gemini_usage_count", "0");
    localStorage.setItem("gemini_usage_date", today);
    setRequestCount(0);
    setAppState(AppState.UPLOAD);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("gemini_api_key");
    localStorage.removeItem("gemini_usage_count");
    localStorage.removeItem("gemini_usage_date");
    setApiKey("");
    setRequestCount(0);
    setQuestions([]);
    setQuizResult(null);
    setErrorMessage("");
    setFileName("");
    setAppState(AppState.API_KEY_INPUT);
  };

  const handleFileProcess = useCallback(
    async (file: File) => {
      setAppState(AppState.PROCESSING);
      setFileName(file.name);
      try {
        const generatedQuestions = await generateQuizFromContent(file, apiKey);
        setQuestions(generatedQuestions);
        setAppState(AppState.QUIZ);

        const newCount = requestCount + 1;
        setRequestCount(newCount);
        localStorage.setItem("gemini_usage_count", String(newCount));
      } catch (error: any) {
        console.error("Error generating quiz:", error);
        if (error.message === "QUOTA_EXCEEDED") {
          setErrorMessage(
            "Vous avez atteint votre quota d'API pour aujourd'hui. Veuillez réessayer demain."
          );
        } else {
          setErrorMessage(
            error.message ||
              "Une erreur est survenue lors de la génération du quiz."
          );
        }
        setAppState(AppState.ERROR);
      }
    },
    [apiKey, requestCount]
  );

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setAppState(AppState.RESULTS);
  };

  const resetApp = () => {
    setQuestions([]);
    setQuizResult(null);
    setErrorMessage("");
    setFileName("");
    setAppState(AppState.UPLOAD);
  };

  const { title: stepTitle, helper: stepHelper } = stepCopy[appState];

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_left,var(--color-primary),var(--color-secondary))] text-[var(--color-foreground)]">
      <Header
        apiKey={apiKey}
        appState={appState}
        onClearApiKey={handleClearApiKey}
        onNewQuiz={resetApp}
      />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl mx-auto">
          <StepIndicator title={stepTitle} helper={stepHelper} />

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
            <Results
              result={quizResult}
              questions={questions}
              onRetry={resetApp}
            />
          )}
          {appState === AppState.ERROR && (
            <ErrorScreen message={errorMessage} onRetry={resetApp} />
          )}
        </div>
      </main>

      <Footer apiKey={apiKey} requestCount={requestCount} />
    </div>
  );
};

export default App;
