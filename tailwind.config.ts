import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/globals.css',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-dark': '0 0px 10px rgba(255, 255, 255, 0.1)',
        'custom-light': '0 0px 10px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gold: {
          DEFAULT: 'rgb(200, 155, 60)',
        },
        gray: {
          100: '#F7FAFC',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
      },
      fontSize: {
        xxl: '3.5rem',
        xl: '1.5rem',
        m: '1.2rem',
        sm: '0.9rem',
      },
      fontWeight: {
        bold: '800',
        light: '200',
      },
    },
  },
  plugins: [],
};

export default config;
