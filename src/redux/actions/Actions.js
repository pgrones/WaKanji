/**
 * Redux actions various global states
 */

export const setTheme = theme => ({
    type: 'SET_THEME',
    theme
});

export const setKunyomi = reading => ({
    type: 'SET_KUNYOMI',
    reading
});

export const setOnyomi = reading => ({
    type: 'SET_ONYOMI',
    reading
});

export const setFurigana = furigana => ({
    type: 'SET_FURIGANA',
    furigana
});

export const setSkipAnimations = skipAnimations => ({
    type: 'SET_SKIP_ANIMATIONS',
    skipAnimations
});

export const setAnimationSpeed = animationSpeed => ({
    type: 'SET_ANIMATION_SPEED',
    animationSpeed
});

export const setKanji = kanji => ({
    type: 'SET_KANJI',
    kanji
});

export const setGotItAmount = amount => ({
    type: 'SET_GOT_IT_AMOUNT',
    amount
});

export const setNavigationVisible = visible => ({
    type: 'SET_NAVIGATION_VISIBLE',
    visible
});


