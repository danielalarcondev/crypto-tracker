import '../globals.css';
import './tostify.css';

import Header from '@components/header/header';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    description: 'A crypto tracker app to track cryptocurrencies',
    title: 'Crypto Tracker',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            </head>
            <body 
                className={[
                    inter.className,
                    'max-w-[3840px]',
                    'mx-auto',
                    'break-all',
                    ['bg-neutral-200 dark:bg-neutral-900'].join(' '),
                    ['text-neutral-950 dark:text-neutral-50'].join(' ')
                	].join(' ')
            	}
            >
                <Header />
                <main 
                    className={[
                        'mt-24 md:mt-32', 
                        'md:mx-16', 
                        'md:mb-16'
                    ].join(' ')
                    }
                >
                    {children}
                </main>
                
            </body>
        </html>
    );
}
