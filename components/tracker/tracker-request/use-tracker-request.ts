import { Asset, GetAssetsResponse } from '@common-types/assets';
import { getAssets } from '@services/assets';
import { RefObject, useCallback, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';

interface TrackerRequestResult {
	assets: Asset[],
	requestGetAssets:  (limit: number, offset: number) => Promise<void>,
	isRequesting: boolean,
	requestCurrentPage: (limit: number, currentPage: number) => void
}

const TABLE_TOP_MARGIN = 80;

export const useTrackerRequest = (ref: RefObject<HTMLDivElement>): TrackerRequestResult => {

    const ONE = 1;
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isRequesting, setIsRequesting] = useState<boolean>(true);
    const requestErrorAlertId = useRef<Id | null>(null);

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
        if ( ref?.current?.offsetTop) {
            window.scrollTo({ top: ref.current.offsetTop  - TABLE_TOP_MARGIN, behavior: 'smooth'});
        }
    }, [ref]);

    const requestGetAssets = useCallback(async (limit: number, offset: number) => {
        
        setAssets([]);
        setIsRequesting(true);
        scrollToTopOfTable();
		
        const response = await getAssets({ limit, offset });

        if (response.error) {
            handleRequestFail(response);
        } else {
            handleRequestSuccess(response);
        }

        setIsRequesting(false);
    }, [handleRequestFail, handleRequestSuccess, scrollToTopOfTable]);

    const requestCurrentPage = useCallback((limit: number, currentPage: number) => {
        const offset = limit * (currentPage - ONE);
        requestGetAssets(limit, offset);
    }, [requestGetAssets]);

    return {
        assets,
        requestGetAssets,
        requestCurrentPage,
        isRequesting
    };
};
