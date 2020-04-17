export const setDbLoaded = isLoaded => ({
    type: 'SET_DB_LOADED',
    isLoaded
});

export const setTheme = theme => ({
    type: 'SET_THEME',
    theme
});

export const setGrades = grades => ({
    type: 'SET_GRADES',
    grades
});

export const setKanji = kanji => ({
    type: 'SET_KANJI',
    kanji
});

export const setKanjiInfo = info => ({
   type: 'SET_KANJI_INFO',
   info
});

export const setExpanded = expanded => ({
    type: 'SET_EXPANDED',
    expanded
});


