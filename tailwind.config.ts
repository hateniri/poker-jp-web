import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        poker: {
          red: '#DC143C',      // Crimson Red
          darkred: '#8B0000',  // Dark Red
          green: '#228B22',    // Forest Green
          darkgreen: '#006400', // Dark Green
          black: '#1a1a1a',    // Rich Black
          white: '#FAFAFA',    // Off White
          gold: '#FFD700',     // Gold
          silver: '#C0C0C0',   // Silver
        }
      },
      backgroundImage: {
        'felt-texture': "url('/felt-texture.png')",
        'card-pattern': "url('/card-pattern.png')",
      },
      fontFamily: {
        'poker': ['Georgia', 'serif'],
        'display': ['Bebas Neue', 'cursive'],
      },
      animation: {
        'card-flip': 'card-flip 0.6s ease-in-out',
        'chip-bounce': 'chip-bounce 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        'chip-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config