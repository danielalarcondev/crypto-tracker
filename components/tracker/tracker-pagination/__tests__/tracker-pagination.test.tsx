import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, beforeEach } from '@jest/globals';
import TrackerPagination from '@components/tracker/tracker-pagination/tracker-pagination';

describe('TrackerPage: ', () => {

    beforeEach(() => (
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))
    ));

    it('should render correctly', () => {

        const { container } = render(<TrackerPagination currentPage={1} setCurrentPage={jest.fn()} totalPages={100} />);
        expect(container).toMatchSnapshot();
    });

    it('should use properly navigation callback', async () => {

        const setCurrentPageMock = jest.fn();

        render(<TrackerPagination currentPage={1} setCurrentPage={setCurrentPageMock} totalPages={100} />);

        const button2 = await screen.findByText('2');
		
        fireEvent.click(button2);
        expect(setCurrentPageMock).toHaveBeenCalled();
    });

    it('should render proper amount of pages', async () => {

        const TWO = 2;
        const setCurrentPageMock = jest.fn();
        const totalPages = 50;

        render(<TrackerPagination currentPage={1} setCurrentPage={setCurrentPageMock} totalPages={totalPages} />);

        const button50 = await screen.findByText(totalPages);
        const ul = button50.parentElement?.parentElement;
        const penultimateUlChild = ul?.children[ul?.children.length - TWO];

        expect(penultimateUlChild?.firstChild).toHaveTextContent(totalPages.toString());
    });
});
