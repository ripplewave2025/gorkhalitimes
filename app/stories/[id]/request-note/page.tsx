'use client';

import { FormEvent, useState } from 'react';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
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
    const [reason, setReason] = useState<NoteType>('missing-context');
    const [details, setDetails] = useState('');
    const [evidenceUrl, setEvidenceUrl] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await fetch(`/api/stories/${params.id}/request-note`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason, details, evidenceUrl }),
        });

        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.notes.requestTitle, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.notes.detailsHint, language)}</p>
                </header>
                <form onSubmit={handleSubmit} className="surface-card space-y-4 rounded-[2rem] p-5">
                    <select value={reason} onChange={(event) => setReason(event.target.value as NoteType)} className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none">
                        {noteReasons.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <textarea value={details} onChange={(event) => setDetails(event.target.value)} rows={5} placeholder={language === 'ne' ? 'के मिलेन?' : 'What looks incorrect or incomplete?'} className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none" />
                    <input value={evidenceUrl} onChange={(event) => setEvidenceUrl(event.target.value)} placeholder="https://" className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none" />
                    <button type="submit" className="btn-primary">{getLocalizedText(appCopy.actions.submit, language)}</button>
                    {submitted ? <p className="text-sm text-brand-green">{language === 'ne' ? 'नोट अनुरोध पठाइयो।' : 'Guardian Note request submitted.'}</p> : null}
                </form>
            </div>
        </div>
    );
}
