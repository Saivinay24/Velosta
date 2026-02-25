/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#F6F3EE',
                sandstone: '#D8C7B3',
                beige: '#E8DFD2',
                terracotta: '#C4734F',
                gold: '#C9A96E',
                charcoal: '#2C2C2C',
                'charcoal-light': '#4A4A4A',
                'warm-white': '#FDFCFA',
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'gold-pulse': 'gold-pulse 2.5s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'fade-in': 'fade-in 0.8s ease-out',
                'slide-up': 'slide-up 0.6s ease-out',
            },
            keyframes: {
                'gold-pulse': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 169, 110, 0.4)' },
                    '50%': { boxShadow: '0 0 0 8px rgba(201, 169, 110, 0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            transitionDuration: {
                '800': '800ms',
                '1000': '1000ms',
                '1200': '1200ms',
            },
            transitionTimingFunction: {
                'cinematic': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
}
