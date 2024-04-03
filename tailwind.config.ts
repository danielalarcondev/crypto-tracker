import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

const config: Config = {
    content: [
        './app/components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    darkMode: 'selector',
    plugins: [
        require('flowbite/plugin')
    ],
    theme: {
        colors: {
            black: '#000',
            primary: colors.zinc,
            secondary: colors.orange,
            transparent: 'transparent',
            white: '#FFF',
        },
        extend: {
            backgroundImage: {
                'blue-gradient': 'linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)'
            },
        },
    },
};
export default config;
