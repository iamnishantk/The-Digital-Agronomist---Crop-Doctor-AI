import React from 'react';
import type { GeminiAnalysisResult } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ResultDisplayProps {
    result: GeminiAnalysisResult;
    title: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, title }) => {
    const { t } = useTranslation();

    return (
        <div className="mt-8 w-full bg-white p-6 sm:p-8 rounded-lg shadow-xl">
            <div className="mb-6 border-b pb-3">
                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {result.text && (
                    <div className="prose prose-green max-w-none text-gray-700">
                        <h3 className="font-semibold text-lg text-green-800">{t('resultAdvice')}</h3>
                        {result.text.split('\n').map((paragraph, index) => {
                            if (paragraph.trim() === '') return null;
                            return <p key={index} className="mb-4">{paragraph}</p>;
                        })}
                    </div>
                )}
                {result.image && (
                     <div>
                        <h3 className="font-semibold text-lg text-green-800 mb-2">{t('resultProcessedImage')}</h3>
                        <img 
                            src={result.image} 
                            alt="Processed crop" 
                            className="rounded-lg border border-gray-200 shadow-sm w-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;