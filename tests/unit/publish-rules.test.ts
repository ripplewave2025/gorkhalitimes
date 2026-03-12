import assert from 'node:assert/strict';
import test from 'node:test';
import { canPublishGuardianNote } from '@/lib/server/notes/publish-rules';

test('publish rules accept strong standard note evidence', () => {
    assert.equal(canPublishGuardianNote({
        ratingsCount: 7,
        contributorClustersRepresented: 3,
        helpfulEquivalentScore: 0.8,
        maxPositiveClusterWeightShare: 0.5,
        officialSourcesCount: 1,
        independentCredibleSourcesCount: 2,
        toxicOrOpinionated: false,
        guardianApproved: false,
    }), true);
});

test('publish rules reject weak unsupported note', () => {
    assert.equal(canPublishGuardianNote({
        ratingsCount: 2,
        contributorClustersRepresented: 1,
        helpfulEquivalentScore: 0.4,
        maxPositiveClusterWeightShare: 1,
        officialSourcesCount: 0,
        independentCredibleSourcesCount: 0,
        toxicOrOpinionated: false,
        guardianApproved: false,
    }), false);
});
