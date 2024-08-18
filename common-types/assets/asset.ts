import { HttpError } from '@common-types/error';

export interface Asset {
	id: string,
	rank: number,
	symbol: string,
	name: string,
	supply: number,
	maxSupply: number  | null,
	marketCapUsd: number,
	volumeUsd24Hr: number,
	priceUsd: number,
	changePercent24Hr: number,
	vwap24Hr: number
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
