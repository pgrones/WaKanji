import {combineReducers} from "redux";
import {KunyomiReducer, OnyomiReducer, ThemeReducer} from "./SettingsReducer";
import {GradeReducer, KanjiReducer} from "./LearnReducer";
import {DBReducer} from "./DBReducer";
import {NavigationReducer} from "./PracticeReducer";

export const Reducer = combineReducers({
    dbLoaded: DBReducer,
    theme: ThemeReducer,
    kunyomi: KunyomiReducer,
    onyomi: OnyomiReducer,
    grades: GradeReducer,
    kanji: KanjiReducer,
    navigationVisible: NavigationReducer
    // kanjiInfo: KanjiInfoReducer
});
