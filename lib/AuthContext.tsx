'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppSession, UserRole } from '@/types';

interface AuthContextValue {
    session: AppSession | null;
    isAuthenticated: boolean;
    requestPhoneOtp: (phone: string) => Promise<string>;
    verifyPhoneOtp: (phone: string, otp: string) => Promise<boolean>;
    signInWithGoogleMock: (name?: string, email?: string) => void;
    signInAsGuest: () => void;
    signOut: () => void;
}

const SESSION_KEY = 'gorkhayai-session';
const OTP_KEY = 'gorkhayai-otp';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function resolveRoleFromIdentity(email?: string, phone?: string): UserRole {
    const normalizedEmail = email?.toLowerCase();

    if (normalizedEmail?.startsWith('guardian@') || phone?.endsWith('0000')) {
        return 'guardian';
    }

    if (normalizedEmail?.startsWith('writer@')) {
        return 'note_writer';
    }

    if (normalizedEmail?.startsWith('contributor@')) {
        return 'contributor';
    }

    if (normalizedEmail?.endsWith('@gorkhayai.com')) {
        return 'admin';
    }

    return 'reader';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<AppSession | null>(null);

    useEffect(() => {
        const raw = window.localStorage.getItem(SESSION_KEY);
        if (!raw) {
            return;
        }

        try {
            setSession(JSON.parse(raw) as AppSession);
        } catch {
            window.localStorage.removeItem(SESSION_KEY);
        }
    }, []);

    useEffect(() => {
        if (session) {
            window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            return;
        }

        window.localStorage.removeItem(SESSION_KEY);
    }, [session]);

    const requestPhoneOtp = async (phone: string) => {
        const otp = '123456';
        window.localStorage.setItem(OTP_KEY, JSON.stringify({ phone, otp }));
        return otp;
    };

    const verifyPhoneOtp = async (phone: string, otp: string) => {
        const raw = window.localStorage.getItem(OTP_KEY);
        if (!raw) {
            return false;
        }

        const saved = JSON.parse(raw) as { phone: string; otp: string };
        const isValid = saved.phone === phone && saved.otp === otp;

        if (!isValid) {
            return false;
        }

        setSession({
            id: `phone-${phone}`,
            name: `Reader ${phone.slice(-4)}`,
            role: resolveRoleFromIdentity(undefined, phone),
            authMethod: 'phone',
            phone,
            isGuest: false,
        });
        window.localStorage.removeItem(OTP_KEY);
        return true;
    };

    const signInWithGoogleMock = (name?: string, email?: string) => {
        const resolvedEmail = email?.trim() || 'reader@example.com';
        setSession({
            id: `google-${resolvedEmail}`,
            name: name?.trim() || 'GorkhayAI Reader',
            email: resolvedEmail,
            role: resolveRoleFromIdentity(resolvedEmail),
            authMethod: 'google',
            isGuest: false,
        });
    };

    const signInAsGuest = () => {
        setSession({
            id: 'guest-session',
            name: 'Guest',
            role: 'guest',
            authMethod: 'guest',
            isGuest: true,
        });
    };

    const signOut = () => {
        setSession(null);
    };

    const value = useMemo(() => ({
        session,
        isAuthenticated: !!session && !session.isGuest,
        requestPhoneOtp,
        verifyPhoneOtp,
        signInWithGoogleMock,
        signInAsGuest,
        signOut,
    }), [session]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}

