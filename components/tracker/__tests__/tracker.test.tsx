import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, describe, beforeEach } from '@jest/globals';
import Tracker from '@components/tracker/tracker';
import { mockedAssets } from '@tests/utils';

describe('TrackerPage: ', () => {

    beforeEach(() => (
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))
    ));

    it('should render correctly', async () => {

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

        render(<Tracker />);

        let skeletonloading = screen.queryByTestId('tracker-table-skeleton');
        expect(skeletonloading).toBeInTheDocument();

        await waitFor(() => {
            const pagination = screen.getByTestId('tracker-pagination');
            const table = screen.getByTestId('tracker-table');
            skeletonloading = screen.queryByTestId('tracker-table-skeleton');
	
            expect(pagination).toBeInTheDocument();
            expect(table).toBeInTheDocument();
            expect(skeletonloading).toBeFalsy();
        });
        
    });

    it('should render error page if service returns no assets', async () => {

        const statusText = 'Custom error';
        const status = 508;
		
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText,
                status
            })
        );
		
        const { container } = render(<Tracker />);

        let loading = screen.queryByTestId('tracker-table-skeleton');
        let noResultsError = screen.queryByTestId('assents-no-results');

        expect(loading).toBeInTheDocument();
        expect(noResultsError).toBeFalsy();

        await waitFor(() => {
            noResultsError = screen.queryByTestId('assents-no-results');
            loading = screen.queryByTestId('tracker-table-skeleton');
	
            expect(noResultsError).toBeInTheDocument();
            expect(loading).toBeFalsy();
            expect(container).toMatchSnapshot();
        });
        
    });
});
