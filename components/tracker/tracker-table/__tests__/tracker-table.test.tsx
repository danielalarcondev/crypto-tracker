import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import TrackerTable from '@components/tracker/tracker-table/tracker-table';
import { mockedAssets } from '@tests/utils';
import { defaultAssetIconUrl } from '@components/tracker/tracker-table/tracker-asset-name-cell/tracker-asset-name-cell';

const FIRST_INDEX = 0;
const firstAsset = mockedAssets[FIRST_INDEX];

describe('TrackerTable: ', () => {

    it('should render correctly', () => {

        const { container } = render(<TrackerTable assets={mockedAssets} />);
        expect(container).toMatchSnapshot();
    });

    describe('Name cell: ', () => {
        it('should render correct image', () => {

            render(<TrackerTable assets={[firstAsset]} />);
	
            const img = screen.getByTestId('tracker-table-name-image');
            waitFor(() => {
                expect(img.getAttribute('src')).toBe(`${window.location.protocol}//${window.location.hostname}/_next/image?url=https%3A%2F%2Fassets.coincap.io%2Fassets%2Ficons%2F${firstAsset.symbol.toLocaleLowerCase()}%402x.png&w=64&q=75`);
            });
        });
	
        it('should render fallback image on error', () => {
	
            render(<TrackerTable assets={[firstAsset]} />);
	
            const img = screen.getByTestId('tracker-table-name-image');
			
            fireEvent.error(img);
            expect(img.getAttribute('src')).toBe(`${window.location.protocol}//${window.location.hostname}${defaultAssetIconUrl}`);
        });
    });
});
