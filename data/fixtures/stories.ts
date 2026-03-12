import { StoryCluster } from '@/types';

export const storyClusters: StoryCluster[] = [
    {
        id: 'story-peshok-road',
        slug: 'peshok-road-restricted-after-slope-check',
        headline: {
            en: 'Peshok road movement resumes in windows after slope inspection',
            ne: 'ढलान जाँचपछि पेसोक सडकमा समय-सीमित आवागमन सुरु',
        },
        summaryShort: {
            en: 'Officials reopened short movement windows after morning slope checks. Heavy vehicles are still being diverted.',
            ne: 'बिहानको ढलान जाँचपछि छोटो समयमा आवागमन खोलिएको छ। ठूला गाडीलाई अझै वैकल्पिक मार्गमा पठाइँदैछ।',
        },
        summaryFull: {
            en: 'The district administration and local radio updates indicate that traffic is moving in controlled windows on the Peshok stretch after fresh debris clearance. Passenger vehicles are being allowed first while heavy vehicles wait for a further engineering review.',
            ne: 'जिल्ला प्रशासन र स्थानीय रेडियोका अपडेटअनुसार ताजा मलबा हटाएपछि पेसोक खण्डमा नियन्त्रित समयमा सवारी चल्न थालेको छ। पहिले यात्रुवाहक गाडीलाई अनुमति दिइएको छ भने ठूला गाडीका लागि थप इन्जिनियरिङ जाँच कुर्न भनिएको छ।',
        },
        uncertaintyLine: {
            en: 'Officials may tighten movement again if rain intensifies.',
            ne: 'वर्षा बढेमा फेरि आवागमन कडा हुन सक्छ।',
        },
        primaryLocation: 'Peshok',
        category: 'public-safety',
        heroImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
        sourceIds: ['darjeeling-district-admin', 'radio-hills', 'hills-brief'],
        trustBadge: 'official',
        status: 'developing',
        guardianNoteId: 'note-peshok-timing',
        publishedAt: '2026-03-12T05:25:00.000Z',
        updatedAt: '2026-03-12T06:20:00.000Z',
        audioLanguages: ['ne', 'en'],
        scores: {
            freshness: 0.96,
            localRelevance: 0.95,
            trust: 0.94,
            urgency: 0.97,
            sourceDiversity: 0.72,
            editorialBoost: 0.35,
        },
        savedCount: 184,
        timeline: [
            {
                id: 'timeline-1',
                label: {
                    en: 'Road inspection started before sunrise.',
                    ne: 'सूर्योदयअघि सडक निरीक्षण सुरु भयो।',
                },
                timestamp: '2026-03-12T04:45:00.000Z',
            },
            {
                id: 'timeline-2',
                label: {
                    en: 'Controlled movement window announced.',
                    ne: 'नियन्त्रित आवागमन समय सार्वजनिक गरियो।',
                },
                timestamp: '2026-03-12T05:35:00.000Z',
            },
        ],
    },
    {
        id: 'story-school-notice',
        slug: 'rain-closure-primary-sections-three-blocks',
        headline: {
            en: 'Primary sections in three hill blocks asked to shift to remote classes',
            ne: 'पहाडका तीन ब्लकमा प्राथमिक कक्षालाई रिमोट कक्षामा लैजान निर्देशन',
        },
        summaryShort: {
            en: 'The latest rain advisory affects primary sections first, with secondary schedules staying unchanged for now.',
            ne: 'नयाँ वर्षा सूचनाले पहिले प्राथमिक कक्षालाई असर गरेको छ। माध्यमिक तालिका हाललाई यथावत् छ।',
        },
        summaryFull: {
            en: 'A joint notice shared by local administrators and school heads asks primary sections in the most rain-hit blocks to shift to remote teaching for one day. The move is described as a precaution rather than a district-wide closure.',
            ne: 'स्थानीय प्रशासन र विद्यालय प्रमुखको संयुक्त सूचनाले वर्षाबाट बढी प्रभावित ब्लकका प्राथमिक कक्षालाई एक दिनका लागि रिमोट पढाइमा लैजान भनेको छ। यसलाई जिल्लाभरको बन्द होइन, सावधानीका कदमका रूपमा व्याख्या गरिएको छ।',
        },
        primaryLocation: 'Sonada, Kurseong, Takdah belt',
        category: 'education',
        heroImageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200',
        sourceIds: ['gta-information-cell', 'hills-brief'],
        trustBadge: 'multi-source',
        status: 'active',
        guardianNoteId: 'note-school-rain-context',
        publishedAt: '2026-03-11T15:55:00.000Z',
        updatedAt: '2026-03-11T18:05:00.000Z',
        audioLanguages: ['ne', 'en'],
        scores: {
            freshness: 0.74,
            localRelevance: 0.86,
            trust: 0.82,
            urgency: 0.58,
            sourceDiversity: 0.61,
            editorialBoost: 0.12,
        },
        savedCount: 96,
        timeline: [
            {
                id: 'timeline-3',
                label: {
                    en: 'School heads asked for a weather review.',
                    ne: 'विद्यालय प्रमुखले मौसम समीक्षा मागे।',
                },
                timestamp: '2026-03-11T13:10:00.000Z',
            },
        ],
    },
    {
        id: 'story-tea-prices',
        slug: 'small-growers-track-steady-green-leaf-prices',
        headline: {
            en: 'Small growers see steady green leaf prices after a soft start to March',
            ne: 'मार्चको कमजोर सुरुवातपछि साना किसानले हरियो पातको मूल्य स्थिर देखे',
        },
        summaryShort: {
            en: 'Local buyer updates suggest prices have stabilized this week, easing some pressure on small growers.',
            ne: 'स्थानीय खरिदकर्ता अपडेटले यस साता मूल्य स्थिर भएको देखाएको छ, जसले साना किसानलाई केही राहत दिएको छ।',
        },
        summaryFull: {
            en: 'Trade desk updates and local reporting suggest green leaf prices have stopped sliding this week, though growers say transport costs still cut into margins. The market remains watchful ahead of the next auction cycle.',
            ne: 'ट्रेड डेस्क र स्थानीय रिपोर्टअनुसार यस साता हरियो पातको मूल्य तल झर्न रोकिएको छ, यद्यपि ढुवानी खर्चले नाफा घटाइरहेको किसानको भनाइ छ। अर्को लिलामी चक्रअघि बजार अझै सतर्क छ।',
        },
        primaryLocation: 'Darjeeling tea belt',
        category: 'economy',
        heroImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200',
        sourceIds: ['tea-board-hills-desk', 'hills-brief'],
        trustBadge: 'multi-source',
        status: 'active',
        publishedAt: '2026-03-11T09:00:00.000Z',
        updatedAt: '2026-03-11T12:45:00.000Z',
        audioLanguages: ['ne', 'en'],
        scores: {
            freshness: 0.61,
            localRelevance: 0.79,
            trust: 0.76,
            urgency: 0.18,
            sourceDiversity: 0.55,
            editorialBoost: 0.1,
        },
        savedCount: 64,
        timeline: [
            {
                id: 'timeline-4',
                label: {
                    en: 'Regional trade note updated.',
                    ne: 'क्षेत्रीय व्यापार नोट अपडेट भयो।',
                },
                timestamp: '2026-03-11T12:15:00.000Z',
            },
        ],
    },
    {
        id: 'story-waterline-repair',
        slug: 'jorebunglow-waterline-repair-priority-supply',
        headline: {
            en: 'Priority water deliveries planned while Jorebunglow line is repaired',
            ne: 'जोरबंगलो लाइन मर्मत हुँदै गर्दा प्राथमिक पानी आपूर्ति योजना',
        },
        summaryShort: {
            en: 'Schools and the health centre are first in line for tanker support as repairs continue.',
            ne: 'मर्मत जारी रहँदा विद्यालय र स्वास्थ्य केन्द्रलाई पहिले ट्यांकरबाट पानी दिइनेछ।',
        },
        summaryFull: {
            en: 'Utility teams say a damaged pumping line has reduced supply in Jorebunglow. Temporary tanker routing is underway, with community facilities getting first priority until the main line is restored.',
            ne: 'बिग्रिएको पम्पिङ लाइनका कारण जोरबंगलोमा पानी आपूर्ति घटेको छ। मुख्य लाइन बन्छुन्जेल सामुदायिक सेवास्थललाई प्राथमिकता दिएर ट्यांकर पठाइँदैछ।',
        },
        primaryLocation: 'Jorebunglow',
        category: 'civic',
        heroImageUrl: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1200',
        sourceIds: ['gta-information-cell'],
        trustBadge: 'single-source',
        status: 'active',
        publishedAt: '2026-03-12T04:20:00.000Z',
        updatedAt: '2026-03-12T05:40:00.000Z',
        audioLanguages: ['ne', 'en'],
        scores: {
            freshness: 0.83,
            localRelevance: 0.8,
            trust: 0.68,
            urgency: 0.52,
            sourceDiversity: 0.22,
            editorialBoost: 0.08,
        },
        savedCount: 42,
        timeline: [
            {
                id: 'timeline-5',
                label: {
                    en: 'Repair crew entered site.',
                    ne: 'मर्मत टोली साइटमा पुग्यो।',
                },
                timestamp: '2026-03-12T04:50:00.000Z',
            },
        ],
    },
    {
        id: 'story-youth-festival',
        slug: 'youth-festival-weekend-darjeeling-town',
        headline: {
            en: 'Weekend youth arts festival draws community groups from across the hills',
            ne: 'साप्ताहिक युवा कला महोत्सवमा पहाडभरका समुदाय समूह सहभागी',
        },
        summaryShort: {
            en: 'Schools, dance groups, and youth collectives are joining a public festival in Darjeeling town this weekend.',
            ne: 'यस साता अन्त्यमा दार्जिलिङ नगरमा विद्यालय, नृत्य समूह र युवा समूह सहभागी हुने सार्वजनिक महोत्सव हुँदैछ।',
        },
        summaryFull: {
            en: 'Community organizers say the weekend program will include local music, youth theatre, and handmade craft stalls. Transport advisories are expected later, but there are no safety restrictions in place.',
            ne: 'आयोजकले साता अन्त्यको कार्यक्रममा स्थानीय संगीत, युवा नाटक र हस्तकला स्टल रहने बताएका छन्। यातायातसम्बन्धी सूचना पछि आउन सक्छ, तर हाल कुनै सुरक्षा प्रतिबन्ध छैन।',
        },
        primaryLocation: 'Darjeeling town',
        category: 'community',
        heroImageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
        sourceIds: ['hills-brief', 'radio-hills'],
        trustBadge: 'multi-source',
        status: 'active',
        publishedAt: '2026-03-10T11:05:00.000Z',
        updatedAt: '2026-03-10T14:10:00.000Z',
        audioLanguages: ['ne', 'en'],
        scores: {
            freshness: 0.38,
            localRelevance: 0.74,
            trust: 0.71,
            urgency: 0.08,
            sourceDiversity: 0.44,
            editorialBoost: 0.14,
        },
        savedCount: 51,
        timeline: [
            {
                id: 'timeline-6',
                label: {
                    en: 'Festival lineup shared by organizers.',
                    ne: 'आयोजकले कार्यक्रम तालिका सार्वजनिक गरे।',
                },
                timestamp: '2026-03-10T13:25:00.000Z',
            },
        ],
    },
];
