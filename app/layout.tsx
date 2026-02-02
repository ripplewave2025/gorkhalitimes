import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';
import BottomNav from '@/components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
    title: 'Gorkha AI - News for the Diaspora',
    description: 'AI-powered news platform for the Gorkha diaspora in English, Nepali, and Hindi.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-brand-dark min-h-screen">
                <LanguageProvider>
                    <main className="pb-20">
                        {children}
                    </main>
                    <BottomNav />
                </LanguageProvider>
            </body>
        </html>
    );
}
