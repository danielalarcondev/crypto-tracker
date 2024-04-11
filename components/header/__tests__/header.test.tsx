import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { render, screen } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import Header from '@components/header/header';

const MOCKED_PATHNAME = 'https://test.com/assets';

jest.mock('next/navigation', () => ({
    usePathname: () => MOCKED_PATHNAME
}));

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

describe('Header: ', () => {

    it('should render correctly', () => {
        const { container } = render(<Header />);

        const ul = screen.getByTestId('header-ul');
        const logo = screen.getByTestId('header-logo');
        const settings = screen.getByTestId('header-settings-icon');

        expect(ul).toBeInTheDocument();
        expect(logo).toBeInTheDocument();
        expect(settings).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
});
