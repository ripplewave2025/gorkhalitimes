'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="h-10 w-10 shrink-0 rounded-full border border-brand-line/80 bg-brand-bg/80" />;
    }

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-line/80 bg-brand-bg/80 text-brand-ink/80 hover:bg-brand-bg hover:text-brand-ink transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
