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

export const GotItAmountByGradeReducer = (state = {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1
}, action) => {
    if (action.type === 'SET_GOT_IT_AMOUNT_BY_GRADE') {
        state[action.grade.id] = action.grade.amount;
        return {...state}
    } else {
        return state
    }
};
