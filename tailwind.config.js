/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: {
          900: '#050C18',
          800: '#0B1F3A',
          700: '#122C52',
        },
        tech: {
          DEFAULT: '#00E0FF',
          dark: '#00A3CC',
          glow: 'rgba(0, 224, 255, 0.35)',
        },
        gold: {
          DEFAULT: '#F5C542',
          soft: 'rgba(245, 197, 66, 0.15)',
        },
        surface: 'rgba(255, 255, 255, 0.06)',
        surfaceBorder: 'rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Noto Sans SC"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, rgba(0,224,255,0.18), transparent 55%), linear-gradient(180deg, #050C18 0%, #0B1F3A 100%)',
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
