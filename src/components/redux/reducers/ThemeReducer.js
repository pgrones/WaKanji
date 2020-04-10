const themes = (state = {theme: 'light'}, action) => {
    if (action.type === 'SET_THEME') {
        return {theme: action.theme}
    } else {
        return state
    }
};

export default themes;
