import '@testing-library/jest-dom/jest-globals';

import { renderHook, fireEvent, waitFor, act } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import { XS_MEDIA_QUERY, useHeaderScroll } from '@components/header/use-header-scroll/use-header-scroll';

const DEFAULT_VIEWPORT_WIDTH = 768;

const scrollDown = () => {
    Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 500
    });
    fireEvent.scroll(window);
};

const scrollUp = () => {
    Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 200
    });
    fireEvent.scroll(window);
};


describe('Use Header Scroll: ', () => {
    it('should return correct values first on scroll down and then on scroll up', async () => {
		
        jest.useFakeTimers();

        const isMenuOpen = false;
        const { result } = renderHook(() => useHeaderScroll(isMenuOpen, DEFAULT_VIEWPORT_WIDTH));
		
        expect(result.current.shouldHideHeader).toEqual(false);
        
        scrollDown();
        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(result.current.shouldHideHeader).toEqual(true);
        });

        scrollUp();

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(result.current.shouldHideHeader).toEqual(false);
        });

        jest.useRealTimers();

    });

    it('should return \'shouldHideHeader: false\' if menu is expanded', () => {

        jest.useFakeTimers();

        const isMenuOpen = true;
        const { result } = renderHook(() => useHeaderScroll(isMenuOpen, DEFAULT_VIEWPORT_WIDTH));
		
        scrollDown();
        act(() => {
            jest.runAllTimers();
        });

        expect(result.current.shouldHideHeader).toEqual(false);

        jest.useRealTimers();
    });

    it('should return \'shouldHideHeader: false\' if viewport is too small', async () => {

        jest.useFakeTimers();

        const isMenuOpen = false;
        const { result } = renderHook(() => useHeaderScroll(isMenuOpen, XS_MEDIA_QUERY));
		
        const { shouldHideHeader } = result.current;

        scrollDown();
        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(shouldHideHeader).toBe(false);
        });

        jest.useRealTimers();
    });

    it('should return \'shouldHideHeader: false\' if conditions are valid but scroll does not occur', async () => {

        jest.useFakeTimers();

        const isMenuOpen = false;
        const { result } = renderHook(() => useHeaderScroll(isMenuOpen, DEFAULT_VIEWPORT_WIDTH));
		
        expect(result.current.shouldHideHeader).toEqual(false);
        
        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(result.current.shouldHideHeader).toEqual(false);
        });

        jest.useRealTimers();
    });
});
