import { expect, it, describe } from '@jest/globals';
import { getAssets } from '@services/assets';
import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE } from '@services/assets/utils';
import { mockedAssets } from '@tests/utils';

describe('Assets Service: ', () => {
	
    it('getAssets should process data correctly when fetch succeeds', async () => {
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

        const response = await getAssets({});
        expect(response).toStrictEqual(mockedResponse);
    });

    it('getAssets should return proper error when fetch fails', async () => {
		
        const statusText = 'Custom error';
        const status = 508;
		
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText,
                status
            })
        );

        const response = await getAssets({});

        expect(response.error?.errorMessage).toBe(statusText);
        expect(response.error?.httpError).toBe(status);
    });

    it('getAssets should return proper error if an exception occurs', async () => {
        global.fetch = jest.fn(() => {
            throw new Error();
        });

        const response = await getAssets({});

        expect(response.error).toBeDefined();
        expect(response.error?.errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
        expect(response.error?.httpError).toBe(DEFAULT_ERROR_CODE);
    });
});
