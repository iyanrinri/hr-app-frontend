/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,vue,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'brand-navy': '#003366',
        'brand-cyan': '#00A3E0',
        'brand-light': '#E6F7FF',
      },
       fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
