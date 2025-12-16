import React from 'react';
import { LanguageCode } from '../types';

interface Props {
  currentLang: LanguageCode;
  onChange: (lang: LanguageCode) => void;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'en', label: 'Eng', flag: '🇬🇧' },
  { code: 'ru', label: 'Рус', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC<Props> = ({ currentLang, onChange }) => {
  return (
    <div className="flex space-x-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`
            px-3 py-1.5 rounded-full text-sm font-medium transition-all
            ${currentLang === lang.code 
              ? 'bg-orange-500 text-white shadow-md' 
              : 'text-gray-500 hover:bg-gray-100'}
          `}
        >
          <span className="mr-1">{lang.flag}</span>
          <span className={lang.code === 'th' ? 'font-thai' : lang.code === 'zh' ? 'font-zh' : ''}>
            {lang.label}
          </span>
        </button>
      ))}
    </div>
  );
};