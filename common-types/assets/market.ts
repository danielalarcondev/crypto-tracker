export interface AssetExchange {
	exchangeId: string,
	baseId: string,
	quoteId: string,
	baseSymbol: string,
	quoteSymbol: string,
	volumeUsd24Hr: string,
	priceUsd: string,
	volumePercent: string
}

export interface GetAssetMarketsPayload {
	id: string,
	limit?: number,
	offset?: number
}

export interface GetAssetMarketsResponse {
	data: AssetExchange[],
	timestamp: number
}
