import { NotePublishStats } from '@/types';

export function canPublishGuardianNote(stats: NotePublishStats): boolean {
    const standardCriteria =
        stats.ratingsCount >= 7 &&
        stats.contributorClustersRepresented >= 3 &&
        stats.helpfulEquivalentScore >= 0.7 &&
        stats.maxPositiveClusterWeightShare <= 0.6 &&
        (stats.officialSourcesCount >= 1 || stats.independentCredibleSourcesCount >= 2) &&
        !stats.toxicOrOpinionated;

    const fastTrackCriteria =
        stats.guardianApproved &&
        stats.officialSourcesCount >= 1 &&
        stats.ratingsCount >= 3 &&
        !stats.toxicOrOpinionated;

    return standardCriteria || fastTrackCriteria;
}
