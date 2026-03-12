import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_LANGUAGE } from '@/lib/client/language';

test('nepali remains the default language', () => {
    assert.equal(DEFAULT_LANGUAGE, 'ne');
});
