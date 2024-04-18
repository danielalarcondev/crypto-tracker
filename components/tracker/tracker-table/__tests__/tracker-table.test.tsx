import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import TrackerTable from '@components/tracker/tracker-table/tracker-table';
import { Asset } from '@common-types/assets';
import { defaultNameCelltUrl } from '@components/tracker/tracker-table/tracker-asset-name-cell/tracker-asset-name-cell';

const FAKE_ASSETS: Asset[] = [
    {
        id: 'bitcoin',
        rank: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        supply: '17193925.0000000000000000',
        maxSupply: '21000000.0000000000000000',
        marketCapUsd: '119150835874.4699281625807300',
        volumeUsd24Hr: '2927959461.1750323310959460',
        priceUsd: '6929.8217756835584756',
        changePercent24Hr: '-0.8101417214350335',
        vwap24Hr: '7175.0663247679233209'
	  },
	  {
        id: 'ethereum',
        rank: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        supply: '101160540.0000000000000000',
        maxSupply: null,
        marketCapUsd: '40967739219.6612727047843840',
        volumeUsd24Hr: '1026669440.6451482672850841',
        priceUsd: '404.9774667045200896',
        changePercent24Hr: '-0.0999626159535347',
        vwap24Hr: '415.3288028454417241'
	  }
];

describe('TrackerTable: ', () => {

    it('should render correctly', () => {

        const { container } = render(<TrackerTable assets={FAKE_ASSETS} />);
        expect(container).toMatchSnapshot();
    });

    describe('Name cell: ', () => {
        it('should render correct image', () => {

            render(<TrackerTable assets={[FAKE_ASSETS[0]]} />);
	
            const img = screen.getByTestId('tracker-table-name-image');
            expect(img.getAttribute('src')).toBe(`http://localhost/_next/image?url=https%3A%2F%2Fassets.coincap.io%2Fassets%2Ficons%2F${FAKE_ASSETS[0].symbol.toLocaleLowerCase()}%402x.png&w=64&q=75`);
        });
	
        it('should render fallback image on error', () => {
	
            render(<TrackerTable assets={[FAKE_ASSETS[0]]} />);
	
            const img = screen.getByTestId('tracker-table-name-image');
			
            fireEvent.error(img);
            expect(img.getAttribute('src')).toBe(defaultNameCelltUrl);
        });
    });
});
