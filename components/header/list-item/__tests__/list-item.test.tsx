import * as React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';

import ListItem from '../list-item';

const MOCKED_PATHNAME = 'https://test.com/assets';

jest.mock('next/navigation', () => ({
    usePathname: () => MOCKED_PATHNAME
}));

describe('List Item: ', () => {

    it('should render correct data', () => {

        const text = 'Tracks';
        const path = 'https://test.com/tracks';

        const { container } = render(<ListItem text={text} path={path} isMenuOpen={false} />);

        expect(container).toMatchSnapshot();
        expect(container.querySelector('a')?.textContent).toBe(text);
        expect(container.querySelector('a')?.getAttribute('href')).toBe(path);

    });

    it('should have active status', () => {
        const text = 'Assets';
        const path = MOCKED_PATHNAME;

        const { container } = render(<ListItem text={text} path={path} isMenuOpen={false} />);
		
        expect(container).toMatchSnapshot();
        expect(container.querySelector('li')?.className).toContain('border-primary-500');
    });

    it('should not have active status', () => {
        const text = 'Tracker';
        const path = 'https://test.com/tracker';

        const { container } = render(<ListItem text={text} path={path} isMenuOpen={false} />);
        expect(container.querySelector('li')?.className).not.toContain('border-primary-500');
    });
});
