'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations, sampleNews, getTranslation } from '@/lib/translations';
import LanguageToggle from '@/components/LanguageToggle';

type Category = 'all' | 'politics' | 'diaspora' | 'culture' | 'sports' | 'business';

const categoryBadgeClass: Record<string, string> = {
    politics: 'badge-politics', diaspora: 'badge-diaspora', culture: 'badge-culture',
    sports: 'badge-sports', business: 'badge-business',
};

export default function ExplorePage() {
    const { language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const categoriesT = translations.categories;
    const categories: Category[] = ['all', 'politics', 'diaspora', 'culture', 'sports', 'business'];

    const filteredNews = sampleNews.filter((article) => {
        if (activeCategory !== 'all' && article.category !== activeCategory) return false;
        if (searchQuery) {
            const headline = getTranslation(article.headline, language).toLowerCase();
            return headline.includes(searchQuery.toLowerCase());
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-brand-dark">
            <header className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
                            <TrendingUp size={20} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-white">{translations.nav.explore[language]}</h1>
                    </div>
                    <LanguageToggle />
                </div>
            </header>

            <div className="pt-20 px-4 max-w-lg mx-auto">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'en' ? 'Search news...' : language === 'ne' ? 'समाचार खोज्नुहोस्...' : 'समाचार खोजें...'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap smooth-transition ${activeCategory === cat ? 'bg-blue-500 text-white' : 'glass text-gray-300 hover:text-white'}`}
                        >{categoriesT[cat][language]}</button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredNews.map((article) => (
                        <article key={article.id} className="glass rounded-2xl overflow-hidden smooth-transition hover:scale-[1.02]">
                            <div className="flex gap-3 p-3">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={article.imageUrl} alt={getTranslation(article.headline, language)} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${categoryBadgeClass[article.category]}`}>
                                            {categoriesT[article.category as keyof typeof categoriesT][language]}
                                        </span>
                                        {article.factChecked && <CheckCircle size={12} className="text-green-400" />}
                                    </div>
                                    <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">{getTranslation(article.headline, language)}</h3>
                                    <div className="flex items-center gap-1 text-gray-400 text-xs"><Clock size={12} /><span>{article.timeAgo}</span></div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
