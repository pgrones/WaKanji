const kanji = (state = [], action) => {
    if (action.type === 'SET_KANJI') {
        return action.kanji
    } else {
        return state
    }
};

export default kanji;
