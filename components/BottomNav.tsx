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
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-line bg-brand-bg/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-3xl items-center justify-around px-3 py-2 bottom-safe">
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
        </nav>
    );
}
