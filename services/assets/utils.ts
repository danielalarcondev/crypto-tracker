import { GetAssetsPayload } from '@common-types/assets';
import { Page } from '@playwright/test';
import { mockedAssets } from '@tests/utils';

export const ASSETS_ENDPOINT = 'https://api.coincap.io/v2/assets';
export const DEFAULT_ASSETS_LIMIT = 100;
export const DEFAULT_ASSETS_OFFSET = 0;

export const DEFAULT_ERROR_CODE = 500;
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
export const URL_ERROR_CODE = 404;
export const URL_ERROR_MESSAGE = 'Server could not be reached. Try again later';

export const prepareAssetsUrl = (params: GetAssetsPayload): string | null => {

    try {
        const limit: string = (params.limit ?? DEFAULT_ASSETS_LIMIT).toString();
        const offset: string = (params.offset ?? DEFAULT_ASSETS_OFFSET).toString();
        const url = new URL(ASSETS_ENDPOINT);
	
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);
	
        if (params.search !== undefined) {
            url.searchParams.append('search', params.search);
        }
		
        return url.toString();
    } catch {
        return null;
    }
    
};

export const mockAssetsRequest = async (page: Page) => {
    const mockedResponse = {
        data: mockedAssets,
        timestamp: Date.now(),
    };
	
    await page.route(ASSETS_ENDPOINT, (route: { fulfill: (arg0: { status: number; body: string; }) => any; }) => route.fulfill({
        status: 200,
        body: JSON.stringify(mockedResponse),
    }));
};
