import { AlertItem } from '@/types';

export const alerts: AlertItem[] = [
    {
        id: 'alert-peshok-road',
        title: {
            en: 'Peshok road under restricted movement this morning',
            ne: 'पेसोक सडकमा आज बिहान सीमित आवागमन',
        },
        body: {
            en: 'Inspection teams are allowing staggered movement after slope checks. Heavy vehicles should avoid the route until updated clearance.',
            ne: 'ढलान जाँचपछि पालैपालो आवागमन दिइँदैछ। थप सूचना नआएसम्म ठूला गाडीलाई वैकल्पिक मार्ग प्रयोग गर्न भनिएको छ।',
        },
        category: 'road-closure',
        severity: 'high',
        locationScope: 'Peshok and adjoining stretches',
        status: 'updated',
        sourceId: 'darjeeling-district-admin',
        publishedAt: '2026-03-12T05:30:00.000Z',
        updatedAt: '2026-03-12T06:15:00.000Z',
    },
    {
        id: 'alert-water-jorebunglow',
        title: {
            en: 'Utility teams restoring water supply in Jorebunglow',
            ne: 'जोरबंगलोमा पानी आपूर्ति मर्मत भइरहेको छ',
        },
        body: {
            en: 'A pumping line fault has reduced pressure. Interim tankers are being routed to schools and the health centre first.',
            ne: 'पम्पिङ लाइन बिग्रिएकाले दबाब घटेको छ। अस्थायी पानी ट्यांकर पहिले विद्यालय र स्वास्थ्य केन्द्रमा पठाइँदैछ।',
        },
        category: 'utility-disruption',
        severity: 'medium',
        locationScope: 'Jorebunglow',
        status: 'active',
        sourceId: 'gta-information-cell',
        publishedAt: '2026-03-12T04:20:00.000Z',
        updatedAt: '2026-03-12T05:40:00.000Z',
    },
];
