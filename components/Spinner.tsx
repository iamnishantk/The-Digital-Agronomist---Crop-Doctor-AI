
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Spinner: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-green-800 font-medium">{t('spinnerMessage')}</p>
        </div>
    );
};

export default Spinner;
