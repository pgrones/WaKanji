import {combineReducers} from "redux";
import {ThemeLoadedReducer, ThemeReducer} from "./ThemeReducer";
import {GradeReducer} from "./GradeReducer";
import {KanjiInfoReducer, KanjiReducer} from "./KanjiReducer";

export const Reducer = combineReducers({
    theme: ThemeReducer,
    themeLoaded: ThemeLoadedReducer,
    grades: GradeReducer,
    kanji: KanjiReducer,
    kanjiInfo: KanjiInfoReducer
});
