const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();

export const searchForPhrase = async (phrase) => {
    return await jisho.searchForPhrase(phrase)
}

export const searchForKanji = async (kanji) => {
    return await jisho.searchForKanji(kanji)
}

export const searchForExamples = async (kanji) => {
    return await jisho.searchForExamples(kanji)
}
