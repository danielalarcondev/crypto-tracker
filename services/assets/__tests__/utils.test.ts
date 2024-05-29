import { expect, it, describe } from '@jest/globals';
import { ASSETS_ENDPOINT, DEFAULT_ASSETS_LIMIT, DEFAULT_ASSETS_OFFSET, prepareAssetsUrl } from '@services/assets/utils';

describe('Assets utils: ', () => {

    it('prepareUrl should return default url', () => {
        const url = prepareAssetsUrl({});
        expect(url).toBe(`${ASSETS_ENDPOINT}?limit=${DEFAULT_ASSETS_LIMIT}&offset=${DEFAULT_ASSETS_OFFSET}`);
    });

    it('prepareUrl should return custom url', () => {

        const limit = 50;
        const offset = 33;
        const search = 'bitcoin';

        let url = prepareAssetsUrl({ limit });
        expect(url).toBe(`${ASSETS_ENDPOINT}?limit=${limit}&offset=${DEFAULT_ASSETS_OFFSET}`);

        url = prepareAssetsUrl({ offset });
        expect(url).toBe(`${ASSETS_ENDPOINT}?limit=${DEFAULT_ASSETS_LIMIT}&offset=${offset}`);
		
        url = prepareAssetsUrl({ limit, offset });
        expect(url).toBe(`${ASSETS_ENDPOINT}?limit=${limit}&offset=${offset}`);

        url = prepareAssetsUrl({ search });
        expect(url).toBe(`${ASSETS_ENDPOINT}?limit=${DEFAULT_ASSETS_LIMIT}&offset=${DEFAULT_ASSETS_OFFSET}&search=${search}`);
    });
});
