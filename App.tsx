import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Spinner from './components/Spinner';
import HistoryPanel from './components/HistoryPanel';
import TutorialPanel from './components/TutorialPanel';
import { WandIcon } from './components/icons';
import { analyzeImageWithGemini } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { resizeImage } from './utils/imageUtils';
import { calculateImageHash } from './utils/cryptoUtils';
import type { GeminiAnalysisResult, HistoryItem } from './types';
import { useTranslation } from './hooks/useTranslation';
import { useLanguage } from './contexts/LanguageContext';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCachedResult, setIsCachedResult] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<GeminiAnalysisResult | null>(null);
    const { t } = useTranslation();
    const { language, getLanguageName } = useLanguage();
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('farmhand-history', []);

    const examplePrompts = useMemo(() => [
        t('examplePrompt1'),
        t('examplePrompt2'),
        t('examplePrompt3'),
        t('examplePrompt4'),
    ], [t]);

    const handleImageUpload = (file: File, previewUrl: string) => {
        setImageFile(file);
        setImagePreview(previewUrl);
        setPrompt('');
        setResult(null);
        setError(null);
        setIsCachedResult(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            setError(t('errorUpload'));
            return;
        }
        if (!prompt.trim()) {
            setError(t('errorQuestion'));
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);
        setIsCachedResult(false);

        try {
            const imageHash = await calculateImageHash(imageFile);
            const normalizedPrompt = prompt.trim().toLowerCase();

            const cachedItem = history.find(item => 
                item.imageHash === imageHash && 
                item.prompt.trim().toLowerCase() === normalizedPrompt
            );

            if (cachedItem) {
                setResult(cachedItem.result);
                setIsCachedResult(true);
                
                const updatedItem = { ...cachedItem, timestamp: new Date().toISOString() };
                setHistory(prev => [updatedItem, ...prev.filter(h => h.id !== cachedItem.id)]);
                
                setIsLoading(false);
                return;
            }

            const languageName = getLanguageName(language);
            const fullPrompt = `Please respond in ${languageName}. Here is the user's question: "${prompt}"`;

            const MAX_HISTORY_ITEMS = 20;
            const MAX_IMAGE_DIMENSION = 800;

            const { base64, mimeType } = await fileToBase64(imageFile);
            const analysisResult = await analyzeImageWithGemini(base64, mimeType, fullPrompt);
            setResult(analysisResult);

            const resizedPreviewPromise = resizeImage(imagePreview!, MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION);
            const resizedResultImagePromise = analysisResult.image 
                ? resizeImage(analysisResult.image, MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION) 
                : Promise.resolve(null);
            
            const [resizedPreview, resizedResultImage] = await Promise.all([
                resizedPreviewPromise,
                resizedResultImagePromise
            ]);

            const newHistoryItem: HistoryItem = {
                id: `${new Date().toISOString()}-${Math.random()}`,
                timestamp: new Date().toISOString(),
                imagePreview: resizedPreview,
                prompt: prompt,
                result: {
                    ...analysisResult,
                    image: resizedResultImage,
                },
                imageHash: imageHash
            };
            
            setHistory(prevHistory => {
                const updatedHistory = [newHistoryItem, ...prevHistory];
                return updatedHistory.slice(0, MAX_HISTORY_ITEMS);
            });

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSelectHistoryItem = (id: string) => {
        const item = history.find(h => h.id === id);
        if (item) {
            setImageFile(null); 
            setImagePreview(item.imagePreview);
            setPrompt(item.prompt);
            setResult(item.result);
            setIsCachedResult(true);
            setError(null);
            setIsLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleDeleteHistoryItem = (id: string) => {
        setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-green-50/50">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{t('analyzeCropTitle')}</h2>
                                <p className="text-gray-600 mt-2">{t('analyzeCropSubtitle')}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <ImageUploader onImageUpload={handleImageUpload} imagePreview={imagePreview} />

                                {imagePreview && (
                                    <div>
                                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('yourQuestionLabel')}
                                        </label>
                                        <textarea
                                            id="prompt"
                                            rows={3}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition"
                                            placeholder={t('promptPlaceholder')}
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <div className="mt-4">
                                            <p className="text-xs font-medium text-gray-500 mb-2">{t('tryOneOfThese')}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {examplePrompts.map((example) => (
                                                    <button
                                                        key={example}
                                                        type="button"
                                                        onClick={() => setPrompt(example)}
                                                        className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                                        disabled={isLoading}
                                                    >
                                                        {example}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {error && <div className="text-red-600 bg-red-100 p-3 rounded-md text-sm font-medium text-center">{error}</div>}

                                <div className="text-center pt-2">
                                    <button
                                        type="submit"
                                        disabled={!imageFile || !prompt || isLoading}
                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                                    >
                                        {isLoading ? (
                                            t('analyzingButton')
                                        ) : (
                                            <>
                                                <WandIcon />
                                                {t('analyzeButton')}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {isLoading && (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        )}

                        {result && <ResultDisplay result={result} title={isCachedResult ? t('resultCachedTitle') : t('resultTitle')} />}
                    </div>
                    <div className="lg:col-span-1 space-y-8">
                        <TutorialPanel />
                        <HistoryPanel 
                            history={history}
                            onSelectItem={handleSelectHistoryItem}
                            onDeleteItem={handleDeleteHistoryItem}
                        />
                    </div>
                 </div>
            </main>
             <footer className="text-center py-6 px-4">
                <p className="text-sm text-gray-500">{t('footerText', { year: new Date().getFullYear() })}</p>
            </footer>
        </div>
    );
};

export default App;