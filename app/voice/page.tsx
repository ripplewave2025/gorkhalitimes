'use client';

import { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageToggle from '@/components/LanguageToggle';

type VoiceState = 'idle' | 'listening' | 'speaking';

export default function VoicePage() {
    const { language } = useLanguage();
    const [voiceState, setVoiceState] = useState<VoiceState>('idle');
    const t = translations.voice;

    const handleMicClick = () => {
        if (voiceState === 'idle') {
            setVoiceState('listening');
            setTimeout(() => {
                setVoiceState('speaking');
                setTimeout(() => setVoiceState('idle'), 3000);
            }, 3000);
        } else {
            setVoiceState('idle');
        }
    };

    const getStatusText = () => {
        switch (voiceState) {
            case 'listening': return t.listening[language];
            case 'speaking': return t.speaking[language];
            default: return t.tapToSpeak[language];
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                            <Volume2 size={20} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-white">
                            {language === 'en' ? 'Voice Mode' : language === 'ne' ? 'आवाज मोड' : 'आवाज़ मोड'}
                        </h1>
                    </div>
                    <LanguageToggle />
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-16">
                <div className="relative flex items-center justify-center mb-8">
                    {voiceState !== 'idle' && (
                        <>
                            <div className="absolute w-48 h-48 rounded-full border-2 border-blue-500/30 animate-ping" />
                            <div className="absolute w-40 h-40 rounded-full border-2 border-purple-500/40 animate-ping" style={{ animationDelay: '0.5s' }} />
                        </>
                    )}
                    <button
                        onClick={handleMicClick}
                        className={`relative w-28 h-28 rounded-full flex items-center justify-center smooth-transition ${voiceState === 'listening' ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse' :
                                voiceState === 'speaking' ? 'bg-gradient-to-br from-cyan-500 to-teal-600' :
                                    'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105'
                            }`}
                    >
                        {voiceState === 'speaking' ? <Volume2 size={48} className="text-white" /> :
                            voiceState === 'listening' ? <MicOff size={48} className="text-white" /> :
                                <Mic size={48} className="text-white" />}
                    </button>
                </div>
                <p className="text-xl font-medium text-white mb-4">{getStatusText()}</p>
                <div className="mt-12 text-center max-w-xs">
                    <p className="text-gray-400 text-sm">
                        {language === 'en' && 'Tap the microphone to start a voice conversation.'}
                        {language === 'ne' && 'आवाज कुराकानी सुरु गर्न माइक्रोफोन ट्याप गर्नुहोस्।'}
                        {language === 'hi' && 'वॉयस बातचीत शुरू करने के लिए माइक्रोफ़ोन टैप करें।'}
                    </p>
                </div>
            </div>
        </div>
    );
}
