'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import AlertsBanner from '@/components/AlertsBanner';
import LanguageToggle from '@/components/LanguageToggle';
import StoryCard from '@/components/StoryCard';
import { storyClusters } from '@/data/fixtures/stories';
import { appCopy, categoryLabels } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { StoryCategory } from '@/types';

const categories: Array<'all' | StoryCategory> = ['all', 'public-safety', 'civic', 'education', 'economy', 'community'];

export default function HomePage() {
    const { language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<'all' | StoryCategory>('all');
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredStories = storyClusters.filter((story) => {
        if (activeCategory === 'all') {
            return true;
        }

        return story.category === activeCategory;
    });

    useEffect(() => {
        if (currentIndex >= filteredStories.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex, filteredStories.length]);

    const story = filteredStories[currentIndex] ?? filteredStories[0];

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-sm md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                            <MapPin size={14} />
                            gorkhayai.com
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{getLocalizedText(appCopy.feed.eyebrow, language)}</p>
                            <h1 className="mt-2 text-3xl font-semibold text-brand-ink">{getLocalizedText(appCopy.brand.appName, language)}</h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.brand.tagline, language)}</p>
                        </div>
                    </div>
                    <LanguageToggle />
                </header>

                <AlertsBanner />

                <section className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => {
                                setActiveCategory(category);
                                setCurrentIndex(0);
                            }}
                            className={activeCategory === category ? 'pill-active whitespace-nowrap' : 'pill-muted border border-brand-line bg-white whitespace-nowrap'}
                        >
                            {category === 'all' ? (language === 'ne' ? 'सबै' : 'All') : getLocalizedText(categoryLabels[category], language)}
                        </button>
                    ))}
                </section>

                {story ? <StoryCard story={story} onNext={() => setCurrentIndex((index) => Math.min(index + 1, filteredStories.length - 1))} onPrevious={() => setCurrentIndex((index) => Math.max(index - 1, 0))} /> : null}

                <section className="surface-card rounded-[2rem] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.feed.helper, language)}</p>
                        <span className="text-sm font-medium text-brand-muted">{currentIndex + 1}/{filteredStories.length}</span>
                    </div>
                    <div className="flex gap-2">
                        {filteredStories.map((item, index) => (
                            <div key={item.id} className={index === currentIndex ? 'h-2 flex-1 rounded-full bg-brand-green' : 'h-2 flex-1 rounded-full bg-brand-line'} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
