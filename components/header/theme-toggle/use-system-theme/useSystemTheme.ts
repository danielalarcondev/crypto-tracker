import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

const TAILWIND_DARK_SELECTOR_CLASS = 'dark';
const BROWSER_PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';
export const THEME_LOCAL_STORAGE_KEY = 'THEME_CONFIGURATION';

export enum ThemeConfig {
	DARK = 'Dark',
	LIGHT = 'Light'
}

interface SystemThemeResult {
	isThemeSwitcherChecked: boolean,
	setIsThemeSwitcherChecked: Dispatch<SetStateAction<boolean>>
}

const useSystemTheme = (): SystemThemeResult => {

    const [isThemeSwitcherChecked, setIsThemeSwitcherChecked] = useState<boolean>(false);
    const documentBody = useRef<HTMLElement | null>(null);

    const toggleTheme = useCallback((force: boolean) => {
        documentBody.current?.classList.toggle(TAILWIND_DARK_SELECTOR_CLASS, force);
    }, []);

    const getThemeConfig = useCallback((): ThemeConfig => {

        const localStorageTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

        if (localStorageTheme) {
            return localStorageTheme as ThemeConfig;
        }

        const browserTheme = window.matchMedia(BROWSER_PREFERS_COLOR_SCHEME_DARK)?.matches ? ThemeConfig.DARK : ThemeConfig.LIGHT;
        return browserTheme;
    }, []);
	
    useEffect(() => {
        const theme = getThemeConfig();
        documentBody.current = document.body;

        if (theme === ThemeConfig.DARK) {
            setIsThemeSwitcherChecked(true);
            toggleTheme(true);
        }
    }, [getThemeConfig, setIsThemeSwitcherChecked, toggleTheme]);

    useEffect(() => {
        toggleTheme(isThemeSwitcherChecked);
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, isThemeSwitcherChecked ? ThemeConfig.DARK : ThemeConfig.LIGHT);
    }, [isThemeSwitcherChecked, toggleTheme]);

    return {
        isThemeSwitcherChecked,
        setIsThemeSwitcherChecked
    };
};

export default useSystemTheme;
