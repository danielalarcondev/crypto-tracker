import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, afterAll } from '@jest/globals';
import ThemeToggle from '@components/header/theme-toggle/theme-toggle';

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

    afterAll(() => {
        Object.defineProperty(window, 'matchMedia', {});
    });

    it('should render correctly with light setting', () => {

        defineLightScheme();
		
        const { container } = render(<ThemeToggle />);       
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;

        expect(input.checked).toEqual(false);
        expect(container).toMatchSnapshot();
    });

    it('should render correctly with dark setting', () => {

        defineDarkScheme();
        
        const { container } = render(<ThemeToggle />);
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;
		
        expect(input.checked).toEqual(true);
        expect(container).toMatchSnapshot();
    });

    it('should turn on dark mode', () => {

        defineLightScheme();
        
        const { baseElement } = render(<ThemeToggle />);
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;
        const rootElement = baseElement.parentElement;

        expect(rootElement).not.toHaveClass('dark');
        expect(input.checked).toEqual(false);
	
        fireEvent.click(input);

        expect(input.checked).toEqual(true);
        expect(rootElement).toHaveClass('dark');
    });

    it('should turn off dark mode', () => {

        defineDarkScheme();
        
        const { baseElement } = render(<ThemeToggle />);
        const input = screen.getByTestId('header-theme-toggle-input') as HTMLInputElement;
        const rootElement = baseElement.parentElement;

        expect(rootElement).toHaveClass('dark');
        expect(input.checked).toEqual(true);
	
        fireEvent.click(input);

        expect(input.checked).toEqual(false);
        expect(rootElement).not.toHaveClass('dark');
    });
});
