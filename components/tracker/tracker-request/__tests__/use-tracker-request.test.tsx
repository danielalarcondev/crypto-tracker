
import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { waitFor, renderHook, screen, act } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import { TABLE_TOP_MARGIN, useTrackerRequest } from '@components/tracker/tracker-request/use-tracker-request';
import { mockedAssets } from '@tests/utils';
import { ToastContainer } from 'react-toastify';

describe('useTrackerRequest: ', () => {
    
    const wrapper = ( ref: React.RefObject<HTMLDivElement>) => {

        const component = ({ children }: { children: React.ReactNode }) => (
            <div ref={ref}>
                <ToastContainer />
                {children}
            </div>
        );

        return component;
    };

    it('requestGetAssets should set new assets on request succeed', async () => {
        const mockedResponse = {
            data: mockedAssets,
            timestamp: Date.now(),
        };

        const page = 1;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    ...mockedResponse
                }),
            })
        );
        
        const ref = React.createRef<HTMLDivElement>();
        const { result } = renderHook(() => useTrackerRequest(ref), { wrapper: wrapper(ref) } );
    	const { assets, requestGetAssets } = result.current;

        expect(assets).toStrictEqual([]);
        act(() => {
        	requestGetAssets(page);
        });

        await waitFor(() => {
            expect(result.current.assets).toStrictEqual(mockedResponse.data);
        });
    });

    it('requestGetAssets should notify on  request failure', async () => {
        const errorMessage = 'custom error 354';
        const httpError = 354;

        const page = 1;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: errorMessage,
                status: httpError
            })
        );
        

        const ref = React.createRef<HTMLDivElement>();
        const { result } = renderHook(() => useTrackerRequest(ref), { wrapper: wrapper(ref) });
    	const { requestGetAssets } = result.current;

        await act(async () => {
            await requestGetAssets(page);
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

        const offset = 1;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    ...mockedResponse
                }),
            })
        );
        
        const ref = React.createRef<HTMLDivElement>();
        const { result } = renderHook(() => useTrackerRequest(ref), { wrapper: wrapper(ref) });
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

    it('should scroll to top when loading a new page', () => {
		
        const scrollToMock = jest.fn();
        Object.defineProperty(global.window, 'scrollTo', { value: scrollToMock });
		
        const ref = React.createRef<HTMLDivElement>();
        const { result } = renderHook(() => useTrackerRequest(ref), { wrapper: wrapper(ref) });
        const page = 2;

        act(() => {
            result.current.requestGetAssets(page);
            expect(scrollToMock).toHaveBeenCalledWith({ top: (ref.current?.offsetTop ?? 0) - TABLE_TOP_MARGIN, behavior: 'smooth' });
        });
        

    });
});
