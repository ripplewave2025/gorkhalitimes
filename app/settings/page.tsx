'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, Moon, Info, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Language } from '@/types';

export default function SettingsPage() {
    const { language, setLanguage } = useLanguage();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const t = translations.settings;

    const languages: { code: Language; name: string; native: string }[] = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'ne', name: 'Nepali', native: 'नेपाली' },
        { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    ];

    return (
        <div className="min-h-screen bg-brand-dark">
            <header className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="flex items-center gap-2 px-4 py-3 max-w-lg mx-auto">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                        <SettingsIcon size={20} className="text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-white">{t.title[language]}</h1>
                </div>
            </header>

            <div className="pt-20 px-4 max-w-lg mx-auto">
                <section className="mb-6">
                    <h2 className="flex items-center gap-2 text-white font-semibold mb-3">
                        <Globe size={18} className="text-blue-400" />{t.language[language]}
                    </h2>
                    <div className="glass rounded-2xl overflow-hidden">
                        {languages.map((lang, index) => (
                            <button key={lang.code} onClick={() => setLanguage(lang.code)}
                                className={`w-full flex items-center justify-between px-4 py-3 smooth-transition hover:bg-white/5 ${index !== languages.length - 1 ? 'border-b border-white/10' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{lang.code === 'en' ? '🇬🇧' : lang.code === 'ne' ? '🇳🇵' : '🇮🇳'}</span>
                                    <div className="text-left"><p className="text-white font-medium">{lang.native}</p><p className="text-gray-400 text-sm">{lang.name}</p></div>
                                </div>
                                {language === lang.code && <Check size={20} className="text-blue-400" />}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wide">
                        {language === 'en' ? 'Preferences' : language === 'ne' ? 'प्राथमिकताहरू' : 'प्राथमिकताएं'}
                    </h2>
                    <div className="glass rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center"><Bell size={18} className="text-red-400" /></div>
                                <span className="text-white">{t.notifications[language]}</span>
                            </div>
                            <button onClick={() => setNotifications(!notifications)} className={`w-12 h-7 rounded-full p-1 smooth-transition ${notifications ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                <div className={`w-5 h-5 rounded-full bg-white smooth-transition ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center"><Moon size={18} className="text-purple-400" /></div>
                                <span className="text-white">{t.darkMode[language]}</span>
                            </div>
                            <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-7 rounded-full p-1 smooth-transition ${darkMode ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                <div className={`w-5 h-5 rounded-full bg-white smooth-transition ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wide">{t.about[language]}</h2>
                    <div className="glass rounded-2xl overflow-hidden">
                        <button className="w-full flex items-center justify-between px-4 py-3 smooth-transition hover:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center"><Info size={18} className="text-green-400" /></div>
                                <div className="text-left"><p className="text-white">Gorkha AI</p><p className="text-gray-400 text-sm">Version 1.0.0</p></div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    </div>
                </section>

                <p className="text-center text-gray-500 text-xs mt-8">
                    {language === 'en' ? 'Built with ❤️ for the Gorkha diaspora' : language === 'ne' ? 'गोर्खा प्रवासीहरूको लागि ❤️ सहित निर्मित' : 'गोरखा प्रवासियों के लिए ❤️ से बनाया गया'}
                </p>
            </div>
        </div>
    );
}
