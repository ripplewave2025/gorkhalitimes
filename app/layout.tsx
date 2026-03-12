import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';
import BottomNav from '@/components/BottomNav';
import './globals.css';

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
        <html lang="en">
            <body>
                <LanguageProvider>
                    <main className="pb-24">{children}</main>
                    <BottomNav />
                </LanguageProvider>
            </body>
        </html>
    );
}
