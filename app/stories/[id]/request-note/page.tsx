'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy, noteTypeLabels } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { NoteType } from '@/types';

const noteReasons: NoteType[] = [
    'wrong-location',
    'wrong-date-time',
    'old-media',
    'missing-context',
    'needs-official-confirmation',
    'resolved-update',
    'translation-issue',
    'cultural-context',
];

export default function RequestNotePage({ params }: { params: { id: string } }) {
    const { language } = useLanguage();
    const { session } = useAuth();
    const [reason, setReason] = useState<NoteType>('missing-context');
    const [details, setDetails] = useState('');
    const [evidenceUrl, setEvidenceUrl] = useState('');
    const [submitted, setSubmitted] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await fetch(`/api/stories/${params.id}/request-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...buildSessionHeaders(session),
            },
            body: JSON.stringify({ reason, details, evidenceUrl: evidenceUrl || undefined }),
        });

        setSubmitted(response.ok
            ? getLocalizedText(appCopy.notes.requestSuccess, language)
            : (language === 'ne' ? 'यो कामका लागि साइन इन चाहिन्छ।' : 'Sign in is required for this action.'));
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.notes.requestTitle, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.notes.detailsHint, language)}</p>
                </header>
                <form onSubmit={handleSubmit} className="surface-card space-y-4 rounded-[2rem] p-5">
                    <select value={reason} onChange={(event) => setReason(event.target.value as NoteType)} className="field-select">
                        {noteReasons.map((item) => (
                            <option key={item} value={item}>{getLocalizedText(noteTypeLabels[item], language)}</option>
                        ))}
                    </select>
                    <textarea value={details} onChange={(event) => setDetails(event.target.value)} rows={5} placeholder={language === 'ne' ? 'कुन कुरा गलत वा अपूरो देखिन्छ?' : 'What looks incorrect or incomplete?'} className="field-textarea" />
                    <input value={evidenceUrl} onChange={(event) => setEvidenceUrl(event.target.value)} placeholder="https://" className="field-control" />
                    <button type="submit" className="btn-primary">{getLocalizedText(appCopy.actions.submit, language)}</button>
                    {!session || session.isGuest ? <Link href="/auth" className="inline-flex text-sm font-medium text-brand-green">{getLocalizedText(appCopy.actions.signIn, language)}</Link> : null}
                    {submitted ? <p className="text-sm text-brand-green">{submitted}</p> : null}
                </form>
            </div>
        </div>
    );
}
