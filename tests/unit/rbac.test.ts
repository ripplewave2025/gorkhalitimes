import assert from 'node:assert/strict';
import test from 'node:test';
import { hasMinimumRole } from '@/lib/server/rbac';

test('hasMinimumRole enforces ascending role order', () => {
    assert.equal(hasMinimumRole('guardian', 'contributor'), true);
    assert.equal(hasMinimumRole('reader', 'guardian'), false);
    assert.equal(hasMinimumRole('admin', 'admin'), true);
});
