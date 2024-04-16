import { ChangeEvent, useCallback } from 'react';
import useSystemTheme from '@components/header/theme-toggle/use-system-theme/useSystemTheme';

export default function ThemeToggle() {
	
    const { isThemeSwitcherChecked, setIsThemeSwitcherChecked } = useSystemTheme();

    const handleOnThemeSwitchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setIsThemeSwitcherChecked(event.currentTarget.checked);
    }, [setIsThemeSwitcherChecked]);

    return (
        <div 
            className={[
                'w-36', 
                'h-16', 
                'p-2', 
                'flex', 
                'justify-center', 
                'flex-wrap'
            	].join(' ')
            }
        >
            <label
                className={[
                    'inline-flex',
                    'items-center',
                    'cursor-pointer',
                    'w-auto',
                    'order-2',
                ].join(' ')}>
                <div 
                    className={[
                        'mr-2'
                    	].join(' ')
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className={[
                            'w-6', 
                            'h-6', 
                            ['stroke-black', 'dark:stroke-white'].join(' ')
                        	].join(' ')
                        }
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                        >
                        </path>
                    </svg>
                </div>
                <input
                    data-testid="header-theme-toggle-input"
                    type='checkbox'
                    checked={isThemeSwitcherChecked}
                    onChange={handleOnThemeSwitchChange}
                    className={[
                        'theme-switcher', 
                        'sr-only', 
                        'peer'
                    	].join(' ')
                    }
                />
                <div
                    className={[
                        'relative',
                        'w-11 after:w-5',
                        'h-6 after:h-5',
                        'bg-gray-200 peer-checked:bg-primary-500',
                        'rounded-full',
                        'peer-checked:after:translate-x-full',
                        'rtl:peer-checked:after:-translate-x-full',
                        'peer-checked:after:border-white after:content-[""]',
                        'after:absolute after:top-0.5',
                        'after:start-0.5',
                        'after:bg-white',
                        'after:border-gray-300',
                        'after:border',
                        'after:rounded-full',
                        'after:transition-all',
                    ].join(' ')}>
                </div>
                <div 
                    className={[
                        'ml-2'
                    	].join(' ')
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className={[
                            'w-6', 
                            'h-6', 
                            ['stroke-black', 'dark:stroke-white'].join(' ')
                        	].join(' ')
                        }
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                        ></path>
                    </svg>
                </div>
            </label>
        </div>
    );
};
