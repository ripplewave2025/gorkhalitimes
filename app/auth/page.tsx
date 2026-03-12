'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function AuthPage() {
    const router = useRouter();
    const { language } = useLanguage();
    const { session, requestPhoneOtp, signInAsGuest, signInWithGoogleMock, verifyPhoneOtp } = useAuth();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleGoogle = () => {
        signInWithGoogleMock('GorkhayAI Reader', 'reader@example.com');
        router.push('/');
    };

    const handleGuest = () => {
        signInAsGuest();
        router.push('/');
    };

    const handleRequestOtp = async (event: FormEvent) => {
        event.preventDefault();
        if (!phone.trim()) {
            return;
        }

        await requestPhoneOtp(phone.trim());
        setOtpRequested(true);
        setStatus(getLocalizedText(appCopy.auth.otpHint, language));
    };

    const handleVerify = async (event: FormEvent) => {
        event.preventDefault();
        const isValid = await verifyPhoneOtp(phone.trim(), otp.trim());
        setStatus(isValid
            ? (language === 'ne' ? '??? ????-?? ??? ????' : 'Phone sign-in succeeded.')
            : (language === 'ne' ? 'OTP ??????' : 'OTP did not match.'));

        if (isValid) {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">gorkhayai.com</p>
                    <h1 className="mt-3 text-3xl font-semibold text-brand-ink">{getLocalizedText(appCopy.auth.title, language)}</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.auth.subtitle, language)}</p>
                </header>

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="surface-card space-y-4 rounded-[2rem] p-6">
                        <h2 className="text-lg font-semibold text-brand-ink">Google</h2>
                        <p className="text-sm leading-6 text-brand-muted">{language === 'ne' ? '?? ????? Google ????-?? ??? ?????????? ?????' : 'Google sign-in uses a mock adapter in this phase.'}</p>
                        <button type="button" onClick={handleGoogle} className="btn-primary justify-center">{getLocalizedText(appCopy.auth.google, language)}</button>
                    </article>

                    <article className="surface-card space-y-4 rounded-[2rem] p-6">
                        <h2 className="text-lg font-semibold text-brand-ink">OTP</h2>
                        <form onSubmit={otpRequested ? handleVerify : handleRequestOtp} className="space-y-3">
                            <input
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder={language === 'ne' ? '??? ?????' : 'Phone number'}
                                className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none"
                            />
                            {otpRequested ? (
                                <input
                                    value={otp}
                                    onChange={(event) => setOtp(event.target.value)}
                                    placeholder="123456"
                                    className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none"
                                />
                            ) : null}
                            <button type="submit" className="btn-secondary justify-center w-full">
                                {otpRequested
                                    ? (language === 'ne' ? 'OTP ???????? ?????????' : 'Verify OTP')
                                    : getLocalizedText(appCopy.auth.phone, language)}
                            </button>
                        </form>
                        <p className="text-xs leading-6 text-brand-muted">{getLocalizedText(appCopy.auth.otpHint, language)}</p>
                    </article>
                </section>

                <section className="surface-card rounded-[2rem] p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-brand-ink">{language === 'ne' ? '????? ???' : 'Guest mode'}</h2>
                            <p className="mt-2 text-sm leading-6 text-brand-muted">{language === 'ne' ? '???, ??? ? ???? ????? ????? ????-?? ?????? ????' : 'Home, search, and Voice Today are open without sign-in.'}</p>
                        </div>
                        <button type="button" onClick={handleGuest} className="btn-secondary justify-center">{getLocalizedText(appCopy.auth.guest, language)}</button>
                    </div>
                </section>

                {session ? (
                    <section className="surface-card rounded-[2rem] p-6 text-sm leading-6 text-brand-muted">
                        {language === 'ne'
                            ? `????? ????: ${session.name} (${session.role})`
                            : `Current session: ${session.name} (${session.role})`}
                    </section>
                ) : null}

                {status ? <p className="text-sm text-brand-green">{status}</p> : null}

                <Link href="/onboarding" className="inline-flex text-sm font-medium text-brand-green hover:text-brand-green-dark">
                    {language === 'ne' ? '????? ?????????? ?????? ???????????' : 'Want to set preferences first?'}
                </Link>
            </div>
        </div>
    );
}
