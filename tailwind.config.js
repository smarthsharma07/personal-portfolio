export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        surface: '#111827',
        textMain: '#F8FAFC',
        textSecondary: '#94A3B8',
        accentCyan: '#00E5FF',
        accentGold: '#F5B700',
        accentViolet: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
