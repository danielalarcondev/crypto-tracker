'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

import NoResults from '@components/tracker/no-results/no-results';
import TrackerPagination from '@components/tracker/tracker-pagination/tracker-pagination';
import { useTrackerRequest } from '@components/tracker/tracker-request/use-tracker-request';
import TrackerTable from '@components/tracker/tracker-table/tracker-table';
import TrackerTableSkeleton from '@components/tracker/tracker-table/tracker-table-skeleton';
import { useTrackerPage } from '@components/tracker/tracker-page/use-tracker-page';

import { Routes } from '@utils/routes';

const INITIAL_RETRY_COUNTER = 0;
const MAX_RETRIES_AMOUNT = 2;

export default function Tracker() {

    const tableRef = useRef<HTMLDivElement>(null);
    const onRetryCounter = useRef(INITIAL_RETRY_COUNTER);

    const router = useRouter();
    const { assets, requestGetAssets, isRequesting, limit, maxAmountAssets } = useTrackerRequest(tableRef);
    const { currentPage, setCurrentPage } = useTrackerPage();

    const shouldShowLoading = isRequesting && !assets?.length;
    const shouldShowTable = currentPage !== null && Boolean(assets.length);
    const shouldShowNoResults = !assets.length && !isRequesting;

    const onRetry = useCallback(() => {

        if (currentPage === null) {
            return;
        }
        if (onRetryCounter.current >= MAX_RETRIES_AMOUNT) {
            onRetryCounter.current = INITIAL_RETRY_COUNTER;
            router.push(Routes.TRACKER);

        } else {
            requestGetAssets(currentPage);
            onRetryCounter.current++;
        }

    }, [currentPage, requestGetAssets, router]);

    useEffect(() => {

        if (currentPage === null) {
            return;
        }

        requestGetAssets(currentPage);
    }, [requestGetAssets, currentPage]);

    return (
        <div
            data-testid="tracker"
            className={[
                'flex', 
                'flex-col', 
                'gap-6',
                'w-full']
                .join(' ')
            }
        >

            { shouldShowNoResults && (
                <NoResults onRetry={onRetry} />
            )}

            { !shouldShowNoResults && (
                <div 
                    className={[
                        'rounded-lg', 
                        'border', 
                        'border-neutral-300', 
                        ['bg-neutral-100', 'dark:bg-neutral-600'].join(' ')]
                        .join(' ')
                    }
                >

                    { shouldShowLoading && (
                        <TrackerTableSkeleton recordsNumber={limit} />
                    )}
				
                    { shouldShowTable && (
                        <>
                            <TrackerTable ref={tableRef} assets={assets} />
                            <TrackerPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={Math.ceil(maxAmountAssets / limit)} />
                        </>
                    
                    )}
                </div>
            )}
			
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div>
    );
}
