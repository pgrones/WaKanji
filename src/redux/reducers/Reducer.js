import {combineReducers} from "redux";
import {ThemeReducer} from "./ThemeReducer";
import {GradeReducer} from "./GradeReducer";
import {KanjiInfoReducer, KanjiReducer} from "./KanjiReducer";

export const Reducer = combineReducers({
    theme: ThemeReducer,
    grades: GradeReducer,
    kanji: KanjiReducer,
    kanjiInfo: KanjiInfoReducer
});
