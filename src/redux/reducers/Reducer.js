import {combineReducers} from "redux";
import {ThemeReducer} from "./SettingsReducer";
import {GradeReducer} from "./LearnReducer";
import {KanjiInfoReducer, KanjiReducer} from "./LearnReducer";
import {DBReducer} from "./DBReducer";

export const Reducer = combineReducers({
    dbLoaded: DBReducer,
    theme: ThemeReducer,
    grades: GradeReducer,
    kanji: KanjiReducer,
    kanjiInfo: KanjiInfoReducer
});
