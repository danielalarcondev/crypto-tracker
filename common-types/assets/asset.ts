import { HttpError } from '@common-types/error';

export interface Asset {
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
	vwap24Hr: string,
}

export interface GetAssetPayload {
	id: string
}

export interface GetAssetResponse {
	data: Asset, 
	timestamp: number
}

export interface GetAssetsPayload {
	search?: string,
	ids?: string[],
	limit?: number,
	offset?: number
}

export interface GetAssetsResponse {
	data: Asset[],
	timestamp: number,
	error?: HttpError
}
