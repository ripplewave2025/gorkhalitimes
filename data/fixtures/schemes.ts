import { GovtScheme } from '@/types';

export const govtSchemes: GovtScheme[] = [
    {
        id: 'scheme-tea-worker-support',
        title: {
            en: 'Tea worker household support enrolment',
            ne: 'चिया श्रमिक परिवार सहायता दर्ता',
        },
        whoItsFor: {
            en: 'Eligible tea worker households in the Darjeeling hills',
            ne: 'दार्जिलिङ पहाडका योग्य चिया श्रमिक परिवार',
        },
        benefitSummary: {
            en: 'Document-backed support routing through official counters and linked welfare services.',
            ne: 'आधिकारिक काउन्टरमार्फत कागजात जाँच र सम्बन्धित कल्याण सेवामा जोडिने सहायता।',
        },
        eligibilitySnapshot: {
            en: 'Identity proof, bank details, and work records are typically required.',
            ne: 'परिचयपत्र, बैंक विवरण र कामसम्बन्धी कागजात सामान्यतया चाहिन्छ।',
        },
        learnMoreUrl: 'https://www.myscheme.gov.in',
        sourceId: 'india-gov-schemes',
        locationScope: 'Darjeeling hills',
        savedCount: 84,
        helpCount: 19,
        status: 'active',
    },
    {
        id: 'scheme-student-scholarship-hills',
        title: {
            en: 'Hill students scholarship help desk',
            ne: 'पहाडी विद्यार्थी छात्रवृत्ति सहायता डेस्क',
        },
        whoItsFor: {
            en: 'School and college students applying through official scholarship windows',
            ne: 'आधिकारिक छात्रवृत्ति प्रक्रियाबाट आवेदन गर्ने विद्यालय र कलेजका विद्यार्थी',
        },
        benefitSummary: {
            en: 'Helps applicants track deadlines, document requirements, and district-level counters.',
            ne: 'अन्तिम मिति, चाहिने कागजात र जिल्लास्तरका काउन्टरबारे मार्गदर्शन दिन्छ।',
        },
        eligibilitySnapshot: {
            en: 'Carry student identity details, income certificates if applicable, and bank information.',
            ne: 'विद्यार्थी परिचय, आवश्यक परे आय प्रमाणपत्र र बैंक विवरण साथमा राख्नुहोस्।',
        },
        learnMoreUrl: 'https://www.india.gov.in',
        sourceId: 'india-gov-schemes',
        locationScope: 'Darjeeling and Kalimpong',
        savedCount: 52,
        helpCount: 11,
        status: 'active',
    },
    {
        id: 'scheme-farmer-weather-insurance',
        title: {
            en: 'Weather-linked crop and small grower support',
            ne: 'मौसमसँग जोडिएको बाली तथा साना उत्पादक सहायता',
        },
        whoItsFor: {
            en: 'Small growers and vulnerable farmers affected by severe weather',
            ne: 'कडा मौसमबाट प्रभावित साना उत्पादक र संवेदनशील किसान',
        },
        benefitSummary: {
            en: 'Connects official weather advisories with scheme guidance and claim information.',
            ne: 'आधिकारिक मौसम चेतावनीसँगै योजना मार्गदर्शन र दाबीसम्बन्धी जानकारी जोड्छ।',
        },
        eligibilitySnapshot: {
            en: 'Local registration details and land or work records may be required.',
            ne: 'स्थानीय दर्ता विवरण र जमिन वा कामसम्बन्धी अभिलेख चाहिन सक्छ।',
        },
        learnMoreUrl: 'https://mausam.imd.gov.in',
        sourceId: 'imd-hills-weather',
        locationScope: 'North Bengal hills',
        savedCount: 33,
        helpCount: 8,
        status: 'updated',
    },
];
