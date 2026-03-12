'use client';

import { useEffect, useState } from 'react';
import { Headphones, PauseCircle } from 'lucide-react';
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
        <button type="button" onClick={handleToggle} className="btn-primary justify-center">
            {isPlaying ? <PauseCircle size={16} /> : <Headphones size={16} />}
            {isPlaying ? (audioLanguage === 'ne' ? '??????????' : 'Stop') : (audioLanguage === 'ne' ? '????? ??????????' : 'Listen now')}
        </button>
    );
}

