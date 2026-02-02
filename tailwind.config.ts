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
                'brand-dark': '#0f0f0f',
                'brand-card': '#1a1a1a',
                'brand-blue': '#3b82f6',
                'brand-purple': '#8b5cf6',
                'brand-accent': '#22d3ee',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.2s ease-out',
                'pulse-glow': 'pulseGlow 2s infinite',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
