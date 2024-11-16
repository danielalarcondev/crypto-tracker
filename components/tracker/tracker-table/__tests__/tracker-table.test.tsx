import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import TrackerTable from '@components/tracker/tracker-table/tracker-table';
import { mockedAssets } from '@tests/utils';
import { defaultAssetIconUrl } from '@components/tracker/tracker-table/tracker-asset-name-cell/tracker-asset-name-cell';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const firstAsset = mockedAssets[ZERO];
const secondAsset = mockedAssets[ONE];
const thirdAsset = mockedAssets[TWO];

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

    describe('Change Percentage: ', () => {
		
        it('negative value should have red text', () => {
	
            render(<TrackerTable assets={[firstAsset]} />);
	
            const changePercentageCell = screen.getByText('-0.81%');

            expect(changePercentageCell.classList.contains('text-red-500')).toBe(true);
            expect(changePercentageCell.classList.contains('text-green-500')).toBe(false);
        });

        it('negative value should have green text', () => {
	
            render(<TrackerTable assets={[secondAsset]} />);
	
            const changePercentageCell = screen.getByText('1.20%');

            expect(changePercentageCell.classList.contains('text-green-500')).toBe(true);
            expect(changePercentageCell.classList.contains('text-red-500')).toBe(false);
        });

        it('zero value should not have especial color', () => {
	
            render(<TrackerTable assets={[thirdAsset]} />);
	
            const changePercentageCell = screen.getByText('0.00%');

            expect(changePercentageCell.classList.contains('text-green-500')).toBe(false);
            expect(changePercentageCell.classList.contains('text-red-500')).toBe(false);
        });

    });
});
