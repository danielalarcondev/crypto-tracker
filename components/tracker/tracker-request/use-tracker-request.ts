import { Asset, GetAssetsResponse } from '@common-types/assets';
import * as AssetsService from '@services/assets';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';

const LIMIT = 50;
const INIT_MAX_AMOUNT_ASSETS = 0;
export const TABLE_TOP_MARGIN = 80;
const ONE = 1;

interface TrackerRequestResult {
	assets: Asset[],
	requestGetAssets:  (page: number) => Promise<void>,
	isRequesting: boolean,
	limit: number,
	maxAmountAssets: number
}

export const useTrackerRequest = (ref: RefObject<HTMLDivElement>): TrackerRequestResult => {

    const [assets, setAssets] = useState<Asset[]>([]);
    const [isRequesting, setIsRequesting] = useState<boolean>(true);

    const requestErrorAlertId = useRef<Id | null>(null);
    const maxAmountAssets = useRef<number>(INIT_MAX_AMOUNT_ASSETS);

    const handleRequestSuccess = useCallback((response: GetAssetsResponse) => {
        setAssets(response.data);

        if (requestErrorAlertId.current) {
            toast.dismiss(requestErrorAlertId.current);
            requestErrorAlertId.current = null;
        }
    }, []);

    const handleRequestFail = useCallback((response: GetAssetsResponse) => {
		
        if (response.error) {
            requestErrorAlertId.current = toast.error(response.error.errorMessage, {
                toastId: response.error.toString()
            });
        }
    }, []);

    const scrollToTopOfTable = useCallback(() => {
        if ( ref?.current?.offsetTop !== undefined) {
            window.scrollTo({ top: ref.current.offsetTop  - TABLE_TOP_MARGIN, behavior: 'smooth'});
        }
    }, [ref]);

    const requestGetAssets = useCallback(async (page: number) => {
        
        setAssets([]);
        setIsRequesting(true);
        scrollToTopOfTable();
		
        const offset = (page - ONE) * LIMIT;
        const response = await AssetsService.getAssets({ limit: LIMIT, offset });

        if (response.error) {
            handleRequestFail(response);
        } else {
            handleRequestSuccess(response);
        }

        setIsRequesting(false);
    }, [handleRequestFail, handleRequestSuccess, scrollToTopOfTable]);

    useEffect(() => {

        const getMaxAmountAssets = async () => {
            maxAmountAssets.current = await AssetsService.getMaxAmountAssets();
        };

        getMaxAmountAssets();
    }, []);

    return {
        assets,
        requestGetAssets,
        isRequesting,
        limit: LIMIT,
        maxAmountAssets: maxAmountAssets.current
    };
};
