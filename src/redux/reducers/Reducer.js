import {combineReducers} from "redux";
import {FuriganaReducer, KunyomiReducer, OnyomiReducer, ThemeReducer} from "./SettingsReducer";
import {GradeReducer, KanjiReducer} from "./LearnReducer";
import {DBReducer} from "./DBReducer";
import {GotItAmountReducer, NavigationReducer} from "./PracticeReducer";

export const Reducer = combineReducers({
    dbLoaded: DBReducer,
    theme: ThemeReducer,
    kunyomi: KunyomiReducer,
    onyomi: OnyomiReducer,
    furigana: FuriganaReducer,
    grades: GradeReducer,
    kanji: KanjiReducer,
    navigationVisible: NavigationReducer,
    gotItAmount: GotItAmountReducer
});
