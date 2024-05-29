'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const INITIAL_SCROLL = 0;
const SCROLL_HANDLER_DELAY = 200;
export const XS_MEDIA_QUERY = 640;

interface HeaderScrollResult {
	shouldHideHeader: boolean
}

export const useHeaderScroll = (isMenuOpen: boolean, viewportWidth: number):HeaderScrollResult => {

    const prevScrollPosition = useRef<number>(INITIAL_SCROLL);
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const handleScrollInterval = useRef<(ReturnType<typeof setTimeout>) | null>(null);

    const handleScroll = useCallback(() => {

        if (handleScrollInterval.current) {
            return;
        }

        handleScrollInterval.current = setTimeout(() => {
            const currentScroll = window.scrollY;
            const isScrollUp = currentScroll < prevScrollPosition.current;
            const isScrollDown = currentScroll > prevScrollPosition.current;

            if (isScrollUp || isScrollDown) {
                setShouldHideHeader(isScrollDown);
            }

            prevScrollPosition.current = currentScroll;
            handleScrollInterval.current = null;

        }, SCROLL_HANDLER_DELAY);
		

	  }, []);

	  useEffect(() => {

        const isNotValidWidth = viewportWidth <= XS_MEDIA_QUERY;

        if (isMenuOpen || isNotValidWidth) {
            window.removeEventListener('scroll', handleScroll);
            setShouldHideHeader(false);

        } else {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

	  }, [handleScroll, isMenuOpen, viewportWidth]);
	
	  return {
        shouldHideHeader
	  };

};
