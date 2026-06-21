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
                cream: '#FFF8F0',
                pearl: '#F0ECE5',
            },
            fontFamily: {
                serif: ['DM Serif Display', 'Georgia', 'serif'],
                sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                display: ['DM Serif Display', 'serif'],
                body: ['Outfit', 'Inter', 'sans-serif'],
            },
            borderRadius: {
                'apple': '14px',
                'apple-lg': '20px',
                'apple-xl': '28px',
                'apple-2xl': '36px',
            },
            animation: {
                'gold-pulse': 'gold-pulse 2.5s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'fade-in': 'fade-in 0.8s ease-out',
                'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-down': 'slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'breathe': 'breathe 3s ease-in-out infinite',
                'gentle-float': 'gentle-float 4s ease-in-out infinite',
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
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.92)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-down': {
                    '0%': { opacity: '0', transform: 'translateY(-12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-in-left': {
                    '0%': { opacity: '0', transform: 'translateX(-24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                breathe: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
                'gentle-float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-4px)' },
                },
            },
            transitionDuration: {
                '800': '800ms',
                '1000': '1000ms',
                '1200': '1200ms',
            },
            transitionTimingFunction: {
                'cinematic': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            boxShadow: {
                'glass': '0 8px 32px rgba(44, 44, 44, 0.06), 0 1px 2px rgba(44, 44, 44, 0.04)',
                'glass-lg': '0 20px 60px rgba(44, 44, 44, 0.10), 0 1px 3px rgba(44, 44, 44, 0.05)',
                'glass-hover': '0 12px 40px rgba(44, 44, 44, 0.08), 0 2px 4px rgba(44, 44, 44, 0.05)',
                'gold': '0 4px 20px rgba(201, 169, 110, 0.3)',
                'gold-lg': '0 8px 32px rgba(201, 169, 110, 0.4)',
                'terracotta': '0 4px 20px rgba(196, 115, 79, 0.3)',
            },
        },
    },
    plugins: [],
}
