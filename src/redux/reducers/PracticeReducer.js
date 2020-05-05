export const NavigationReducer = (state = true, action) => {
    if (action.type === 'SET_NAVIGATION_VISIBLE') {
        return action.visible
    } else {
        return state
    }
};
