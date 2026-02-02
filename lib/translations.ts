import { NewsArticle, TranslatedText } from '@/types';

export const translations = {
    nav: {
        home: { en: 'Home', ne: 'गृहपृष्ठ', hi: 'होम' },
        chat: { en: 'Chat', ne: 'च्याट', hi: 'चैट' },
        voice: { en: 'Voice', ne: 'आवाज', hi: 'आवाज़' },
        explore: { en: 'Explore', ne: 'अन्वेषण', hi: 'एक्सप्लोर' },
        settings: { en: 'Settings', ne: 'सेटिङ्स', hi: 'सेटिंग्स' },
    },
    common: {
        appName: { en: 'Gorkha AI', ne: 'गोर्खा AI', hi: 'गोरखा AI' },
        factChecked: { en: '✓ Fact-Checked', ne: '✓ तथ्य-जाँच', hi: '✓ फैक्ट-चेक्ड' },
        readMore: { en: 'Read More', ne: 'थप पढ्नुहोस्', hi: 'और पढ़ें' },
        share: { en: 'Share', ne: 'साझा', hi: 'शेयर' },
        save: { en: 'Save', ne: 'सेभ', hi: 'सेव' },
        language: { en: 'Language', ne: 'भाषा', hi: 'भाषा' },
    },
    chat: {
        placeholder: { en: 'Ask about this article...', ne: 'यस लेखको बारेमा सोध्नुहोस्...', hi: 'इस लेख के बारे में पूछें...' },
        send: { en: 'Send', ne: 'पठाउनुहोस्', hi: 'भेजें' },
        aiThinking: { en: 'AI is thinking...', ne: 'AI सोचिरहेको छ...', hi: 'AI सोच रहा है...' },
        welcome: { en: 'Hi! I\'m Gorkha AI. Ask me anything about the news!', ne: 'नमस्ते! म गोर्खा AI हुँ। समाचारको बारेमा केही पनि सोध्नुहोस्!', hi: 'नमस्ते! मैं गोरखा AI हूं। समाचार के बारे में कुछ भी पूछें!' },
    },
    voice: {
        tapToSpeak: { en: 'Tap to speak', ne: 'बोल्न ट्याप गर्नुहोस्', hi: 'बोलने के लिए टैप करें' },
        listening: { en: 'Listening...', ne: 'सुनिरहेको छ...', hi: 'सुन रहा है...' },
        speaking: { en: 'Speaking...', ne: 'बोलिरहेको छ...', hi: 'बोल रहा है...' },
    },
    settings: {
        title: { en: 'Settings', ne: 'सेटिङ्स', hi: 'सेटिंग्स' },
        language: { en: 'Language', ne: 'भाषा', hi: 'भाषा' },
        notifications: { en: 'Notifications', ne: 'सूचनाहरू', hi: 'सूचनाएं' },
        darkMode: { en: 'Dark Mode', ne: 'डार्क मोड', hi: 'डार्क मोड' },
        about: { en: 'About', ne: 'बारेमा', hi: 'के बारे में' },
    },
    categories: {
        all: { en: 'All', ne: 'सबै', hi: 'सभी' },
        politics: { en: 'Politics', ne: 'राजनीति', hi: 'राजनीति' },
        diaspora: { en: 'Diaspora', ne: 'प्रवासी', hi: 'प्रवासी' },
        culture: { en: 'Culture', ne: 'संस्कृति', hi: 'संस्कृति' },
        sports: { en: 'Sports', ne: 'खेलकुद', hi: 'खेल' },
        business: { en: 'Business', ne: 'व्यापार', hi: 'व्यापार' },
    },
};

export const sampleNews: NewsArticle[] = [
    {
        id: '1', category: 'diaspora',
        headline: { en: 'Gorkha Community Celebrates New Year with Grand Festival in Hong Kong', ne: 'गोर्खा समुदायले हङकङमा भव्य महोत्सवको साथ नयाँ वर्ष मनायो', hi: 'गोरखा समुदाय ने हांगकांग में भव्य उत्सव के साथ नए साल का जश्न मनाया' },
        summary: { en: 'Over 5,000 Nepali diaspora members gathered for the largest celebration of its kind.', ne: '५,००० भन्दा बढी नेपाली प्रवासीहरू यस प्रकारको सबैभन्दा ठूलो उत्सवको लागि भेला भए।', hi: '5,000 से अधिक नेपाली प्रवासी सदस्य इस तरह के सबसे बड़े समारोह के लिए एकत्र हुए।' },
        timeAgo: '2 hours ago', factChecked: true, imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    },
    {
        id: '2', category: 'politics',
        headline: { en: 'Nepal Parliament Passes Historic Bill on Diaspora Voting Rights', ne: 'नेपाल संसदले प्रवासी मतदान अधिकारमा ऐतिहासिक विधेयक पारित गर्यो', hi: 'नेपाल संसद ने प्रवासी मतदान अधिकार पर ऐतिहासिक विधेयक पारित किया' },
        summary: { en: 'After years of advocacy, Nepali citizens abroad will now be able to vote in national elections.', ne: 'वर्षौंको वकालत पछि, विदेशमा बसोबास गर्ने नेपाली नागरिकहरूले राष्ट्रिय चुनावमा मतदान गर्न सक्नेछन्।', hi: 'वर्षों की वकालत के बाद, विदेश में रहने वाले नेपाली नागरिक राष्ट्रीय चुनावों में मतदान कर सकेंगे।' },
        timeAgo: '5 hours ago', factChecked: true, imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    },
    {
        id: '3', category: 'culture',
        headline: { en: 'Traditional Khukuri Craftsmanship Recognized as UNESCO Intangible Heritage', ne: 'परम्परागत खुकुरी शिल्पकला युनेस्को अमूर्त सम्पदाको रूपमा मान्यता प्राप्त', hi: 'पारंपरिक खुकुरी शिल्प को यूनेस्को अमूर्त विरासत के रूप में मान्यता मिली' },
        summary: { en: 'The centuries-old craft of making the iconic Nepali blade has been added to the prestigious list.', ne: 'प्रतिष्ठित नेपाली ब्लेड बनाउने सदियौं पुरानो शिल्पलाई प्रतिष्ठित सूचीमा थपिएको छ।', hi: 'प्रतिष्ठित नेपाली ब्लेड बनाने की सदियों पुरानी शिल्प को प्रतिष्ठित सूची में जोड़ा गया है।' },
        timeAgo: '1 day ago', factChecked: true, imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
    },
    {
        id: '4', category: 'sports',
        headline: { en: 'Nepali Climber Sets New World Record on Everest Summit Speed', ne: 'नेपाली आरोहीले एभरेस्ट शिखर गतिमा नयाँ विश्व कीर्तिमान बनाए', hi: 'नेपाली पर्वतारोही ने एवरेस्ट शिखर गति में नया विश्व रिकॉर्ड बनाया' },
        summary: { en: 'Mingma Sherpa reached the summit in just 10 hours and 56 minutes from base camp.', ne: 'मिङ्मा शेर्पाले आधार शिविरबाट केवल १० घण्टा ५६ मिनेटमा शिखरमा पुगे।', hi: 'मिंगमा शेरपा ने बेस कैंप से सिर्फ 10 घंटे 56 मिनट में शिखर पर पहुंचे।' },
        timeAgo: '3 hours ago', factChecked: true, imageUrl: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800',
    },
];

export const getTranslation = (obj: TranslatedText, lang: string): string => {
    return obj[lang as keyof TranslatedText] || obj.en;
};
