import { Asset, GetAssetsResponse } from '@common-types/assets';
import { getAssets } from '@services/assets';
import { useCallback, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';

interface TrackerRequestResult {
	assets: Asset[],
	requestGetAssets:  (offset: number) => Promise<void>,
	isRequesting: boolean,
	requestCurrentPage: (limit: number, currentPage: number) => void
}

export const useTrackerRequest = (): TrackerRequestResult => {

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

    const requestGetAssets = useCallback(async (offset: number) => {
        
        setIsRequesting(true);
        const response = await getAssets({ offset });

        if (response.error) {
            handleRequestFail(response);
        } else {
            handleRequestSuccess(response);
        }

        setIsRequesting(false);
    }, [handleRequestFail, handleRequestSuccess]);

    const requestCurrentPage = useCallback((limit: number, currentPage: number) => {
        const offset = limit * (currentPage - 1);
        requestGetAssets(offset);
    }, [requestGetAssets]);

    return {
        assets,
        requestGetAssets,
        requestCurrentPage,
        isRequesting
    };
};
