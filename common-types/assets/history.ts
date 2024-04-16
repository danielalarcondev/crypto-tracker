export enum AssetHistoryIntervalEnum {
	"1_MINUTE" = "m1",
	"5_MINUTES" = "m5", 
	"15_MINUTES" = "m15", 
	"30_MINUTES" = "m30", 
	"1_HOUR" = "h1", 
	"2_HOURS" = "h2", 
	"6_HOURS" = "h6", 
	"12_HOURS" = "h12", 
	"1_DAY" = "d1"
}

export interface AssetHistory {
	priceUsd: string
    time: number
}

export interface GetAssetHistoryPayload {
	id: string,
	interval: AssetHistoryIntervalEnum
	start?: number,
	end?: number
}

export interface GetAssetHistoryResponse {
	data: History[],
	timestamp: number
}
