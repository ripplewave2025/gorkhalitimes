import { GuardianNote } from '@/types';

export const guardianNotes: GuardianNote[] = [
    {
        id: 'note-peshok-timing',
        clusterId: 'story-peshok-road',
        noteType: 'wrong-date-time',
        text: {
            en: 'Some forwards are using an older clip from a different closure. Current restrictions apply from the 7 a.m. inspection window shared by the district administration.',
            ne: 'केही फर्वार्डले पुरानो भिडियो प्रयोग गरेका छन्। अहिलेको प्रतिबन्ध जिल्ला प्रशासनले बिहान ७ बजे निरीक्षणपछि जारी गरेको सूचनामा आधारित छ।',
        },
        confidence: 'high',
        sourceIds: ['darjeeling-district-admin', 'radio-hills'],
        publishedAt: '2026-03-12T05:55:00.000Z',
        updatedAt: '2026-03-12T06:20:00.000Z',
        fastTracked: true,
    },
    {
        id: 'note-school-rain-context',
        clusterId: 'story-school-notice',
        noteType: 'missing-context',
        text: {
            en: 'The closure is limited to primary sections in the most affected blocks. Secondary boards and hostels are still following separate instructions.',
            ne: 'बन्द सूचना सबै विद्यालयका लागि होइन। सबैभन्दा प्रभावित क्षेत्रमा प्राथमिक कक्षाका लागि लागू छ, माध्यमिक र होस्टेलका लागि छुट्टै सूचना छ।',
        },
        confidence: 'medium',
        sourceIds: ['gta-information-cell', 'hills-brief'],
        publishedAt: '2026-03-11T16:35:00.000Z',
        updatedAt: '2026-03-11T18:05:00.000Z',
        fastTracked: false,
    },
];
