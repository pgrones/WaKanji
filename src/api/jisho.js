const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();

/** Small Wrapper around the API I'm using for the example sentences **/

export const searchForPhrase = (phrase, callback) => {
    jisho.searchForPhrase(phrase)
        .then(result => {
            callback(result.results)
        })
        .catch(err => {
            console.log(err); //TODO better error handling
        })
}

export const searchForKanji = (kanji, callback) => {
    jisho.searchForKanji(kanji)
        .then(result => {
            callback(result.results)
        })
        .catch(err => {
            console.log(err); //TODO better error handling
        })
}

export const searchForExamples = (kanji, callback) => {
    jisho.searchForExamples(kanji)
        .then(result => {
            callback(result.results)
        })
        .catch(err => {
            console.log(err); //TODO better error handling
        })
}
