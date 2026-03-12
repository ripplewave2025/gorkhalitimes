import { Language, StoryCategory, TrustBadge } from '@/types';

type ByLanguage = Record<Language, string>;

export const appCopy = {
    brand: {
        appName: {
            en: 'GorkhayAI',
            ne: 'GorkhayAI',
        },
        tagline: {
            en: 'Voice-first local intelligence for the Darjeeling hills.',
            ne: 'दार्जिलिङ पहाडका लागि आवाज-प्रथम स्थानीय जानकारी।',
        },
    },
    nav: {
        home: { en: 'Home', ne: 'होम' },
        search: { en: 'Search', ne: 'खोज' },
        voice: { en: 'Voice Today', ne: 'आजको अडियो' },
        saved: { en: 'Saved', ne: 'सेभ' },
        more: { en: 'More', ne: 'थप' },
    },
    actions: {
        listen: { en: 'Listen', ne: 'सुन्नुहोस्' },
        save: { en: 'Save', ne: 'सेभ' },
        share: { en: 'Share', ne: 'शेयर' },
        viewSources: { en: 'View sources', ne: 'स्रोत हेर्नुहोस्' },
        checkTruth: { en: 'Check truth', ne: 'सत्य जाँच' },
        readFullStory: { en: 'Read full story', ne: 'पूरा पढ्नुहोस्' },
        requestNote: { en: 'Request Guardian Note', ne: 'गार्डियन नोट माग्नुहोस्' },
        writeNote: { en: 'Write note', ne: 'नोट लेख्नुहोस्' },
        playAll: { en: 'Play top stories', ne: 'मुख्य कथा सुन्नुहोस्' },
        downloadPack: { en: "Download today's pack", ne: 'आजको प्याक डाउनलोड' },
        submit: { en: 'Submit', ne: 'पठाउनुहोस्' },
    },
    feed: {
        eyebrow: {
            en: 'Calm local brief',
            ne: 'शान्त स्थानीय सार',
        },
        helper: {
            en: 'Swipe to move through local updates. Trust and source visibility stay on every card.',
            ne: 'स्थानीय अपडेट हेर्न स्वाइप गर्नुहोस्। हरेक कार्डमा विश्वास र स्रोत खुला हुन्छ।',
        },
    },
    story: {
        sources: { en: 'Sources', ne: 'स्रोत' },
        trust: { en: 'Trust', ne: 'विश्वास' },
        timeline: { en: 'Update timeline', ne: 'अपडेट समयरेखा' },
        related: { en: 'Related stories', ne: 'सम्बन्धित कथा' },
        guardianNote: { en: 'Guardian Note', ne: 'गार्डियन नोट' },
        noteHistory: { en: 'Guardian Notes add context without turning into a comment war.', ne: 'गार्डियन नोटले सन्दर्भ दिन्छ, बहस होइन।' },
    },
    search: {
        title: { en: 'Search the hills', ne: 'पहाड खोज्नुहोस्' },
        placeholder: { en: 'Try: landslide peshok, tea price, school notice', ne: 'जस्तै: पेसोक पहिरो, चिया मूल्य, स्कूल सूचना' },
        answerSummary: { en: 'Quick answer', ne: 'छिटो उत्तर' },
        noResults: { en: 'No matching stories in the current mock feed.', ne: 'हालको मोक फिडमा मिल्ने कथा छैन।' },
    },
    voice: {
        title: { en: 'Voice Today', ne: 'आजको अडियो' },
        subtitle: {
            en: 'Top narrated stories in a low-friction playlist.',
            ne: 'कम झन्झटमा सुन्न मिल्ने मुख्य कथाको प्लेलिस्ट।',
        },
        packNote: {
            en: 'Offline pack will include top 10 stories, summaries, thumbnails, and cached audio.',
            ne: 'अफलाइन प्याकमा १० मुख्य कथा, सार, थम्बनेल र क्यास अडियो हुनेछ।',
        },
    },
    saved: {
        title: { en: 'Saved stories', ne: 'सेभ गरिएका कथा' },
        subtitle: {
            en: 'Persistence will move to signed-in storage once auth is wired.',
            ne: 'अथेन्टिकेसन जोडिएपछि सेभ गरिएका कथा खातासँग रहनेछन्।',
        },
    },
    onboarding: {
        title: { en: 'Know what is happening in the hills', ne: 'पहाडमा के भइरहेको छ, छिटो जान्नुहोस्' },
        slides: [
            {
                en: 'Swipe through one clear local story at a time.',
                ne: 'एक पटकमा एउटा स्पष्ट स्थानीय कथा स्वाइप गर्नुहोस्।',
            },
            {
                en: 'Listen in Nepali or English when reading is inconvenient.',
                ne: 'पढ्न असजिलो हुँदा नेपाली वा अंग्रेजीमा सुन्नुहोस्।',
            },
            {
                en: 'Check sources and Guardian Notes before trusting fast-moving claims.',
                ne: 'चाँडो फैलिने दाबीमा विश्वास गर्नु अघि स्रोत र गार्डियन नोट हेर्नुहोस्।',
            },
        ],
    },
    more: {
        title: { en: 'More', ne: 'थप' },
        autoplay: { en: 'Autoplay voice', ne: 'अटो प्ले' },
        largeText: { en: 'Large text mode', ne: 'ठूलो अक्षर' },
        dataSaver: { en: 'Data saver', ne: 'डाटा सेभर' },
        audioSpeed: { en: 'Default audio speed', ne: 'अडियो गति' },
    },
    notes: {
        requestTitle: { en: 'Request a Guardian Note', ne: 'गार्डियन नोट माग्नुहोस्' },
        writeTitle: { en: 'Write a Guardian Note', ne: 'गार्डियन नोट लेख्नुहोस्' },
        detailsHint: {
            en: 'Use this when a story needs correction, context, or official confirmation.',
            ne: 'कथा सुधार, सन्दर्भ, वा आधिकारिक पुष्टि चाहिँदा यो प्रयोग गर्नुहोस्।',
        },
    },
};

export const categoryLabels: Record<StoryCategory, ByLanguage> = {
    'public-safety': { en: 'Public safety', ne: 'सार्वजनिक सुरक्षा' },
    civic: { en: 'Civic', ne: 'नागरिक' },
    education: { en: 'Education', ne: 'शिक्षा' },
    economy: { en: 'Economy', ne: 'अर्थ' },
    community: { en: 'Community', ne: 'समुदाय' },
};

export const trustBadgeLabels: Record<TrustBadge, ByLanguage> = {
    official: { en: 'Official', ne: 'आधिकारिक' },
    'multi-source': { en: 'Multi-source', ne: 'धेरै स्रोत' },
    'single-source': { en: 'Single-source', ne: 'एक स्रोत' },
    developing: { en: 'Developing', ne: 'अपडेट हुँदै' },
    disputed: { en: 'Disputed', ne: 'विवादित' },
};
