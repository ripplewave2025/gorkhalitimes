'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown, Share2, Bookmark, CheckCircle } from 'lucide-react';
import { NewsArticle } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation, translations } from '@/lib/translations';

interface SwipeCardProps {
    article: NewsArticle;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
}

const categoryBadgeClass: Record<string, string> = {
    politics: 'badge-politics', diaspora: 'badge-diaspora', culture: 'badge-culture',
    sports: 'badge-sports', business: 'badge-business',
};

export default function SwipeCard({ article, onSwipeUp, onSwipeDown }: SwipeCardProps) {
    const { language } = useLanguage();
    const [saved, setSaved] = useState(false);
    const headline = getTranslation(article.headline, language);
    const summary = getTranslation(article.summary, language);
    const categoryLabel = translations.categories[article.category as keyof typeof translations.categories]?.[language] || article.category;

    return (
        <div className="relative w-full max-w-lg mx-auto h-[70vh] rounded-3xl overflow-hidden glass smooth-transition swipe-card">
            <div className="absolute inset-0">
                <Image src={article.imageUrl} alt={headline} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryBadgeClass[article.category] || 'bg-gray-600'}`}>
                        {categoryLabel}
                    </span>
                    {article.factChecked && (
                        <span className="inline-flex items-center gap-1 ml-2 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <CheckCircle size={12} />{getTranslation(translations.common.factChecked, language)}
                        </span>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{headline}</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{summary}</p>

                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{article.timeAgo}</span>
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigator.share?.({ title: headline, text: summary })} className="p-2 rounded-full hover:bg-white/10 smooth-transition">
                            <Share2 size={20} className="text-gray-300" />
                        </button>
                        <button onClick={() => setSaved(!saved)} className="p-2 rounded-full hover:bg-white/10 smooth-transition">
                            <Bookmark size={20} className={saved ? 'text-blue-400 fill-blue-400' : 'text-gray-300'} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                <button onClick={onSwipeUp} className="p-3 rounded-full glass hover:bg-white/20 smooth-transition"><ChevronUp size={24} className="text-white" /></button>
                <button onClick={onSwipeDown} className="p-3 rounded-full glass hover:bg-white/20 smooth-transition"><ChevronDown size={24} className="text-white" /></button>
            </div>
        </div>
    );
}
