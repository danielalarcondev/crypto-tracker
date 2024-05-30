import { expect, it, describe } from '@jest/globals';
import { COIN_CAP_ASSETS_ENDPOINT } from '@services/assets/adapters/coin-cap-assets-adapter/coin-cap-assets-adapter';
import { prepareCoinCapAssetsUrl } from '@services/assets/adapters/coin-cap-assets-adapter/helpers';
import { DEFAULT_ASSETS_LIMIT, DEFAULT_ASSETS_OFFSET } from '@services/assets/utils';

describe('Helpers: ', () => {
    it('prepareUrl should return default url', () => {
        const url = prepareCoinCapAssetsUrl({});
        expect(url).toBe(`${COIN_CAP_ASSETS_ENDPOINT}?limit=${DEFAULT_ASSETS_LIMIT}&offset=${DEFAULT_ASSETS_OFFSET}`);
    });
	
    it('prepareUrl should return custom url', () => {
	
        const limit = 50;
        const offset = 33;
        const search = 'bitcoin';
	
        let url = prepareCoinCapAssetsUrl({ limit });
        expect(url).toBe(`${COIN_CAP_ASSETS_ENDPOINT}?limit=${limit}&offset=${DEFAULT_ASSETS_OFFSET}`);
	
        url = prepareCoinCapAssetsUrl({ offset });
        expect(url).toBe(`${COIN_CAP_ASSETS_ENDPOINT}?limit=${DEFAULT_ASSETS_LIMIT}&offset=${offset}`);
		
        url = prepareCoinCapAssetsUrl({ limit, offset });
        expect(url).toBe(`${COIN_CAP_ASSETS_ENDPOINT}?limit=${limit}&offset=${offset}`);
	
        url = prepareCoinCapAssetsUrl({ search });
        expect(url).toBe(`${COIN_CAP_ASSETS_ENDPOINT}?limit=${DEFAULT_ASSETS_LIMIT}&offset=${DEFAULT_ASSETS_OFFSET}&search=${search}`);
    });
});
