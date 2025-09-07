import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageIcon } from './icons';

const Header: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-green-700">Crop Doctor AI</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-2 transition-all duration-300 hover:border-gray-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 focus-within:border-transparent">
                             <LanguageIcon />
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'hi')}
                                    className="appearance-none bg-transparent text-gray-700 py-2 pl-1 pr-8 leading-tight focus:outline-none cursor-pointer"
                                    aria-label="Select language"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="hi">हिन्दी</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;