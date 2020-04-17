export const ThemeReducer = (state = 'systemStandard', action) => {
    if (action.type === 'SET_THEME') {
        return action.theme.value
    } else {
        return state
    }
};
