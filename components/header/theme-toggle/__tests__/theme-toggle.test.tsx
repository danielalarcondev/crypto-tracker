import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, afterAll } from '@jest/globals';
import ThemeToggle from '@components/header/theme-toggle/theme-toggle';
import { THEME_LOCAL_STORAGE_KEY, ThemeConfig } from '@components/header/theme-toggle/use-system-theme/useSystemTheme';

describe('ThemeToggle: ', () => {
	
    const defineLightScheme = () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query: string) => {
	
                if (query === '(prefers-color-scheme: dark)') {
                    return {
                        media: '(prefers-color-scheme: light)',
                        matches: false,
                    };
                }
	
                return {
                    media: '(prefers-color-scheme: light)',
                    matches: true,
                };
	
            })
		  });
    };

    const defineDarkScheme = () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query: string) => {
	
                if (query === '(prefers-color-scheme: dark)') {
                    return {
                        media: '(prefers-color-scheme: dark)',
                        matches: true,
                    };
                }
	
                return {
                    media: '(prefers-color-scheme: dark)',
                    matches: false,
                };
	
            })
		  });
    };

    const defineNotSavedTheme = (setItem = jest.fn()) => {
        Object.defineProperty(window, 'localStorage', {
            value: {
			  getItem: () => null,
			  setItem
            },
		  });
    };

    const defineLightSavedTheme = () => {
        Object.defineProperty(window, 'localStorage', {
            value: {
			  getItem: () => ThemeConfig.LIGHT,
			  setItem: jest.fn()
            },
		  });
    };

    const defineDarkSavedTheme = () => {
        Object.defineProperty(window, 'localStorage', {
            value: {
			  getItem: () => ThemeConfig.DARK,
			  setItem: jest.fn()
            },
		  });
    };

    afterAll(() => {
        Object.defineProperty(window, 'matchMedia', {});
    });

    it('should render for the first time correctly with light setting', () => {

        defineLightScheme();
        defineNotSavedTheme();
		
        const { container } = render(<ThemeToggle />);       
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;

        expect(input.checked).toEqual(false);
        expect(container).toMatchSnapshot();
    });

    it('should render for the first time correctly with dark setting', () => {

        defineDarkScheme();
        defineNotSavedTheme();
        
        const { container } = render(<ThemeToggle />);
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;
		
        expect(input.checked).toEqual(true);
        expect(container).toMatchSnapshot();
    });


    it('should turn on dark mode', () => {

        const setItem = jest.fn();

        defineLightScheme();
        defineNotSavedTheme(setItem);
        
    	render(<ThemeToggle />);
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;
        const bodyElement = document.body;

        expect(bodyElement).not.toHaveClass('dark');
        expect(input.checked).toEqual(false);
        expect(setItem).toHaveBeenCalledWith(THEME_LOCAL_STORAGE_KEY, ThemeConfig.LIGHT);
	
        fireEvent.click(input);

        expect(input.checked).toEqual(true);
        expect(setItem).toHaveBeenCalledWith(THEME_LOCAL_STORAGE_KEY, ThemeConfig.DARK);
        expect(bodyElement).toHaveClass('dark');
    });

    it('should turn off dark mode', () => {

        const setItem = jest.fn();

        defineDarkScheme();
        defineNotSavedTheme(setItem);
        
        const { baseElement } = render(<ThemeToggle />);
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;
        const bodyElement = document.body;

        expect(bodyElement).toHaveClass('dark');
        expect(input.checked).toEqual(true);
        expect(setItem).toHaveBeenCalledWith(THEME_LOCAL_STORAGE_KEY, ThemeConfig.DARK);
	
        fireEvent.click(input);

        expect(input.checked).toEqual(false);
        expect(setItem).toHaveBeenCalledWith(THEME_LOCAL_STORAGE_KEY, ThemeConfig.LIGHT);
        expect(bodyElement).not.toHaveClass('dark');
		
    });

    it('should load light configuration from local storage and ignore browser config', () => {

        defineDarkScheme();
        defineLightSavedTheme();
		
        const { container } = render(<ThemeToggle />);       
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;

        expect(input.checked).toEqual(false);
        expect(container).toMatchSnapshot();
    });

    it('should load dark configuration from local storage and ignore browser config', () => {

        defineLightScheme();
        defineDarkSavedTheme();
		
        const { container } = render(<ThemeToggle />);       
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;

        expect(input.checked).toEqual(true);
        expect(container).toMatchSnapshot();
    });
});
