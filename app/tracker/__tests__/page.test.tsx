import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import TrackerPage from '@app/tracker/page';
import { mockedAssets } from '@tests/utils';

describe('TrackerPage: ', () => {

    it('should render correctly', async () => {

        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));

        const mockedResponse = {
            data: mockedAssets,
            timestamp: Date.now(),
        };
		
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    ...mockedResponse
                }),
            })
        );

        render(<TrackerPage />);

        const title = screen.getByTestId('tracker-page-title');
        const subtitle = screen.getByTestId('tracker-page-subtitle');

        expect(title).toHaveTextContent('Tracker');
        expect(subtitle).toHaveTextContent('Today\'s Cryptocurrency Prices by Market Cap');

        await waitFor(() => {
            const pagination = screen.getByTestId('tracker-pagination');
            const table = screen.getByTestId('tracker-table');
            expect(pagination).toBeInTheDocument();
            expect(table).toBeInTheDocument();
        });
    });
});
