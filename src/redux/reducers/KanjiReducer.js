export const KanjiReducer = (state = [], action) => {
    if (action.type === 'SET_KANJI') {
        return action.kanji
    } else {
        return state
    }
};

// export const KanjiInfoReducer = (state = {}, action) => {
//     if (action.type === 'SET_KANJI_INFO') {
//         return action.info
//     } else {
//         return state
//     }
// };

