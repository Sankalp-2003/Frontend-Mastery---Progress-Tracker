/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        checkmark: {
          from: { 'stroke-dashoffset': '20', 'stroke-dasharray': '20' },
          to: { 'stroke-dashoffset': '0', 'stroke-dasharray': '20' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        checkmark: 'checkmark 0.2s ease-out forwards',
        slideIn: 'slideIn 0.2s ease-out',
        countUp: 'countUp 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
