'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy, noteRatingLabels } from '@/lib/client/copy';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { getLocalizedText } from '@/lib/client/language';

const ratingOptions = [
    'helpful',
    'correct-but-unclear',
    'needs-better-source',
] as const;

export default function NoteRatingWidget({ noteId }: { noteId: string }) {
    const { session } = useAuth();
    const { language } = useLanguage();
    const [status, setStatus] = useState<string | null>(null);

    const handleRate = async (ratingValue: string) => {
        const response = await fetch(`/api/notes/${noteId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...buildSessionHeaders(session),
            },
            body: JSON.stringify({ ratingValue }),
        });

        if (!response.ok) {
            setStatus(language === 'ne' ? 'रेट गर्न contributor वा माथिको भूमिका चाहिन्छ।' : 'Contributor or higher role required to rate notes.');
            return;
        }

        setStatus(language === 'ne' ? 'मूल्याङ्कन सुरक्षित भयो।' : 'Rating saved.');
    };

    return (
        <section className="rounded-2xl bg-white/6 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-brand-ink">{getLocalizedText(appCopy.story.guardianNote, language)}</h3>
                {!session || session.isGuest ? <Link href="/auth" className="text-xs font-medium text-brand-green">{getLocalizedText(appCopy.actions.signIn, language)}</Link> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {ratingOptions.map((option) => (
                    <button key={option} type="button" onClick={() => handleRate(option)} className="chip">
                        {getLocalizedText(noteRatingLabels[option], language)}
                    </button>
                ))}
            </div>
            {status ? <p className="mt-3 text-sm text-brand-muted">{status}</p> : null}
        </section>
    );
}
