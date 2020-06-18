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
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
}, action) => {
    if (action.type === 'SET_GOT_IT_AMOUNT_BY_GRADE') {
        state[action.grade.id] = action.grade.amount;
        return {...state}
    } else {
        return state
    }
};
