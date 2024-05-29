import { GetAssetsResponse } from '@common-types/assets';

export const DEFAULT_ASSETS_LIMIT = 100;
export const DEFAULT_ASSETS_OFFSET = 0;

export const DEFAULT_ERROR_CODE = 500;
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
export const URL_ERROR_CODE = 404;
export const URL_ERROR_MESSAGE = 'Server could not be reached. Try again later';

export const defaultErrorResponse: GetAssetsResponse = {
    data: [],
    timestamp: Date.now(),
    error: { 
        errorMessage: DEFAULT_ERROR_MESSAGE, 
        httpError: DEFAULT_ERROR_CODE
    }
};

export const urlErrorResponse: GetAssetsResponse = {
    data: [],
    timestamp: Date.now(),
    error: { 
        errorMessage: URL_ERROR_MESSAGE,
        httpError: URL_ERROR_CODE
    }
};
