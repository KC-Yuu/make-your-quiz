import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const fileToGenerativePart = async (
  file: File
): Promise<
  { inlineData: { data: string; mimeType: string } } | { text: string }
> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file.type === "application/pdf") {
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve({
          inlineData: {
            data: base64String,
            mimeType: "application/pdf",
          },
        });
      };
      reader.readAsDataURL(file);
    } else {
      reader.onloadend = () => {
        resolve({
          text: reader.result as string,
        });
      };
      reader.readAsText(file);
    }
    reader.onerror = reject;
  });
};

export const generateQuizFromContent = async (
  file: File,
  apiKey: string
): Promise<QuizQuestion[]> => {
  if (!apiKey) {
    throw new Error("Clé API manquante. Veuillez la fournir pour continuer.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const filePart = await fileToGenerativePart(file);

  const prompt = `
    Tu es un professeur expert. Analyse le document fourni ci-joint.
    Crée un quiz à choix multiples (QCM) complet et pertinent pour aider un étudiant à réviser ce contenu.
    
    Règles :
    1. Génère exactement 10 questions.
    2. Les questions doivent couvrir les concepts clés du document.
    3. Pour chaque question, fournis 4 choix de réponse.
    4. Indique clairement l'index de la bonne réponse (0-3).
    5. Ajoute une courte explication pédagogique pour la bonne réponse.
    6. IMPORTANT: Le quiz doit être dans la MÊME LANGUE que le document source.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [filePart, { text: prompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "L'intitulé de la question",
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Liste de 4 choix de réponse possibles",
              },
              correctAnswerIndex: {
                type: Type.INTEGER,
                description:
                  "L'index (0-3) de la réponse correcte dans le tableau options",
              },
              explanation: {
                type: Type.STRING,
                description:
                  "Une brève explication de pourquoi c'est la bonne réponse",
              },
            },
            required: [
              "question",
              "options",
              "correctAnswerIndex",
              "explanation",
            ],
          },
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as QuizQuestion[];
    } else {
      throw new Error("Aucune réponse générée par le modèle.");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.toString().includes("429")) {
      throw new Error("QUOTA_EXCEEDED");
    }
    throw new Error(
      "Impossible de générer le quiz. Vérifiez votre clé d'API, le fichier, ou réessayez plus tard."
    );
  }
};
