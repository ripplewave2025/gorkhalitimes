'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy, confidenceLabels, noteTypeLabels } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { ConfidenceLevel, NoteType } from '@/types';

const noteTypes: NoteType[] = [
    'missing-context',
    'wrong-location',
    'wrong-date-time',
    'translation-issue',
    'resolved-update',
];

const confidenceLevels: ConfidenceLevel[] = ['high', 'medium', 'developing'];

export default function WriteNotePage({ params }: { params: { id: string } }) {
    const { language } = useLanguage();
    const { session } = useAuth();
    const [noteType, setNoteType] = useState<NoteType>('missing-context');
    const [confidence, setConfidence] = useState<ConfidenceLevel>('medium');
    const [text, setText] = useState('');
    const [sourceLinks, setSourceLinks] = useState('https://darjeeling.gov.in');
    const [submitted, setSubmitted] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await fetch(`/api/stories/${params.id}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...buildSessionHeaders(session),
            },
            body: JSON.stringify({
                noteType,
                confidence,
                language: 'ne',
                text,
                sourceLinks: sourceLinks.split(',').map((item) => item.trim()).filter(Boolean),
            }),
        });

        setSubmitted(response.ok
            ? getLocalizedText(appCopy.notes.draftSuccess, language)
            : (language === 'ne' ? 'कम्तीमा note_writer भूमिका चाहिन्छ।' : 'Note writer or higher role required.'));
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.notes.writeTitle, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.notes.detailsHint, language)}</p>
                </header>
                <form onSubmit={handleSubmit} className="surface-card space-y-4 rounded-[2rem] p-5">
                    <select value={noteType} onChange={(event) => setNoteType(event.target.value as NoteType)} className="field-select">
                        {noteTypes.map((item) => (
                            <option key={item} value={item}>{getLocalizedText(noteTypeLabels[item], language)}</option>
                        ))}
                    </select>
                    <select value={confidence} onChange={(event) => setConfidence(event.target.value as ConfidenceLevel)} className="field-select">
                        {confidenceLevels.map((item) => (
                            <option key={item} value={item}>{getLocalizedText(confidenceLabels[item], language)}</option>
                        ))}
                    </select>
                    <textarea value={text} onChange={(event) => setText(event.target.value)} rows={5} placeholder={language === 'ne' ? 'तटस्थ शैलीमा १-३ वाक्य लेख्नुहोस्।' : 'Write a neutral note in 1-3 sentences'} className="field-textarea" />
                    <input value={sourceLinks} onChange={(event) => setSourceLinks(event.target.value)} placeholder={language === 'ne' ? 'अल्पविरामले छुट्याइएका स्रोत लिंकहरू' : 'Comma-separated source links'} className="field-control" />
                    <button type="submit" className="btn-primary">{getLocalizedText(appCopy.actions.submit, language)}</button>
                    {!session || session.isGuest ? <Link href="/auth" className="inline-flex text-sm font-medium text-brand-green">{getLocalizedText(appCopy.actions.signIn, language)}</Link> : null}
                    {submitted ? <p className="text-sm text-brand-green">{submitted}</p> : null}
                </form>
            </div>
        </div>
    );
}
