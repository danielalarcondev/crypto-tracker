'use client';

import NoResults from '@components/tracker/no-results/no-results';
import TrackerPagination from '@components/tracker/tracker-pagination/tracker-pagination';
import { useTrackerRequest } from '@components/tracker/tracker-request/use-tracker-request';
import TrackerTable from '@components/tracker/tracker-table/tracker-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import TrackerTableSkeleton from '@components/tracker/tracker-table/tracker-table-skeleton';

const INITIAL_PAGE = 1;
const LIMIT = 50;
const INITIAL_OFFSET = 0;
const MAX_AMOUNT_ASSETS = 2296;
const TOTAL_PAGES = Math.ceil(MAX_AMOUNT_ASSETS / LIMIT);

export default function Tracker() {

    const tableRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const { assets, requestGetAssets, requestCurrentPage, isRequesting } = useTrackerRequest(tableRef);

    const shouldShowLoading = isRequesting && !assets?.length;
    const shouldShowTable = Boolean(assets.length);
    const shouldShowNoResults = !assets.length && !isRequesting;

    useEffect(() => {
        requestGetAssets(LIMIT, INITIAL_OFFSET);
    }, [requestGetAssets]);

    useEffect(() => {
        requestCurrentPage(LIMIT, currentPage);
    }, [currentPage, requestCurrentPage, requestGetAssets]);

    const onRetry = useCallback(() => {
        requestCurrentPage(LIMIT, currentPage);
    }, [currentPage, requestCurrentPage]);

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
                    <TrackerTableSkeleton recordsNumber={LIMIT} />
                )}
				
                { shouldShowTable && (
                    <>
                        <TrackerTable ref={tableRef} assets={assets} />
                        <TrackerPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={TOTAL_PAGES} />
                    </>
                    
                )}
            </div>

            { shouldShowNoResults && (
                <NoResults onRetry={onRetry} />
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
