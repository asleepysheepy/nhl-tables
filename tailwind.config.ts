import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      gray: colors.neutral,

      green: colors.emerald,
      red: colors.rose,
      yellow: colors.amber,
    },
    extend: {},
  },
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
} satisfies Config
