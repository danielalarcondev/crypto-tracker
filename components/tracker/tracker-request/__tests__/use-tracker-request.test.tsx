
import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { waitFor, renderHook, screen, act } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import { useTrackerRequest } from '@components/tracker/tracker-request/use-tracker-request';
import { mockedAssets } from '@tests/utils';
import { ToastContainer } from 'react-toastify';

describe('useTrackerRequest: ', () => {
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <div>
            <ToastContainer />
            {children}
        </div>
	  );

    it('requestGetAssets should set new assets on request succeed', async () => {
        const mockedResponse = {
            data: mockedAssets,
            timestamp: Date.now(),
        };

        const offset = 0;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    ...mockedResponse
                }),
            })
        );
        

        const { result } = renderHook(() => useTrackerRequest(), { wrapper });
    	const { assets, requestGetAssets } = result.current;

        expect(assets).toStrictEqual([]);
        act(() => {
        	requestGetAssets(offset);
        });

        await waitFor(() => {
            expect(result.current.assets).toStrictEqual(mockedResponse.data);
        });
    });

    it('requestGetAssets should notify on  request failure', async () => {
        const errorMessage = 'custom error 354';
        const httpError = 354;

        const offset = 0;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: errorMessage,
                status: httpError
            })
        );
        

        const { result } = renderHook(() => useTrackerRequest(), { wrapper });
    	const { requestGetAssets } = result.current;

        await act(async () => {
            await requestGetAssets(offset);
        });
		
        await waitFor(async () => {
            expect(await screen.findByText(errorMessage)).toBeDefined();
        });
    });

    it('isRequesting should be true only when a request is ongoing and onmount', () => {
        const mockedResponse = {
            data: mockedAssets,
            timestamp: Date.now(),
        };

        const offset = 0;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    ...mockedResponse
                }),
            })
        );
        
        const { result } = renderHook(() => useTrackerRequest(), { wrapper });
    	const { requestGetAssets, isRequesting } = result.current;

        expect(isRequesting).toBe(true);

        act(() => {
            requestGetAssets(offset);
            expect(isRequesting).toBe(true);

        });

        waitFor(() => {
            expect(isRequesting).toBe(false);
        });

        act(() => {
            requestGetAssets(offset);
            expect(isRequesting).toBe(true);
        });

        waitFor(() => {
            expect(isRequesting).toBe(false);
        });
    });

    it('requestCurrentPage should set new assets on request succeed', async () => {
        const mockedResponse = {
            data: mockedAssets,
            timestamp: Date.now(),
        };

        const offset = 0;
        const limit = 100;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    ...mockedResponse
                }),
            })
        );
        

        const { result } = renderHook(() => useTrackerRequest(), { wrapper });
    	const { assets, requestCurrentPage } = result.current;

        expect(assets).toStrictEqual([]);
        act(() => {
        	requestCurrentPage(limit, offset);
        });

        await waitFor(() => {
            expect(result.current.assets).toStrictEqual(mockedResponse.data);
        });
    });

    it('requestGetAssets should notify on  request failure', async () => {
        const errorMessage = 'custom error 354';
        const httpError = 354;

        const offset = 0;
        const limit = 100;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: errorMessage,
                status: httpError
            })
        );
        

        const { result } = renderHook(() => useTrackerRequest(), { wrapper });
    	const { requestCurrentPage } = result.current;

        await act(async () => {
            await requestCurrentPage(limit, offset);
        });
		
        await waitFor(async () => {
            expect(await screen.findByText(errorMessage)).toBeDefined();
        });
    });
});
