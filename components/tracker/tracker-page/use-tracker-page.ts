import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState, useCallback, useMemo } from 'react';

const INITIAL_PAGE = 1;

interface TrackerUrlResult {
	currentPage: number | null,
	setCurrentPage: Dispatch<SetStateAction<number | null>>
}

export const useTrackerPage = (): TrackerUrlResult => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number | null>(null);

    const prevPageParam = useRef<string | null>(null);
    const prevPage = useRef<number | null>(null);

    const isFirstLoad = currentPage === null;

    const handlePageNoSpecified = useCallback(() => {

        const currentParams = new URLSearchParams(searchParams.toString());

        setCurrentPage(INITIAL_PAGE);
        currentParams.set('page', INITIAL_PAGE.toString());
        window.history.replaceState(null, '', `?${currentParams.toString()}`);
		
        prevPageParam.current = INITIAL_PAGE.toString();
        prevPage.current = INITIAL_PAGE;

    }, [searchParams]);

    // First load
    useEffect(() => {

        const currentParams = new URLSearchParams(searchParams.toString());
        const urlPageParam = currentParams.get('page');
		
        if (!isFirstLoad) {
            return;
        }

        if (urlPageParam === null) {
            handlePageNoSpecified();
            return;
        }

        setCurrentPage(Number(urlPageParam));
        prevPageParam.current = urlPageParam;
        prevPage.current = Number(urlPageParam);

    }, [isFirstLoad, searchParams, handlePageNoSpecified]);

    // Page changes through pagination
    useEffect(() => {

        const pageHasChangedThroughPagination = currentPage !== prevPage.current;

        if (isFirstLoad || !pageHasChangedThroughPagination) {
            return;
        }

        const currentParams = new URLSearchParams(searchParams.toString());
        const urlPageParam = currentParams.get('page');

        if (urlPageParam !== null && Number(urlPageParam) === currentPage) {
            return;
        }

        currentParams.set('page', currentPage.toString());
        window.history.pushState(null, '', `?${currentParams.toString()}`);
        
        prevPageParam.current = currentPage.toString();
        prevPage.current = currentPage;

    }, [currentPage, isFirstLoad, searchParams]);

    // Page changes through url
    useEffect(() => {
        
        const currentParams = new URLSearchParams(searchParams.toString());
        const urlPageParam = currentParams.get('page');

        const pageHasChangedThroughUrl = urlPageParam !== prevPageParam.current;
		
        if (isFirstLoad || !pageHasChangedThroughUrl) {
            return;
        }
		
        if (urlPageParam === null) {
            handlePageNoSpecified();
            return;
        }

        setCurrentPage(Number(urlPageParam));

        prevPageParam.current = urlPageParam;
        prevPage.current = Number(urlPageParam);

    }, [isFirstLoad, searchParams, handlePageNoSpecified]);


    return {
        currentPage,
        setCurrentPage
    };

};
