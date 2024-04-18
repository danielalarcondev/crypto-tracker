import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
        './common-types/**/*.{js,ts,jsx,tsx,mdx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    darkMode: 'selector',
    plugins: [
        require('flowbite/plugin')
    ],
    future: {
        hoverOnlyWhenSupported: true
    },
    theme: {
        colors: {
            black: '#000',
            neutral: colors.zinc,
            primary: colors.orange,
            transparent: 'transparent',
            white: '#FFF',
        },
        extend: {
            screens: {
                'xxs': '360px',
                'xs': '475px',
                '3xl': '1920px',
                '4xl': '2560px',
                '5xl': '3840px'
            }
        },
    }
};
export default config;
