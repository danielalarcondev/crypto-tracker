import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { render, screen } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import TrackerPage from '@app/tracker/page';

describe('TrackerPage: ', () => {

    it('should render correctly', () => {

        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));

        render(<TrackerPage />);

        const title = screen.getByTestId('tracker-page-title');
        const subtitle = screen.getByTestId('tracker-page-subtitle');

        const pagination = screen.getByTestId('tracker-pagination');
        const table = screen.getByTestId('tracker-table');

        expect(title).toHaveTextContent('Tracker');
        expect(subtitle).toHaveTextContent('Today\'s Cryptocurrency Prices by Market Cap');

        expect(pagination).toBeInTheDocument();
        expect(table).toBeInTheDocument();
    });
});
