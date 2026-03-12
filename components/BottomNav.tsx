'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, Headphones, Home, MoreHorizontal, Search } from 'lucide-react';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

const navItems = [
    { href: '/', label: appCopy.nav.home, icon: Home },
    { href: '/search', label: appCopy.nav.search, icon: Search },
    { href: '/voice', label: appCopy.nav.voice, icon: Headphones },
    { href: '/saved', label: appCopy.nav.saved, icon: Bookmark },
    { href: '/more', label: appCopy.nav.more, icon: MoreHorizontal },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { language } = useLanguage();

    return (
        <nav className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 lg:hidden">
            <div className="pointer-events-auto mx-auto max-w-3xl rounded-[1.9rem] border border-white/8 bg-brand-bg/88 p-2 shadow-[0_22px_48px_rgba(0,0,0,0.42)] backdrop-blur-xl bottom-safe">
                <div className="flex items-center justify-around gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link key={item.href} href={item.href} className={isActive ? 'nav-item nav-item-active' : 'nav-item'}>
                                <Icon size={20} />
                                <span>{getLocalizedText(item.label, language)}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
