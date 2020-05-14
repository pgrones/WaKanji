import {toHiragana, toKatakana, toRomaji} from "wanakana";

/**
 * Converter to change the characters of different readings
 * @param item The text to convert
 * @param reading The reading to convert to
 * @returns {String}
 */
export const convert = (item, reading) => {
    switch (reading) {
        case 'romaji':
            return toRomaji(item);
        case 'hiragana':
            return toHiragana(item).replace(/、/g, ',');
        case 'katakana':
            return toKatakana(item).replace(/、/g, ',');
        default:
            // Should never actually be reached
            console.log('Reading not found ' + reading);
    }
};
