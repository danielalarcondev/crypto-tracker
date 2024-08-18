import { Asset } from '@common-types/assets';
import { XS_MEDIA_QUERY } from '@components/header/use-header-scroll/use-header-scroll';

const ONE_PX = 1;

export const SMALL_SCREEN = ({ width: XS_MEDIA_QUERY - ONE_PX, height: 980 });
export const LARGE_SCREEN = ({ width: 1366, height: 768 });

export const mockedAssets: Asset[] = [
    {
        id: 'bitcoin',
        rank: 1,
        symbol: 'BTC',
        name: 'Bitcoin',
        supply: 17193925.0000000000000000,
        maxSupply: 21000000.0000000000000000,
        marketCapUsd: 119150835874.46,
        volumeUsd24Hr: 2927959461.17,
        priceUsd: 6929.82,
        changePercent24Hr: -0.8101417214350335,
        vwap24Hr: 7175.06
	  },
	  {
        id: 'ethereum',
        rank: 2,
        symbol: 'ETH',
        name: 'Ethereum',
        supply: 101160540,
        maxSupply: null,
        marketCapUsd: 40967739219.66,
        volumeUsd24Hr: 1026669440.64,
        priceUsd: 404.97,
        changePercent24Hr: -0.09,
        vwap24Hr: 415.32
	  }
];
