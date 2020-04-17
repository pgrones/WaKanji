import {combineReducers} from "redux";
import {ThemeReducer} from "./ThemeReducer";
import {GradeReducer} from "./GradeReducer";
import {KanjiInfoReducer, KanjiReducer} from "./KanjiReducer";
import {DBReducer} from "./DBReducer";

export const Reducer = combineReducers({
    dbLoaded: DBReducer,
    theme: ThemeReducer,
    grades: GradeReducer,
    kanji: KanjiReducer,
    kanjiInfo: KanjiInfoReducer
});
