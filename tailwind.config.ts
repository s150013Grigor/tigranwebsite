import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3200px',
      },
      colors: {
        primary: {
          DEFAULT: '#000000',
          light: '#111111',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#ffffff',
          light: '#e0e0e0',
          dark: '#cccccc',
        },
        surface: {
          DEFAULT: '#111111',
          light: '#1a1a1a',
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-desktop': 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
