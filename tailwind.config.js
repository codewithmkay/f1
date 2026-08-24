/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#08090D',
        carbon: {
          DEFAULT: '#121319',
          light: '#1B1D26',
          border: '#262835',
        },
        violet: {
          DEFAULT: '#8B6BFF',
          dim: '#5B47A8',
          glow: '#A78BFA',
        },
        gold: {
          DEFAULT: '#F0B429',
          dim: '#8A6A22',
        },
        cyan: {
          DEFAULT: '#3FD0E0',
        },
        mist: {
          DEFAULT: '#B7BCC9',
          dim: '#787E8F',
        },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'apex-radial': 'radial-gradient(circle at 50% 0%, rgba(139,107,255,0.18), rgba(8,9,13,0) 60%)',
        'apex-grid': 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      animation: {
        'ticker': 'ticker 28s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
