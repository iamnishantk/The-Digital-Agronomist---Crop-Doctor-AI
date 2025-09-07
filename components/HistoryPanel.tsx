import React from 'react';
import type { HistoryItem } from '../types';
import { ClockIcon, TrashIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';

interface HistoryPanelProps {
    history: HistoryItem[];
    onSelectItem: (id: string) => void;
    onDeleteItem: (id: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelectItem, onDeleteItem }) => {
    const { t } = useTranslation();

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <aside className="bg-white rounded-lg shadow-xl p-6 self-start sticky top-8 flex flex-col max-h-[calc(100vh-4rem)]">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="flex items-center">
                    <ClockIcon />
                    <h2 className="text-xl font-bold text-gray-800">{t('historyTitle')}</h2>
                </div>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 flex-grow min-h-0">
                {history.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">{t('historyEmpty')}</p>
                ) : (
                    history.map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => onSelectItem(item.id)}
                            className="group flex items-start p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-colors border border-transparent hover:border-green-200 relative"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && onSelectItem(item.id)}
                        >
                            <img 
                                src={item.imagePreview} 
                                alt="Analysis thumbnail" 
                                className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"
                            />
                            <div className="overflow-hidden flex-grow">
                                <p className="text-sm font-semibold text-gray-700 line-clamp-2" title={item.prompt}>{item.prompt}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatDate(item.timestamp)}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteItem(item.id);
                                }}
                                className="absolute top-1 right-1 p-1.5 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
                                aria-label={t('historyDeleteItem')}
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
};

export default HistoryPanel;