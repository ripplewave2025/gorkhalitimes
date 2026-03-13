'use client';

import { useState, useRef, useCallback } from 'react';
import { StoryCluster } from '@/types';
import SwipeScreen from './SwipeScreen';

interface SwipeDeckProps {
    stories: StoryCluster[];
}

export default function SwipeDeck({ stories }: SwipeDeckProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollPosition = container.scrollTop;
        const windowHeight = window.innerHeight;
        
        // Calculate which item is currently taking up the majority of the screen
        const rawIndex = Math.round(scrollPosition / windowHeight);
        const index = Math.max(0, Math.min(rawIndex, stories.length - 1));
        
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    }, [activeIndex, stories.length]);

    return (
        <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll bg-black scroll-smooth hide-scrollbar"
        >
            {stories.map((story, index) => (
                <SwipeScreen 
                    key={story.id} 
                    story={story} 
                    isActive={index === activeIndex} 
                />
            ))}
        </div>
    );
}
