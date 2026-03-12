import {
    AlertStatus,
    ConfidenceLevel,
    Language,
    LocalizedText,
    NoteRatingValue,
    NoteType,
    StoryCategory,
    TrustBadge,
} from '@/types';

type ByLanguage = Partial<Record<Language, string>>;
type AudioStatus = 'cached' | 'queued' | 'browser-fallback';

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
        voice: { en: 'Voice Today', ne: 'आजको आवाज' },
        saved: { en: 'Saved', ne: 'सेभ' },
        more: { en: 'More', ne: 'थप' },
    },
    actions: {
        listen: { en: 'Listen now', ne: 'अहिले सुन्नुहोस्' },
        save: { en: 'Save', ne: 'सेभ' },
        share: { en: 'Share', ne: 'साझा' },
        viewSources: { en: 'View sources', ne: 'स्रोत हेर्नुहोस्' },
        checkTruth: { en: 'Check truth', ne: 'तथ्य जाँच' },
        readFullStory: { en: 'Read full story', ne: 'पूरै कथा पढ्नुहोस्' },
        requestNote: { en: 'Request Guardian Angel Note', ne: 'Guardian Angel Note माग्नुहोस्' },
        writeNote: { en: 'Write Guardian Angel Note', ne: 'Guardian Angel Note लेख्नुहोस्' },
        playAll: { en: 'Play top stories', ne: 'मुख्य कथाहरू चलाउनुहोस्' },
        downloadPack: { en: "Download today's pack", ne: 'आजको प्याक डाउनलोड' },
        submit: { en: 'Submit', ne: 'पठाउनुहोस्' },
        continueAsGuest: { en: 'Continue as guest', ne: 'अतिथिको रूपमा जारी राख्नुहोस्' },
        signIn: { en: 'Sign in', ne: 'साइन इन' },
        signOut: { en: 'Sign out', ne: 'साइन आउट' },
        savePreferences: { en: 'Save preferences', ne: 'रुचि सुरक्षित गर्नुहोस्' },
        askForHelp: { en: 'Ask for help', ne: 'सहायता माग्नुहोस्' },
        stop: { en: 'Stop', ne: 'रोक्नुहोस्' },
        verifyOtp: { en: 'Verify OTP', ne: 'OTP पुष्टि गर्नुहोस्' },
        learnMore: { en: 'Learn more', ne: 'थप जानकारी' },
        go: { en: 'Go', ne: 'खोज' },
    },
    auth: {
        title: { en: 'Sign in when you are ready', ne: 'तयार भएपछि साइन इन गर्नुहोस्' },
        subtitle: {
            en: 'Guest mode is open for browsing. Saving, note actions, and help requests need a signed-in account.',
            ne: 'ब्राउज गर्न अतिथि मोड खुला छ। सेभ, नोट र सहायता अनुरोधका लागि साइन इन चाहिन्छ।',
        },
        google: { en: 'Continue with Google', ne: 'Google मार्फत जारी राख्नुहोस्' },
        phone: { en: 'Continue with phone OTP', ne: 'फोन OTP मार्फत जारी राख्नुहोस्' },
        otpHint: {
            en: 'Development OTP is 123456 until a real provider is configured.',
            ne: 'वास्तविक प्रदायक जोडिनु अघि विकास OTP 123456 प्रयोग गर्नुहोस्।',
        },
        guest: { en: 'Browse as guest', ne: 'अतिथिको रूपमा हेर्नुहोस्' },
    },
    feed: {
        eyebrow: {
            en: 'Calm local brief',
            ne: 'शान्त स्थानीय ब्रीफ',
        },
        helper: {
            en: 'Swipe through local updates. Trust, sources, and Guardian Angel Notes stay visible on every card.',
            ne: 'स्थानीय अपडेट कार्ड-कर्डमा हेर्नुहोस्। विश्वास, स्रोत र Guardian Angel Note हरेक कथामा देखिन्छ।',
        },
        personalized: {
            en: 'Your places, topics, and official sources quietly shape this lane.',
            ne: 'तपाईंका ठाउँ, विषय र रोजिएका स्रोतले यो लाइनलाई हल्का रूपमा मिलाउँछन्।',
        },
    },
    story: {
        sources: { en: 'Sources', ne: 'स्रोत' },
        trust: { en: 'Trust', ne: 'विश्वास' },
        timeline: { en: 'Update timeline', ne: 'अपडेट क्रम' },
        related: { en: 'Related stories', ne: 'सम्बन्धित कथा' },
        guardianNote: { en: 'Guardian Angel Note', ne: 'Guardian Angel Note' },
        noteHistory: {
            en: 'Guardian Angel Notes add factual context without turning into a comments fight.',
            ne: 'Guardian Angel Note ले बहस होइन, तथ्य र सन्दर्भ थप्छ।',
        },
        sourceVisible: { en: 'visible sources', ne: 'देखिने स्रोत' },
        confidence: { en: 'Confidence', ne: 'विश्वसनीयता' },
        fastTrack: { en: 'Guardian fast-track', ne: 'Guardian fast-track' },
    },
    search: {
        title: { en: 'Search the hills', ne: 'पहाडका खबर खोज्नुहोस्' },
        placeholder: {
            en: 'Try: landslide peshok, tea price, govt scheme, school notice',
            ne: 'उदाहरण: पेसोक पहिरो, चियाको भाउ, सरकारी योजना, विद्यालय सूचना',
        },
        answerSummary: { en: 'Quick answer', ne: 'छोटो उत्तर' },
        noResults: {
            en: 'No matching stories or schemes in the current feed.',
            ne: 'अहिलेको फिडमा मिल्ने कथा वा योजना भेटिएन।',
        },
        recent: { en: 'Recent searches', ne: 'हालका खोज' },
        suggestions: { en: 'Try one of these', ne: 'यीमध्ये एक प्रयास गर्नुहोस्' },
    },
    voice: {
        title: { en: 'Voice Today', ne: 'आजको आवाज' },
        subtitle: {
            en: 'Top narrated stories in a low-friction playlist.',
            ne: 'कम झन्झटको प्लेलिस्टमा मुख्य कथाहरू सुन्नुहोस्।',
        },
        packNote: {
            en: 'Top stories can play immediately with browser speech before server audio is ready.',
            ne: 'सर्भर अडियो तयार नभएसम्म मुख्य कथाहरू ब्राउजरकै आवाजमा तुरुन्त सुन्न सकिन्छ।',
        },
        fallback: {
            en: 'Browser speech fallback active',
            ne: 'ब्राउजर आवाज सक्रिय छ',
        },
        track: {
            en: 'Track',
            ne: 'ट्र्याक',
        },
    },
    saved: {
        title: { en: 'Saved stories', ne: 'सेभ गरिएका कथा' },
        subtitle: {
            en: 'Signed-in saves are stored against your current mock session.',
            ne: 'साइन इन भएपछि सेभहरू अहिलेको मोक सेसनसँग जोडिन्छन्।',
        },
        empty: {
            en: 'No saved stories yet.',
            ne: 'अहिलेसम्म कुनै कथा सेभ गरिएको छैन।',
        },
    },
    onboarding: {
        title: { en: 'Know what is happening in the hills', ne: 'पहाडमा के भइरहेको छ, सहजै बुझ्नुहोस्' },
        subtitle: {
            en: 'Set your language, places, and topics once. GorkhayAI keeps the feed calm and source-visible after that.',
            ne: 'भाषा, ठाउँ र विषय एकपटक रोज्नुहोस्। त्यसपछि GorkhayAI ले शान्त र स्रोत-देखिने फिड तयार राख्छ।',
        },
        slides: [
            {
                en: 'Swipe through one clear local story at a time.',
                ne: 'एकपटकमा एक स्पष्ट स्थानीय कथा हेर्नुहोस्।',
            },
            {
                en: 'Listen first in Nepali, then switch audio and content language if needed.',
                ne: 'पहिले नेपालीमा सुन्नुहोस्, अनि आवश्यक परे अडियो वा सामग्री भाषा बदल्नुहोस्।',
            },
            {
                en: 'Check sources and Guardian Angel Notes before trusting fast-moving claims.',
                ne: 'छिट्टै फैलिने दाबीमा भरोसा गर्नुअघि स्रोत र Guardian Angel Note हेर्नुहोस्।',
            },
        ],
        finish: { en: 'Finish onboarding', ne: 'अनबोर्डिङ पूरा गर्नुहोस्' },
    },
    more: {
        title: { en: 'Settings and preferences', ne: 'सेटिङ र रुचि' },
        subtitle: {
            en: 'Nepali stays the default. You can tune UI, content, audio, places, topics, and source preferences here.',
            ne: 'नेपाली नै मुख्य डिफल्ट रहन्छ। यहाँबाट UI, सामग्री, अडियो, ठाउँ, विषय र स्रोतको रुचि मिलाउन सक्नुहुन्छ।',
        },
        autoplay: { en: 'Autoplay voice', ne: 'अडियो स्वतः चलाउने' },
        largeText: { en: 'Large text mode', ne: 'ठूलो अक्षर मोड' },
        dataSaver: { en: 'Data saver', ne: 'डेटा बचत' },
        audioSpeed: { en: 'Default audio speed', ne: 'पूर्वनिर्धारित अडियो गति' },
        uiLanguage: { en: 'UI language', ne: 'इन्टरफेस भाषा' },
        contentLanguage: { en: 'Content language', ne: 'सामग्री भाषा' },
        audioLanguage: { en: 'Audio language', ne: 'अडियो भाषा' },
        fallbackLanguage: { en: 'Fallback language', ne: 'फलब्याक भाषा' },
        preferredPlaces: { en: 'Preferred places', ne: 'रुचिका ठाउँ' },
        preferredTopics: { en: 'Preferred topics', ne: 'रुचिका विषय' },
        preferredSources: { en: 'Preferred sources', ne: 'रुचिका स्रोत' },
        mutedSources: { en: 'Muted sources', ne: 'कम देखाइने स्रोत' },
        morningDigest: { en: 'Morning audio digest', ne: 'बिहानको अडियो डाइजेस्ट' },
        govtSchemesAlerts: { en: 'Govt Schemes alerts', ne: 'सरकारी योजना अलर्ट' },
        account: { en: 'Account', ne: 'खाता' },
    },
    schemes: {
        badge: { en: 'Govt Schemes', ne: 'सरकारी योजना' },
        whoItsFor: { en: 'Who it is for:', ne: 'कसका लागि:' },
        benefitSummary: { en: 'Benefit summary:', ne: 'मुख्य फाइदा:' },
        eligibility: { en: 'Eligibility:', ne: 'योग्यता:' },
        documents: { en: 'Documents you may need', ne: 'चाहिन सक्ने कागजात' },
        getHelpFast: { en: 'Get help quickly', ne: 'छिट्टै सहायता पाउनुहोस्' },
    },
    notes: {
        requestTitle: { en: 'Request a Guardian Angel Note', ne: 'Guardian Angel Note माग्नुहोस्' },
        writeTitle: { en: 'Write a Guardian Angel Note', ne: 'Guardian Angel Note लेख्नुहोस्' },
        detailsHint: {
            en: 'Use this when a story needs correction, context, or official confirmation.',
            ne: 'कथामा सुधार, थप सन्दर्भ वा आधिकारिक पुष्टि चाहिँदा यो प्रयोग गर्नुहोस्।',
        },
        requestSuccess: {
            en: 'Guardian Angel Note request submitted.',
            ne: 'Guardian Angel Note अनुरोध पठाइयो।',
        },
        draftSuccess: {
            en: 'Guardian Angel Note draft submitted.',
            ne: 'Guardian Angel Note ड्राफ्ट पठाइयो।',
        },
    },
    support: {
        title: { en: 'Voice help request', ne: 'आवाज सहायता अनुरोध' },
        subtitle: {
            en: 'Submit a voice question when a story or scheme needs explanation.',
            ne: 'कुनै कथा वा योजनाबारे थप स्पष्टता चाहिँदा आवाजमा प्रश्न पठाउनुहोस्।',
        },
    },
} satisfies Record<string, unknown>;

export const categoryLabels: Record<StoryCategory, ByLanguage> = {
    'public-safety': { en: 'Public safety', ne: 'सार्वजनिक सुरक्षा' },
    civic: { en: 'Civic', ne: 'नागरिक सेवा' },
    education: { en: 'Education', ne: 'शिक्षा' },
    economy: { en: 'Economy', ne: 'अर्थतन्त्र' },
    community: { en: 'Community', ne: 'समुदाय' },
    'govt-schemes': { en: 'Govt Schemes', ne: 'सरकारी योजना' },
};

export const trustBadgeLabels: Record<TrustBadge, ByLanguage> = {
    official: { en: 'Official', ne: 'अधिकृत' },
    'multi-source': { en: 'Multi-source', ne: 'धेरै स्रोत' },
    'single-source': { en: 'Single-source', ne: 'एक स्रोत' },
    developing: { en: 'Developing', ne: 'अझ पुष्टि हुँदै' },
    disputed: { en: 'Disputed', ne: 'विवादित' },
};

export const noteTypeLabels: Record<NoteType, ByLanguage> = {
    'wrong-location': { en: 'Wrong location', ne: 'ठाउँ गलत' },
    'wrong-date-time': { en: 'Wrong date or time', ne: 'मिति वा समय गलत' },
    'old-media': { en: 'Old photo or video', ne: 'पुरानो फोटो वा भिडियो' },
    'missing-context': { en: 'Missing context', ne: 'सन्दर्भ अपूरो' },
    'needs-official-confirmation': { en: 'Needs official confirmation', ne: 'आधिकारिक पुष्टि चाहिन्छ' },
    'resolved-update': { en: 'Resolved by new update', ne: 'नयाँ अपडेटले समाधान भयो' },
    'translation-issue': { en: 'Translation issue', ne: 'अनुवाद समस्या' },
    'cultural-context': { en: 'Cultural context', ne: 'सांस्कृतिक सन्दर्भ' },
};

export const confidenceLabels: Record<ConfidenceLevel, ByLanguage> = {
    high: { en: 'High', ne: 'उच्च' },
    medium: { en: 'Medium', ne: 'मध्यम' },
    developing: { en: 'Developing', ne: 'अझ पुष्टि हुँदै' },
};

export const noteRatingLabels: Record<NoteRatingValue, ByLanguage> = {
    helpful: { en: 'Helpful', ne: 'उपयोगी' },
    'not-helpful': { en: 'Not helpful', ne: 'उपयोगी छैन' },
    'correct-but-unclear': { en: 'Correct but unclear', ne: 'ठीक छ, तर अस्पष्ट' },
    'needs-better-source': { en: 'Needs better source', ne: 'अझ राम्रो स्रोत चाहिन्छ' },
    'too-opinionated': { en: 'Too opinionated', ne: 'धेरै रायमुखी' },
    outdated: { en: 'Outdated', ne: 'पुरानो भयो' },
};

export const audioStatusLabels: Record<AudioStatus, ByLanguage> = {
    cached: { en: 'Audio ready', ne: 'अडियो तयार' },
    queued: { en: 'Audio preparing', ne: 'अडियो तयार हुँदै' },
    'browser-fallback': { en: 'Browser voice', ne: 'ब्राउजर आवाज' },
};

export const alertStatusLabels: Record<AlertStatus, ByLanguage> = {
    active: { en: 'Active', ne: 'जारी' },
    updated: { en: 'Updated', ne: 'अपडेट' },
    resolved: { en: 'Resolved', ne: 'समाधान' },
};

export function staticText(value: string): LocalizedText {
    return { en: value, ne: value };
}
