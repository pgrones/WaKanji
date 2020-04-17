import {toHiragana, toKatakana, toRomaji} from "wanakana";

export const convert = (item, reading) =>{
    switch (reading) {
        case 'romaji':
            return toRomaji(item);
        case 'hiragana':
            return toHiragana(item).replace(/、/g, ',');
        case 'katakana':
            return toKatakana(item).replace(/、/g, ',');
        default:
            console.log('Reading not found ' + reading);
    }
};
