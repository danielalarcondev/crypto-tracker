'use server';

import { GetAssetsPayload, GetAssetsResponse } from '@common-types/assets';
import CoinCapAssetsAdapter from '@services/assets/adapters/coin-cap-assets-adapter/coin-cap-assets-adapter';

export const getAssets = async ({ search, ids, limit, offset }: GetAssetsPayload): Promise<GetAssetsResponse> => await CoinCapAssetsAdapter.getAssets({ search, ids, limit, offset });

export const getAssetIconUrl = async (symbol: string)  => await CoinCapAssetsAdapter.getCoinCapAssetIconUrl(symbol);
