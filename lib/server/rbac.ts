import { UserRole } from '@/types';

const roleOrder: Record<UserRole, number> = {
    guest: 0,
    reader: 1,
    contributor: 2,
    note_writer: 3,
    guardian: 4,
    admin: 5,
};

export function hasMinimumRole(role: UserRole, minimumRole: UserRole): boolean {
    return roleOrder[role] >= roleOrder[minimumRole];
}
