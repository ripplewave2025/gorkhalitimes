import { govtSchemes } from '@/data/fixtures/schemes';
import { FeedLane, GovtScheme } from '@/types';

export function getSchemes(options: { query?: string; lane?: FeedLane } = {}): GovtScheme[] {
    const trimmed = options.query?.trim().toLowerCase() ?? '';
    const lane = options.lane ?? 'for-you';

    if (lane !== 'for-you' && lane !== 'top-stories' && lane !== 'govt-schemes') {
        return [];
    }

    if (!trimmed) {
        return govtSchemes;
    }

    return govtSchemes.filter((scheme) => [
        'govt scheme',
        'government scheme',
        'yojana',
        scheme.title.en,
        scheme.title.ne,
        scheme.whoItsFor.en,
        scheme.whoItsFor.ne,
        scheme.benefitSummary.en,
        scheme.benefitSummary.ne,
        scheme.locationScope,
    ].join(' ').toLowerCase().includes(trimmed));
}
