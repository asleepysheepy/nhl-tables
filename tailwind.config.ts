import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/utils.ts',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      gray: colors.neutral,

      green: colors.emerald,
      red: colors.red,
      yellow: colors.yellow,
    },
    extend: {
      spacing: {
        '1/24': '4.1666667%',
        '3/24': '12.5%',
        '7/24': '29.1666667%',
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
} satisfies Config
