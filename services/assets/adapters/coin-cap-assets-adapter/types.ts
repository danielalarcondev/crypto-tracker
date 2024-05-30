import { HttpError } from '@common-types/error';

export interface CoinCapAsset {
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
	vwap24Hr: string
}

export interface GetCoinCapAssetResponse {
	data: CoinCapAsset[], 
	timestamp: number
	error?: HttpError
}

export interface GetCoinCapAssetsPayload {
	search?: string,
	ids?: string[],
	limit?: number,
	offset?: number
}
