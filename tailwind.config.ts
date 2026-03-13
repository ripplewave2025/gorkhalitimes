import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-bg': 'rgb(var(--brand-bg-rgb) / <alpha-value>)',
                'brand-surface': 'rgb(var(--brand-surface-rgb) / <alpha-value>)',
                'brand-line': 'rgb(var(--brand-line-rgb) / <alpha-value>)',
                'brand-ink': 'rgb(var(--brand-ink-rgb) / <alpha-value>)',
                'brand-muted': 'rgb(var(--brand-muted-rgb) / <alpha-value>)',
                'brand-green': 'rgb(var(--brand-green-rgb) / <alpha-value>)',
                'brand-green-dark': 'rgb(var(--brand-green-dark-rgb) / <alpha-value>)',
                'brand-green-soft': 'rgba(78, 203, 133, 0.16)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
