import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';

import Settings from '../settings';

describe('Settings: ', () => {
	
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            'prefers-color-scheme': 'light'
        })),
	  });

    it('should render correctly', () => {
        const { container } = render(<Settings />);
        const settingsMenu = screen.getByTestId('header-settings-overlay');
        
        expect(settingsMenu).toHaveClass('hidden');
        expect(container).toMatchSnapshot();
    });

    it('should open settings menu', () => {
        const { container } = render(<Settings />);
        const menuIcon = screen.getByTestId('header-settings-icon');
        const settingsMenu = screen.getByTestId('header-settings-icon');

        fireEvent.click(menuIcon);

        expect(settingsMenu).not.toHaveClass('hidden');
        expect(container).toMatchSnapshot();
    });
});
