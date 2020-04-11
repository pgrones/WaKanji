export const ThemeReducer = (state = {theme: 'light'}, action) => {
    if (action.type === 'SET_THEME') {
        return action.theme
    } else {
        return state
    }
};

export const ThemeLoadedReducer = (state = {themeLoaded: false}, action) => {
    if (action.type === 'SET_THEME_LOADED') {
        return action.themeLoaded
    } else {
        return state
    }
};

