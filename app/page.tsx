'use client';

import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import SwipeCard from '@/components/SwipeCard';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/lib/LanguageContext';
import { sampleNews, translations } from '@/lib/translations';

export default function HomePage() {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSwipeUp = () => {
        if (currentIndex < sampleNews.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSwipeDown = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const appName = translations.common.appName[language];

    return (
        <div className="min-h-screen bg-brand-dark">
            <header className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Newspaper size={20} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold gradient-text">{appName}</h1>
                    </div>
                    <LanguageToggle />
                </div>
            </header>

            <div className="pt-20 px-4">
                <div className="flex justify-center gap-1.5 mb-4">
                    {sampleNews.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 rounded-full smooth-transition ${idx === currentIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-gray-600'
                                }`}
                        />
                    ))}
                </div>

                <SwipeCard
                    article={sampleNews[currentIndex]}
                    onSwipeUp={handleSwipeUp}
                    onSwipeDown={handleSwipeDown}
                />

                <p className="text-center text-gray-500 text-xs mt-4 animate-pulse">
                    {language === 'en' && '↑ Swipe up for next · Swipe down for previous ↓'}
                    {language === 'ne' && '↑ अर्कोको लागि माथि स्वाइप · अघिल्लोको लागि तल ↓'}
                    {language === 'hi' && '↑ अगले के लिए ऊपर स्वाइप · पिछले के लिए नीचे ↓'}
                </p>
            </div>
        </div>
    );
}
