import {toHiragana, toKatakana, toRomaji} from "wanakana";

export const convert = (item, reading) =>{
    switch (reading) {
        case 'romaji':
            return toRomaji(item);
        case 'hiragana':
            return toHiragana(item);
        case 'katakana':
            return toKatakana(item);
        default:
            console.log('Reading not found ' + reading);
    }
};
