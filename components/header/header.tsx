'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import Settings from '@components/header/settings/settings';
import ListItem from '@components/header/list-item/list-item';
import { useHeaderScroll } from '@components/header/use-header-scroll/use-header-scroll';

import { Routes } from '@utils/routes';

export default function Header() {
	
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { shouldHideHeader } =  useHeaderScroll(isMenuOpen, globalThis?.window?.innerWidth);

    const handleMenuButtonClick = useCallback(() => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('overflow-hidden');
    }, [isMenuOpen]);

    return (
        <header 
            className={classNames([
                'header',
                'max-w-[3840px]',
                'fixed',
                'top-0',
                'w-full',
                'z-20',
                'border-b',
                'flex',
                'shadow-[0px_10px_15px_-10px_rgba(0,0,0,0.3)]',
                ['border-neutral-300', 'dark:border-neutral-700'].join(' '),
                ['bg-white', 'dark:bg-neutral-800'].join(' ')
            	].join(' '), 
            	{
                	'h-16': !isMenuOpen,
                	'h-full flex-col overflow-auto nav-menu-open': isMenuOpen,
                	'hidden': shouldHideHeader
            	}
            )}
        >

            <nav
                data-testid='header-nav'
                className={[
                    'w-full',
                    'max-w-[1920px]',
                    'my-0',
                    'mx-auto'
                ].join(' ')}
            >
                <div
                    className={classNames([
                        'flex',
                        'flex-1',
                        'w-full',
                        'md:justify-between',
                        'pl-2 md:pl-12',
                        'gap-6 md:gap-12'
                    ].join(' '), {
                        'h-auto flex-col flex-nowrap': isMenuOpen,
                        'h-full flex-wrap': !isMenuOpen
                    })}>
                    <div 
                        className={classNames([
                            'content-center', 
                            'sm:hidden'
                        	].join(' '), 
                        	{
                        		'pt-4': isMenuOpen
                    		}
                        )}
                    >
                        <svg data-testid="header-menu-button" onClick={handleMenuButtonClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                            className={classNames([
                                'w-8', 
                                'h-8'
                            	].join(' '), 
                            	{
                                	'rotate-90': isMenuOpen
                            	}
                            )}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    <div 
                        data-testid="header-logo" 
                        className={classNames([
                            'flex',
                            'flex-wrap',
                            'pt-2 pr-2'
                        	].join(' '), 
                        	{
                            	'h-auto w-fit absolute left-0 right-0 mx-auto pt-2': isMenuOpen,
                            	'h-full flex-1 sm:flex-[none] justify-end md:justify-normal': !isMenuOpen
                        	}
                        )}
                    >
                        <Link href={Routes.DEFAULT}>
                            <Image 
                                width="48" 
                                height="48" 
                                src="/logo.svg" 
                                alt="logo" 
                                className={[
                                    'w-12', 
                                    'h-12'
                                	].join(' ')
                                } 
                            />
                        </Link>
                    </div>
                    <div
                        className={classNames([
                            'flex-1',
                            'w-full md:w-auto',
                            'h-full',
                            'md:items-center',
                            'md:order-1',
                        ].join(' '), {
                            'flex': isMenuOpen,
                            'hidden sm:flex': !isMenuOpen
                        })}
                        id='navbar-sticky'>
                        <ul
                            data-testid="header-ul"
                            className={classNames([
                                'menu-ul',
                                'flex',
                                'flex-1',
                                'font-medium',
                                'rounded-lg',
                                'bg-transparent',
                                'justify-start',
                            ].join(' '), {
                                'h-auto flex-col gap-1': isMenuOpen,
                        		'h-full': !isMenuOpen
                            })}>
                            {
                                [
                                    { path: Routes.TRACKER, text: 'Tracker' }
                                ].map((link, index) => (
                                    <ListItem key={index} path={link.path} text={link.text} isMenuOpen={isMenuOpen} />
                                ))
                            }
                        </ul>
                    </div>
                    <div
                        className={classNames([
                            'w-12 md:w-24',
                            'cursor-pointer',
                            'order-2',
                        ].join(' '), {
                            'fixed top-4 right-2': isMenuOpen,
                            'items-center h-full hidden sm:inline-flex': !isMenuOpen
                        })}
                    >
                        <Settings />
                    </div>
                </div>
            </nav>
        </header>
    );
}
