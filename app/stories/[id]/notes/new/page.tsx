'use client';

import { FormEvent, useState } from 'react';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { ConfidenceLevel, NoteType } from '@/types';

const noteTypes: NoteType[] = [
    'missing-context',
    'wrong-location',
    'wrong-date-time',
    'translation-issue',
    'resolved-update',
];

export default function WriteNotePage({ params }: { params: { id: string } }) {
    const { language } = useLanguage();
    const [noteType, setNoteType] = useState<NoteType>('missing-context');
    const [confidence, setConfidence] = useState<ConfidenceLevel>('medium');
    const [text, setText] = useState('');
    const [sourceLinks, setSourceLinks] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await fetch(`/api/stories/${params.id}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                noteType,
                confidence,
                text,
                sourceLinks: sourceLinks.split(',').map((item) => item.trim()).filter(Boolean),
            }),
        });

        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.notes.writeTitle, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.notes.detailsHint, language)}</p>
                </header>
                <form onSubmit={handleSubmit} className="surface-card space-y-4 rounded-[2rem] p-5">
                    <select value={noteType} onChange={(event) => setNoteType(event.target.value as NoteType)} className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none">
                        {noteTypes.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <select value={confidence} onChange={(event) => setConfidence(event.target.value as ConfidenceLevel)} className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none">
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="developing">developing</option>
                    </select>
                    <textarea value={text} onChange={(event) => setText(event.target.value)} rows={5} placeholder={language === 'ne' ? '१–३ वाक्यको तटस्थ नोट लेख्नुहोस्' : 'Write a neutral note in 1-3 sentences'} className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none" />
                    <input value={sourceLinks} onChange={(event) => setSourceLinks(event.target.value)} placeholder={language === 'ne' ? 'कम्माले छुट्याएर स्रोत लिंक राख्नुहोस्' : 'Comma-separated source links'} className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none" />
                    <button type="submit" className="btn-primary">{getLocalizedText(appCopy.actions.submit, language)}</button>
                    {submitted ? <p className="text-sm text-brand-green">{language === 'ne' ? 'ड्राफ्ट नोट पठाइयो।' : 'Draft note submitted.'}</p> : null}
                </form>
            </div>
        </div>
    );
}
