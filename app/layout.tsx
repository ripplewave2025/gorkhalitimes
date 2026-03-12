import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/AuthContext';
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
        <html lang="ne">
            <body>
                <LanguageProvider>
                    <AuthProvider>
                        <main className="pb-24">{children}</main>
                        <BottomNav />
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
