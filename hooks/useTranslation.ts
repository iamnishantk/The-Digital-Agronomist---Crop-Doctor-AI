import { useLanguage } from '../contexts/LanguageContext';

const translations = {
    en: {
        analyzeCropTitle: 'Analyze Your Crop Image',
        analyzeCropSubtitle: 'Upload an image of your crop and ask a question to get AI-powered advice and an edited image.',
        yourQuestionLabel: 'What is your question?',
        promptPlaceholder: 'e.g., "What disease is this?", "How can I improve soil health?", "Identify pests on these leaves."',
        tryOneOfThese: 'Or try one of these:',
        examplePrompt1: 'Identify any diseases on this plant.',
        examplePrompt2: 'Are there any nutrient deficiencies?',
        examplePrompt3: 'Add arrows pointing to the affected areas.',
        examplePrompt4: 'What are these insects and are they harmful?',
        analyzeButton: 'Analyze with Gemini',
        analyzingButton: 'Analyzing...',
        errorUpload: 'Please upload an image first.',
        errorQuestion: 'Please enter a question or a prompt.',
        footerText: '© {year} Crop Doctor AI. All rights reserved.',
        spinnerMessage: 'Gemini is analyzing your image...',
        uploaderText1: 'Click to upload',
        uploaderText2: 'or drag and drop',
        uploaderText3: 'PNG, JPG or WEBP',
        resultTitle: 'Analysis Result',
        resultCachedTitle: 'Analysis Result (from your history)',
        resultAdvice: 'AI-Powered Advice',
        resultProcessedImage: 'Processed Image',
        historyTitle: 'History',
        historyEmpty: 'Your analysis history will appear here.',
        historyDeleteItem: 'Delete item',
        // FIX: Add missing translation keys for TutorialPanel.
        tutorialTitle: 'How to Use',
        tutorialVideoTitle: 'Watch Tutorial',
    },
    es: {
        analyzeCropTitle: 'Analiza la Imagen de tu Cultivo',
        analyzeCropSubtitle: 'Sube una imagen de tu cultivo y haz una pregunta para obtener consejos de IA y una imagen editada.',
        yourQuestionLabel: '¿Cuál es tu pregunta?',
        promptPlaceholder: 'ej. "¿Qué enfermedad es esta?", "¿Cómo puedo mejorar la salud del suelo?", "Identifica las plagas en estas hojas."',
        tryOneOfThese: 'O prueba uno de estos:',
        examplePrompt1: 'Identifica cualquier enfermedad en esta planta.',
        examplePrompt2: '¿Hay alguna deficiencia de nutrientes?',
        examplePrompt3: 'Añade flechas que apunten a las áreas afectadas.',
        examplePrompt4: '¿Qué son estos insectos y son dañinos?',
        analyzeButton: 'Analizar con Gemini',
        analyzingButton: 'Analizando...',
        errorUpload: 'Por favor, sube una imagen primero.',
        errorQuestion: 'Por favor, introduce una pregunta o instrucción.',
        footerText: '© {year} Crop Doctor AI. Todos los derechos reservados.',
        spinnerMessage: 'Gemini está analizando tu imagen...',
        uploaderText1: 'Haz clic para subir',
        uploaderText2: 'o arrastra y suelta',
        uploaderText3: 'PNG, JPG o WEBP',
        resultTitle: 'Resultado del Análisis',
        resultCachedTitle: 'Resultado del Análisis (de tu historial)',
        resultAdvice: 'Consejos de la IA',
        resultProcessedImage: 'Imagen Procesada',
        historyTitle: 'Historial',
        historyEmpty: 'Tu historial de análisis aparecerá aquí.',
        historyDeleteItem: 'Eliminar elemento',
        // FIX: Add missing translation keys for TutorialPanel.
        tutorialTitle: 'Cómo Usar',
        tutorialVideoTitle: 'Ver Tutorial',
    },
    fr: {
        analyzeCropTitle: "Analysez l'image de votre culture",
        analyzeCropSubtitle: "Téléchargez une image de votre culture et posez une question pour obtenir des conseils basés sur l'IA et une image modifiée.",
        yourQuestionLabel: 'Quelle est votre question ?',
        promptPlaceholder: 'ex. "Quelle est cette maladie ?", "Comment puis-je améliorer la santé du sol ?", "Identifiez les nuisibles sur ces feuilles."',
        tryOneOfThese: "Ou essayez l'une de ces options :",
        examplePrompt1: 'Identifiez les maladies sur cette plante.',
        examplePrompt2: 'Y a-t-il des carences nutritionnelles ?',
        examplePrompt3: 'Ajoutez des flèches pointant vers les zones affectées.',
        examplePrompt4: 'Quels sont ces insectes et sont-ils nuisibles ?',
        analyzeButton: 'Analyser avec Gemini',
        analyzingButton: 'Analyse en cours...',
        errorUpload: "Veuillez d'abord télécharger une image.",
        errorQuestion: "Veuillez saisir une question ou une instruction.",
        footerText: '© {year} Crop Doctor AI. Tous droits réservés.',
        spinnerMessage: 'Gemini analyse votre image...',
        uploaderText1: 'Cliquez pour télécharger',
        uploaderText2: 'ou glissez-déposez',
        uploaderText3: 'PNG, JPG ou WEBP',
        resultTitle: "Résultat de l'analyse",
        resultCachedTitle: "Résultat de l'analyse (de votre historique)",
        resultAdvice: "Conseils de l'IA",
        resultProcessedImage: 'Image traitée',
        historyTitle: 'Historique',
        historyEmpty: "Votre historique d'analyse apparaîtra ici.",
        historyDeleteItem: "Supprimer l'élément",
        // FIX: Add missing translation keys for TutorialPanel.
        tutorialTitle: 'Comment Utiliser',
        tutorialVideoTitle: 'Voir le Tutoriel',
    },
    hi: {
        analyzeCropTitle: 'अपनी फसल की छवि का विश्लेषण करें',
        analyzeCropSubtitle: 'अपनी फसल की एक छवि अपलोड करें और एआई-संचालित सलाह और एक संपादित छवि प्राप्त करने के लिए एक प्रश्न पूछें।',
        yourQuestionLabel: 'आपका क्या प्रश्न है?',
        promptPlaceholder: 'उदा., "यह कौन सी बीमारी है?", "मैं मिट्टी के स्वास्थ्य में सुधार कैसे कर सकता हूं?", "इन पत्तियों पर कीटों की पहचान करें।"',
        tryOneOfThese: 'या इनमें से कोई एक आज़माएँ:',
        examplePrompt1: 'इस पौधे पर किसी भी बीमारी की पहचान करें।',
        examplePrompt2: 'क्या कोई पोषक तत्वों की कमी है?',
        examplePrompt3: 'प्रभावित क्षेत्रों की ओर इशारा करते हुए तीर जोड़ें।',
        examplePrompt4: 'ये कीड़े क्या हैं और क्या ये हानिकारक हैं?',
        analyzeButton: 'जेमिनी के साथ विश्लेषण करें',
        analyzingButton: 'विश्लेषण हो रहा है...',
        errorUpload: 'कृपया पहले एक छवि अपलोड करें।',
        errorQuestion: 'कृपया एक प्रश्न या निर्देश दर्ज करें।',
        footerText: '© {year} क्रॉप डॉक्टर एआई। सर्वाधिकार सुरक्षित।',
        spinnerMessage: 'जेमिनी आपकी छवि का विश्लेषण कर रहा है...',
        resultTitle: 'विश्लेषण परिणाम',
        resultCachedTitle: 'विश्लेषण परिणाम (आपके इतिहास से)',
        resultAdvice: 'एआई-संचालित सलाह',
        resultProcessedImage: 'संसाधित छवि',
        historyTitle: 'इतिहास',
        historyEmpty: 'आपका विश्लेषण इतिहास यहां दिखाई देगा।',
        historyDeleteItem: 'आइटम हटाएं',
        // FIX: Add missing translation keys for TutorialPanel.
        tutorialTitle: 'कैसे उपयोग करें',
        tutorialVideoTitle: 'ट्यूटोरियल देखें',
    }
};

type TranslationKey = keyof typeof translations.en;

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key: TranslationKey, replacements?: Record<string, string | number>): string => {
        let translation = (translations[language] && translations[language][key]) || translations.en[key];

        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                const regex = new RegExp(`{${rKey}}`, 'g');
                translation = translation.replace(regex, String(replacements[rKey]));
            });
        }

        return translation;
    };

    return { t };
};