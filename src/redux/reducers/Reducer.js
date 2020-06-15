import {combineReducers} from "redux";
import {FuriganaReducer, KunyomiReducer, OnyomiReducer, ThemeReducer} from "./SettingsReducer";
import {KanjiReducer} from "./LearnReducer";
import {GotItAmountReducer, NavigationReducer} from "./PracticeReducer";

export const Reducer = combineReducers({
    theme: ThemeReducer,
    kunyomi: KunyomiReducer,
    onyomi: OnyomiReducer,
    furigana: FuriganaReducer,
    kanji: KanjiReducer,
    navigationVisible: NavigationReducer,
    gotItAmount: GotItAmountReducer
});
