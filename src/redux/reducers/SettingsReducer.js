export const ThemeReducer = (state = 'systemStandard', action) => {
    if (action.type === 'SET_THEME') {
        return action.theme.value
    } else {
        return state
    }
};

export const KunyomiReducer = (state = 'hiragana', action) => {
    if (action.type === 'SET_KUNYOMI') {
        return action.reading.value
    } else {
        return state
    }
};

export const OnyomiReducer = (state = 'katakana', action) => {
    if (action.type === 'SET_ONYOMI') {
        return action.reading.value
    } else {
        return state
    }
};

export const FuriganaReducer = (state = 'true', action) => {
    if (action.type === 'SET_FURIGANA') {
        return action.furigana.value
    } else {
        return state
    }
};
