export const DBReducer = (state = false, action) => {
    if (action.type === 'SET_DB_LOADED') {
        return action.isLoaded
    } else {
        return state
    }
};
