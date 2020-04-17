export const ThemeReducer = (state = 'systemStandard', action) => {
    if (action.type === 'SET_THEME') {
        return action.theme.value
    } else {
        return state
    }
};

export const ExpandedReducer = (state = false, action) =>{
    if (action.type === 'SET_EXPANDED') {
        return action.expanded
    } else {
        return state
    }
};
