'use client';

import { FormEvent, Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy } from '@/lib/client/copy';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { getLocalizedText } from '@/lib/client/language';

function HelpPageContent() {
    const searchParams = useSearchParams();
    const { session } = useAuth();
    const { language } = useLanguage();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [questionText, setQuestionText] = useState('');
    const [callbackNumber, setCallbackNumber] = useState('');
    const [audioFileName, setAudioFileName] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => () => {
        mediaRecorderRef.current?.stop();
    }, []);

    const kind = searchParams.get('schemeId') ? 'scheme' : 'story';
    const storyId = searchParams.get('storyId') ?? undefined;
    const schemeId = searchParams.get('schemeId') ?? undefined;

    const handleRecord = async () => {
        if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
            setStatus(language === 'ne' ? 'यहाँ रेकर्डिङ समर्थित छैन। सट्टामा अडियो फाइल अपलोड गर्नुहोस्।' : 'Recording is not supported here. Upload a file instead.');
            return;
        }

        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = () => {
            setAudioFileName(`voice-question-${Date.now()}.webm`);
            stream.getTracks().forEach((track) => track.stop());
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/support/help', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...buildSessionHeaders(session),
            },
            body: JSON.stringify({ kind, storyId, schemeId, questionText, callbackNumber, audioFileName: audioFileName || undefined }),
        });

        if (!response.ok) {
            setStatus(language === 'ne' ? 'सहायता अनुरोध पठाउन साइन इन चाहिन्छ।' : 'Sign in is required before submitting a help request.');
            return;
        }

        setStatus(language === 'ne' ? 'सहायता अनुरोध पठाइयो।' : 'Help request submitted.');
        setQuestionText('');
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-6">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.support.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.support.subtitle, language)}</p>
                </header>

                <form onSubmit={handleSubmit} className="surface-card space-y-4 rounded-[2rem] p-6">
                    <textarea
                        value={questionText}
                        onChange={(event) => setQuestionText(event.target.value)}
                        rows={5}
                        placeholder={language === 'ne' ? 'के कुरा बुझ्न मद्दत चाहिन्छ?' : 'What do you need help understanding?'}
                        className="field-textarea"
                    />
                    <input
                        value={callbackNumber}
                        onChange={(event) => setCallbackNumber(event.target.value)}
                        placeholder={language === 'ne' ? 'फिर्ता फोन नम्बर (वैकल्पिक)' : 'Callback number (optional)'}
                        className="field-control"
                    />
                    <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={handleRecord} className="btn-secondary justify-center">
                            {isRecording
                                ? (language === 'ne' ? 'रेकर्डिङ रोक्नुहोस्' : 'Stop recording')
                                : (language === 'ne' ? 'आवाजमा प्रश्न रेकर्ड गर्नुहोस्' : 'Record voice question')}
                        </button>
                        <label className="btn-secondary cursor-pointer justify-center">
                            {language === 'ne' ? 'अडियो फाइल अपलोड गर्नुहोस्' : 'Upload audio file'}
                            <input type="file" accept="audio/*" className="hidden" onChange={(event) => setAudioFileName(event.target.files?.[0]?.name ?? '')} />
                        </label>
                    </div>
                    {audioFileName ? <p className="text-sm text-brand-muted">{audioFileName}</p> : null}
                    <button type="submit" className="btn-primary justify-center">{getLocalizedText(appCopy.actions.submit, language)}</button>
                    {!session || session.isGuest ? <Link href="/auth" className="inline-flex text-sm font-medium text-brand-green">{getLocalizedText(appCopy.actions.signIn, language)}</Link> : null}
                    {status ? <p className="text-sm text-brand-green">{status}</p> : null}
                </form>
            </div>
        </div>
    );
}

export default function HelpPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-bg px-4 py-6 text-sm text-brand-muted">Loading help...</div>}>
            <HelpPageContent />
        </Suspense>
    );
}
