export const ThemeReducer = (state = {theme: 'light'}, action) => {
    if (action.type === 'SET_THEME') {
        return action.theme
    } else {
        return state
    }
};

