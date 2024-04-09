
interface ThemeHelper {
	getIsDarkTheme: () => boolean;
    isDarkThemeConfigured: () => boolean;
    // eslint-disable-next-line no-unused-vars
    setIsDarkTheme: (shouldSetToDark: boolean) => void;
}

const IS_DARK_THEME_KEY = 'IS_DARK_THEME';

export const isDarkThemeConfigured = () => localStorage?.getItem(IS_DARK_THEME_KEY) !== null;
export const getIsDarkTheme = () => Boolean(localStorage?.getItem(IS_DARK_THEME_KEY));

export const setIsDarkTheme = (shouldSetToDark: boolean) => {
    localStorage?.setItem(IS_DARK_THEME_KEY, shouldSetToDark.toString());
};

const themeLocalStorage: ThemeHelper = {
    getIsDarkTheme,
    isDarkThemeConfigured,
    setIsDarkTheme
};

export default themeLocalStorage;
 
