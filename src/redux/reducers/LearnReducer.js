export const GradeReducer = (state = [], action) => {
    if (action.type === 'SET_GRADES') {
        return action.grades
    } else {
        return state
    }
};

export const KanjiReducer = (state = [], action) => {
    if (action.type === 'SET_KANJI') {
        return action.kanji
    } else {
        return state
    }
};

export const KanjiInfoReducer = (state = null, action) => {
    if (action.type === 'SET_KANJI_INFO') {
        return action.info
    } else {
        return state
    }
};
