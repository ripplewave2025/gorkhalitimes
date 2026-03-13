'use client';

import { FormEvent, ReactNode } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    placeholder: string;
    submitLabel?: string;
    actionNode?: ReactNode;
    onChange: (value: string) => void;
    onSubmit: () => void;
    sticky?: boolean;
}

export default function SearchBar({ value, placeholder, submitLabel, actionNode, onChange, onSubmit, sticky = false }: SearchBarProps) {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className={sticky ? 'sticky top-3 z-40' : ''}>
            <div className="surface-card flex items-center gap-3 rounded-[1.6rem] border border-brand-line/80 bg-brand-surface/90 px-4 py-3 shadow-[0_18px_40px_rgba(3,8,14,0.28)]">
                <Search size={18} className="text-brand-muted" />
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted"
                />
                {actionNode ? (
                    actionNode
                ) : submitLabel ? (
                    <button type="submit" className="pill-active shrink-0 text-xs">
                        {submitLabel}
                    </button>
                ) : null}
            </div>
        </form>
    );
}
