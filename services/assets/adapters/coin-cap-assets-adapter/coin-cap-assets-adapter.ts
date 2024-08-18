import { Asset, GetAssetsResponse } from '@common-types/assets';
import { parseAssetIconId, prepareCoinCapAssetsUrl } from '@services/assets/adapters/coin-cap-assets-adapter/helpers';
import { GetCoinCapAssetResponse, GetCoinCapAssetsPayload } from '@services/assets/adapters/coin-cap-assets-adapter/types';
import { urlErrorResponse, defaultErrorResponse } from '@services/assets/utils';

export const COIN_CAP_ASSETS_ENDPOINT = 'https://api.coincap.io/v2/assets';
const MAX_AMOUNT_ASSETS = 2296;

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

        const coinCapData: GetCoinCapAssetResponse = await response.json();

        const assets: Asset[] = coinCapData.data.map((asset) => ({
            ...asset,
            rank: Number(asset.rank),
            supply: Number(asset.supply),
            maxSupply: (asset.maxSupply && asset.maxSupply !== 'null') ? Number(asset.maxSupply) : null,
            marketCapUsd: Number(asset.marketCapUsd),
            volumeUsd24Hr: Number(asset.volumeUsd24Hr),
            priceUsd: Number(asset.priceUsd),
            changePercent24Hr: Number(asset.changePercent24Hr),
            vwap24Hr: Number(asset.vwap24Hr)
        }));

        const data: GetAssetsResponse = {
            ...coinCapData,
            data: assets
        };

        return data;

    } catch(error) {
        return defaultErrorResponse;
    }
};

export const getCoinCapAssetIconUrl = async (symbol: string)  => await new Promise<string>((resolve) => {
    resolve(`https://assets.coincap.io/assets/icons/${parseAssetIconId(symbol)}@2x.png`);
});

export const getMaxAmountAssets = async ()  => await new Promise<number>((resolve) => {
    resolve(MAX_AMOUNT_ASSETS);
});

const CoinCapAssetsAdapter = {
    getAssets,
    getCoinCapAssetIconUrl,
    getMaxAmountAssets
};

export default CoinCapAssetsAdapter;
