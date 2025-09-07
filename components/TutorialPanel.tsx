import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { PlayIcon } from './icons';

const TutorialPanel: React.FC = () => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);

    const videoId = 'U1MWKAqLGMs';
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <aside className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('tutorialTitle')}</h2>
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {isPlaying ? (
                    <iframe
                        src={embedUrl}
                        title={t('tutorialVideoTitle')}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                ) : (
                    <button
                        onClick={handlePlay}
                        className="w-full h-full block group"
                        aria-label={t('tutorialVideoTitle')}
                    >
                        <img 
                            src={thumbnailUrl} 
                            alt="Video thumbnail showing how to use the app" 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors duration-300">
                            <div className="transform transition-transform duration-300 group-hover:scale-110">
                                <PlayIcon />
                            </div>
                            <p className="text-white font-semibold mt-2">{t('tutorialVideoTitle')}</p>
                        </div>
                    </button>
                )}
            </div>
        </aside>
    );
};

export default TutorialPanel;
