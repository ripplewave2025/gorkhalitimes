import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-bg': '#f5f2ea',
                'brand-surface': '#fffdf8',
                'brand-line': '#ddd6c6',
                'brand-ink': '#1f2a20',
                'brand-muted': '#66715f',
                'brand-green': '#486a51',
                'brand-green-dark': '#33513d',
                'brand-green-soft': '#e6efe7',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
