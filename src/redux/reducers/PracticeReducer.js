export const NavigationReducer = (state = true, action) => {
    if (action.type === 'SET_NAVIGATION_VISIBLE') {
        return action.visible
    } else {
        return state
    }
};

export const GotItAmountReducer = (state = 0, action) => {
    if (action.type === 'SET_GOT_IT_AMOUNT') {
        return action.amount
    } else {
        return state
    }
};
