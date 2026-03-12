'use client';

import { Language, StoryCluster } from '@/types';

const speechLanguageMap: Record<Language, string> = {
    ne: 'ne-NP',
    en: 'en-IN',
    hi: 'hi-IN',
    bn: 'bn-IN',
    bo: 'en-IN',
    lep: 'en-IN',
    dz: 'en-IN',
    sher: 'en-IN',
};

const pronunciationOverrides: Record<Language, Record<string, string>> = {
    ne: {
        GTA: '?? ?? ?',
        IMD: '?? ?? ??',
    },
    en: {
        Peshok: 'Pay-shok',
        Jorebunglow: 'Jore Bungalow',
        Kalimpong: 'Kalim-pong',
        Kurseong: 'Kur-see-ong',
        Lepcha: 'Lep-cha',
    },
    hi: {},
    bn: {},
    bo: {},
    lep: {},
    dz: {},
    sher: {},
};

export interface StoryNarrationOptions {
    story: StoryCluster;
    language: Language;
    rate?: number;
    onEnd?: () => void;
}

function canUseSpeechSynthesis(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

function applyPronunciationOverrides(text: string, language: Language): string {
    const overrides = pronunciationOverrides[language] ?? {};
    return Object.entries(overrides).reduce((current, [from, to]) => current.replaceAll(from, to), text);
}

export function getStoryNarrationText(story: StoryCluster, language: Language): string {
    const pieces = [story.headline[language] ?? story.headline.ne ?? story.headline.en ?? ''];
    pieces.push(story.summaryShort[language] ?? story.summaryShort.ne ?? story.summaryShort.en ?? '');
    if (story.uncertaintyLine) {
        pieces.push(story.uncertaintyLine[language] ?? story.uncertaintyLine.ne ?? story.uncertaintyLine.en ?? '');
    }

    return applyPronunciationOverrides(pieces.filter(Boolean).join('. '), language);
}

export const storyAudioService = {
    isSupported(): boolean {
        return canUseSpeechSynthesis();
    },
    stop(): void {
        if (!canUseSpeechSynthesis()) {
            return;
        }

        window.speechSynthesis.cancel();
    },
    speakNow(options: StoryNarrationOptions): boolean {
        if (!canUseSpeechSynthesis()) {
            return false;
        }

        const utterance = new SpeechSynthesisUtterance(getStoryNarrationText(options.story, options.language));
        utterance.lang = speechLanguageMap[options.language];
        utterance.rate = options.rate ?? 1;
        utterance.onend = () => options.onEnd?.();
        utterance.onerror = () => options.onEnd?.();
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        return true;
    },
};

