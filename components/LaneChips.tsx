'use client';

import { FeedLane } from '@/types';
import { getFeedLaneLabel } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

interface LaneChipsProps {
    activeLane: FeedLane;
    onChange: (lane: FeedLane) => void;
    lanes: FeedLane[];
}

export default function LaneChips({ activeLane, onChange, lanes }: LaneChipsProps) {
    const { language } = useLanguage();

    return (
        <section className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {lanes.map((lane) => (
                <button
                    key={lane}
                    type="button"
                    onClick={() => onChange(lane)}
                    className={activeLane === lane ? 'pill-active whitespace-nowrap' : 'pill-muted border border-brand-line bg-white whitespace-nowrap'}
                >
                    {getFeedLaneLabel(lane, language)}
                </button>
            ))}
        </section>
    );
}

