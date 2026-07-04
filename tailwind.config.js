/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        serif: ['Amiri', 'ui-serif', 'Georgia', 'serif'],
      },
      animation: {
        'loading-bar': 'loadingBar 1.8s ease-in-out infinite',
        'tracking-in': 'trackingIn 0.8s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'name-pulse': 'namePulse 2s ease-in-out infinite',
        'equalizer': 'equalizer 0.45s ease-in-out infinite alternate',
      },
      keyframes: {
        loadingBar: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        trackingIn: {
          '0%': { letterSpacing: '-0.5em', opacity: '0' },
          '100%': { letterSpacing: '0.1em', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        namePulse: {
          '0%, 100%': { opacity: '0.9', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.3)' },
        },
        equalizer: {
          '0%': { height: '3px' },
          '100%': { height: '18px' },
        },
      },
    },
  },
  plugins: [],
}
