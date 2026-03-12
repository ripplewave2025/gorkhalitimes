import type { Metadata } from 'next';
import {
    Manrope,
    Noto_Sans_Bengali,
    Noto_Sans_Devanagari,
    Sora,
} from 'next/font/google';
import { AuthProvider } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import BottomNav from '@/components/BottomNav';
import './globals.css';

const bodyFont = Manrope({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});

const displayFont = Sora({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['400', '600', '700', '800'],
    display: 'swap',
});

const devanagariFont = Noto_Sans_Devanagari({
    subsets: ['devanagari'],
    variable: '--font-devanagari',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const bengaliFont = Noto_Sans_Bengali({
    subsets: ['bengali'],
    variable: '--font-bengali',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://gorkhayai.com'),
    title: 'GorkhayAI',
    description: 'Voice-first local intelligence for the Darjeeling hills.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ne">
            <body className={`${bodyFont.variable} ${displayFont.variable} ${devanagariFont.variable} ${bengaliFont.variable}`}>
                <LanguageProvider>
                    <AuthProvider>
                        <main className="pb-32 lg:pb-0">{children}</main>
                        <BottomNav />
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}

