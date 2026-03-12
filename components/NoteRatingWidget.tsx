'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy } from '@/lib/client/copy';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { getLocalizedText } from '@/lib/client/language';

const ratingOptions = [
    { value: 'helpful', labelNe: '??????', labelEn: 'Helpful' },
    { value: 'correct-but-unclear', labelNe: '??? ?? ???????', labelEn: 'Correct but unclear' },
    { value: 'needs-better-source', labelNe: '?? ?????? ????? ???????', labelEn: 'Needs better source' },
];

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
            setStatus(language === 'ne' ? '????? ???? contributor ?? ???????? ?????? ????????' : 'Contributor or higher role required to rate notes.');
            return;
        }

        setStatus(language === 'ne' ? '????? ???????? ????' : 'Rating saved.');
    };

    return (
        <section className="rounded-2xl bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-brand-ink">{getLocalizedText(appCopy.story.guardianNote, language)}</h3>
                {!session || session.isGuest ? <Link href="/auth" className="text-xs font-medium text-brand-green">{getLocalizedText(appCopy.actions.signIn, language)}</Link> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {ratingOptions.map((option) => (
                    <button key={option.value} type="button" onClick={() => handleRate(option.value)} className="chip">
                        {language === 'ne' ? option.labelNe : option.labelEn}
                    </button>
                ))}
            </div>
            {status ? <p className="mt-3 text-sm text-brand-muted">{status}</p> : null}
        </section>
    );
}

