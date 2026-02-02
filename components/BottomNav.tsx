'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Mic, Compass, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

const navItems = [
    { href: '/', icon: Home, labelKey: 'home' },
    { href: '/chat', icon: MessageCircle, labelKey: 'chat' },
    { href: '/voice', icon: Mic, labelKey: 'voice' },
    { href: '/explore', icon: Compass, labelKey: 'explore' },
    { href: '/settings', icon: Settings, labelKey: 'settings' },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { language } = useLanguage();

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 z-50 bottom-safe">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {navItems.map(({ href, icon: Icon, labelKey }) => {
                    const isActive = pathname === href;
                    const label = translations.nav[labelKey as keyof typeof translations.nav][language];
                    return (
                        <Link key={href} href={href}
                            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl smooth-transition ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}>
                            <Icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : ''} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
