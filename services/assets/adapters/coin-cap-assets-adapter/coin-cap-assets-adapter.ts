import { GetAssetsResponse } from '@common-types/assets';
import { parseAssetIconId, prepareCoinCapAssetsUrl } from '@services/assets/adapters/coin-cap-assets-adapter/helpers';
import { GetCoinCapAssetResponse, GetCoinCapAssetsPayload } from '@services/assets/adapters/coin-cap-assets-adapter/types';
import { urlErrorResponse, defaultErrorResponse } from '@services/assets/utils';

export const COIN_CAP_ASSETS_ENDPOINT = 'https://api.coincap.io/v2/assets';

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

export const getCoinCapAssetIconUrl = async (symbol: string)  => await new Promise<string>((resolve) => {
    resolve(`https://assets.coincap.io/assets/icons/${parseAssetIconId(symbol)}@2x.png`);
});

const CoinCapAssetsAdapter = {
    getAssets,
    getCoinCapAssetIconUrl
};

export default CoinCapAssetsAdapter;
