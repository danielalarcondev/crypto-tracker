'use server';

import { GetAssetsPayload, GetAssetsResponse } from '@common-types/assets';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_CODE, URL_ERROR_MESSAGE, URL_ERROR_CODE, prepareAssetsUrl } from '@services/assets/utils';

const defaultErrorResponse: GetAssetsResponse = {
    data: [],
    timestamp: Date.now(),
    error: { 
        errorMessage: DEFAULT_ERROR_MESSAGE, 
        httpError: DEFAULT_ERROR_CODE
    }
};

const urlErrorResponse: GetAssetsResponse = {
    data: [],
    timestamp: Date.now(),
    error: { 
        errorMessage: URL_ERROR_MESSAGE, 
        httpError: URL_ERROR_CODE
    }
};

export const getAssets = async ({ search, ids, limit, offset }: GetAssetsPayload): Promise<GetAssetsResponse> => {
    try {
        const url = prepareAssetsUrl({ search, ids, limit, offset });

        if (!url) {
            return urlErrorResponse;
        }
		
        const response = await fetch(url, { cache: 'force-cache', method: 'GET' });

        if (!response.ok) {
            return {
                data: [],
                timestamp: Date.now(),
                error: { 
                    errorMessage: response.statusText, 
                    httpError: response.status 
                }
            };
        }

        const dataResponse: GetAssetsResponse = await response.json();
        return dataResponse;

    } catch(error) {
        return defaultErrorResponse;
    }
};
