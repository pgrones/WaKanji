export const ThemeReducer = (state = {theme: 'light'}, action) => {
    if (action.type === 'SET_THEME') {
        return action.theme.value
    } else {
        return state
    }
};

