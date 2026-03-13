'use client';

import { useEffect, useState } from 'react';
import { PauseCircle, Volume2 } from 'lucide-react';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { storyAudioService } from '@/lib/client/audio';
import { useLanguage } from '@/lib/LanguageContext';
import { StoryCluster } from '@/types';

interface ListenButtonProps {
    story: StoryCluster;
}

export default function ListenButton({ story }: ListenButtonProps) {
    const { audioLanguage, preferences } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => () => {
        if (isPlaying) {
            storyAudioService.stop();
        }
    }, [isPlaying]);

    const handleToggle = () => {
        if (isPlaying) {
            storyAudioService.stop();
            setIsPlaying(false);
            return;
        }

        const didStart = storyAudioService.speakNow({
            story,
            language: audioLanguage,
            rate: preferences.audioSpeed,
            onEnd: () => setIsPlaying(false),
        });

        setIsPlaying(didStart);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            aria-label={isPlaying ? getLocalizedText(appCopy.actions.stop, audioLanguage) : getLocalizedText(appCopy.actions.listen, audioLanguage)}
        >
            {isPlaying ? <PauseCircle size={18} /> : <Volume2 size={18} />}
        </button>
    );
}
