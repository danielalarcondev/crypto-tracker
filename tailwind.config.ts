import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
        'node_modules/flowbite-react/lib/esm/**/*.js'
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
            backgroundImage: {
                'blue-gradient': 'linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)'
            },
        },
        screens: {
            'xs': '475px',
            ...defaultTheme.screens,
        }
    },
};
export default config;
