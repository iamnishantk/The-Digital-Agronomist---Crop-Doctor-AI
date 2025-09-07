import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'es' | 'fr' | 'hi';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    getLanguageName: (langCode: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageNames: Record<Language, string> = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    hi: 'Hindi'
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const getLanguageName = useCallback((langCode: Language): string => {
        return languageNames[langCode] || 'English';
    }, []);

    const value = { language, setLanguage, getLanguageName };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};