import { Language } from '@/types/common';

export type UserRole = 'guest' | 'reader' | 'contributor' | 'note_writer' | 'guardian' | 'admin';

export interface UserProfile {
    id: string;
    name: string;
    role: UserRole;
    languagePreference: Language;
    hometown?: string;
}
