import { z } from 'zod';
import { hasMinimumRole } from '@/lib/server/rbac';
import { AppSession, UserRole } from '@/types';

const sessionSchema = z.object({
    id: z.string(),
    name: z.string(),
    role: z.enum(['guest', 'reader', 'contributor', 'note_writer', 'guardian', 'admin']),
    authMethod: z.enum(['guest', 'google', 'phone']),
    email: z.string().optional(),
    phone: z.string().optional(),
    isGuest: z.boolean(),
});

export function getSessionFromRequest(request: Request): AppSession | null {
    const raw = request.headers.get('x-gorkhayai-session');
    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw);
        return sessionSchema.parse(parsed);
    } catch {
        return null;
    }
}

export function requireMinimumRole(request: Request, minimumRole: UserRole): AppSession {
    const session = getSessionFromRequest(request);

    if (!session || session.isGuest) {
        throw new Error('AUTH_REQUIRED');
    }

    if (!hasMinimumRole(session.role, minimumRole)) {
        throw new Error('FORBIDDEN');
    }

    return session;
}

