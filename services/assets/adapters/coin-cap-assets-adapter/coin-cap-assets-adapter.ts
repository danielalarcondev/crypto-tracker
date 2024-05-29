import { GetAssetsResponse } from '@common-types/assets';
import { HttpError } from '@common-types/error';
import { DEFAULT_ASSETS_LIMIT, DEFAULT_ASSETS_OFFSET, urlErrorResponse, defaultErrorResponse } from '@services/assets/utils';

interface CoinCapAsset {
	id: string,
	rank: string,
	symbol: string,
	name: string,
	supply: string,
	maxSupply: string  | null,
	marketCapUsd: string,
	volumeUsd24Hr: string,
	priceUsd: string,
	changePercent24Hr: string,
	vwap24Hr: string,
}

interface GetCoinCapAssetResponse {
	data: CoinCapAsset[], 
	timestamp: number
	error?: HttpError
}

interface GetCoinCapAssetsPayload {
	search?: string,
	ids?: string[],
	limit?: number,
	offset?: number
}

export const COIN_CAP_ASSETS_ENDPOINT = 'https://api.coincap.io/v2/assets';

export function prepareCoinCapAssetsUrl(params: GetCoinCapAssetsPayload): string | null {

    try {
        const limit: string = (params.limit ?? DEFAULT_ASSETS_LIMIT).toString();
        const offset: string = (params.offset ?? DEFAULT_ASSETS_OFFSET).toString();
        const url = new URL(COIN_CAP_ASSETS_ENDPOINT);
	
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

const getAssets = async ({ search, ids, limit, offset }: GetCoinCapAssetsPayload): Promise<GetAssetsResponse> => {
    try {
        const url = prepareCoinCapAssetsUrl({ search, ids, limit, offset });

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

        const dataResponse: GetCoinCapAssetResponse = await response.json();
        return dataResponse as GetAssetsResponse;

    } catch(error) {
        return defaultErrorResponse;
    }
};

const CoinCapAssetsAdapter = {
    getAssets
};

export default CoinCapAssetsAdapter;
