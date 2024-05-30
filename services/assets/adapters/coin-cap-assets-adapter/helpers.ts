import { COIN_CAP_ASSETS_ENDPOINT } from '@services/assets/adapters/coin-cap-assets-adapter/coin-cap-assets-adapter';
import { GetCoinCapAssetsPayload } from '@services/assets/adapters/coin-cap-assets-adapter/types';
import { DEFAULT_ASSETS_LIMIT, DEFAULT_ASSETS_OFFSET } from '@services/assets/utils';

export const parseAssetIconId = (symbol: string) => {
    const id = symbol.toLocaleLowerCase();
	
    switch(id) {
    case 'iota':
        return 'miota';

    case 'borg':
        return 'chsb';
    case 'pda':
        return 'pla';
	
    case 'vic':
        return 'tomo';

    case 'mnw':
        return 'mrph';

    case 'gft':
        return 'gto';
	
    case 'zkb':
        return 'zks';

    case 'tune':
        return 'matter';

    case 'bttold':
        return 'btt';

    case 'ustc':
        return 'ust';

    case 'poolx':
        return 'poolz';

    case 'rwa':
        return 'xend';

    case 'lunc':
        return 'luna';

    default:
        return id;
    }
};

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
