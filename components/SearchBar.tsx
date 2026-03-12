'use client';

import { FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    sticky?: boolean;
}

export default function SearchBar({ value, placeholder, onChange, onSubmit, sticky = false }: SearchBarProps) {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className={sticky ? 'sticky top-3 z-40' : ''}>
            <div className="surface-card flex items-center gap-3 rounded-[1.6rem] px-4 py-3">
                <Search size={18} className="text-brand-muted" />
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm text-brand-ink outline-none"
                />
                <button type="submit" className="pill-active text-xs">Go</button>
            </div>
        </form>
    );
}

