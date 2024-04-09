import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

const TAILWIND_DARK_SELECTOR_CLASS = 'dark';
const BROWSER_PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';

interface SystemThemeResult {
	isThemeSwitcherChecked: boolean,
	setIsThemeSwitcherChecked: Dispatch<SetStateAction<boolean>>
}

const useSystemTheme = ():SystemThemeResult => {

    const [isThemeSwitcherChecked, setIsThemeSwitcherChecked] = useState<boolean>(false);
    const documentRoot = useRef<HTMLElement | null>(null);

    const toggleTheme = useCallback((force: boolean) => {
        documentRoot.current?.classList.toggle(TAILWIND_DARK_SELECTOR_CLASS, force);
    }, []);
	
    useEffect(() => {
        const isBrowserSchemeDark = Boolean(window.matchMedia(BROWSER_PREFERS_COLOR_SCHEME_DARK)?.matches);
        documentRoot.current = window.document.documentElement;

        if (isBrowserSchemeDark) {
            setIsThemeSwitcherChecked(true);
            toggleTheme(true);
        }
    }, [setIsThemeSwitcherChecked, toggleTheme]);

    useEffect(() => {
        toggleTheme(isThemeSwitcherChecked);
    }, [isThemeSwitcherChecked, toggleTheme]);

    return {
        isThemeSwitcherChecked,
        setIsThemeSwitcherChecked
    };
};

export default useSystemTheme;
