# Make Your Quiz

**Make Your Quiz** est une application web interactive qui transforme vos documents en quiz personnalisés à l'aide de l'API Gemini de Google. C'est l'outil idéal pour les étudiants, les enseignants ou toute personne souhaitant réviser et apprendre de manière ludique à partir de ses propres supports de cours.

## Fonctionnalités

- **Génération de Quiz par IA :** Importez un fichier (PDF, TXT, etc.) et laissez l'IA créer un quiz pertinent en quelques secondes.
- **Interface de Jeu Interactive :** Répondez aux questions et obtenez un feedback instantané.
- **Visualisation des Résultats :** Consultez votre score, le temps de réponse et une analyse détaillée de vos performances.
- **Stockage Local de la Clé API :** Votre clé API Gemini est stockée de manière sécurisée dans votre navigateur pour une utilisation simplifiée.
- **Suivi de l'Utilisation :** Gardez un œil sur le nombre de requêtes API que vous effectuez.

## Comment ça marche ?

1.  **Entrez votre Clé API :** Au premier lancement, l'application vous demande votre clé API Gemini.
2.  **Importez votre Document :** Sélectionnez et envoyez le fichier à partir duquel vous souhaitez générer le quiz.
3.  **Jouez au Quiz :** Répondez à la série de questions à choix multiples générée par l'IA.
4.  **Analysez vos Résultats :** Une fois le quiz terminé, une page de résultats s'affiche avec votre score et d'autres statistiques.

## Démarrage Rapide

Suivez ces étapes pour lancer l'application sur votre machine locale.

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- Une clé API Gemini. Vous pouvez en obtenir une sur [Google AI Studio](https://aistudio.google.com/app/apikey).

> **Note sur le modèle et les coûts :** Ce projet utilise le modèle `gemini-2.5-flash`. L'API Google Gemini offre un quota gratuit généreux, incluant jusqu'à 250 requêtes par jour, ce qui rend cette application entièrement gratuite pour un usage personnel et éducatif.

### Installation et Lancement

1.  **Clonez le dépôt** (ou téléchargez les fichiers) :
    ```bash
    git clone git@github.com:KC-Yuu/make-your-quiz.git
    cd make-your-quiz
    ```

2.  **Installez les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancez l'application en mode développement** :
    ```bash
    npm run dev
    ```

4.  Ouvrez votre navigateur et allez à l'adresse `http://localhost:5173` (ou l'URL indiquée dans votre terminal). L'application vous demandera de saisir votre clé API Gemini.

5.  **Générez votre Quiz :** Une fois votre clé API saisie, vous pouvez commencer à importer un document (PDF, TXT, etc.) et à le convertir en quiz.

## Scripts Disponibles

- `npm run dev` : Lance le serveur de développement.
- `npm run build` : Compile l'application pour la production.
- `npm run preview` : Lance un serveur local pour prévisualiser la version de production.

## Technologies Utilisées

- **React** avec **TypeScript**
- **Vite** comme outil de build
- **Google Gemini API** (`@google/genai`) pour la génération de contenu IA
- **Tailwind CSS** pour le style
- **Recharts** pour la visualisation des données
- **Lucide React** pour les icônes