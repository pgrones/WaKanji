import {combineReducers} from "redux";
import {
    AnimationSpeedReducer,
    FuriganaReducer,
    KunyomiReducer,
    OnyomiReducer,
    SkipAnimationsReducer,
    ThemeReducer
} from "./SettingsReducer";
import {KanjiReducer} from "./LearnReducer";
import {GotItAmountByGradeReducer, GotItAmountReducer, NavigationReducer} from "./PracticeReducer";

export const Reducer = combineReducers({
    theme: ThemeReducer,
    kunyomi: KunyomiReducer,
    onyomi: OnyomiReducer,
    furigana: FuriganaReducer,
    skipAnimations: SkipAnimationsReducer,
    animationSpeed: AnimationSpeedReducer,
    kanji: KanjiReducer,
    navigationVisible: NavigationReducer,
    gotItAmount: GotItAmountReducer,
    gotItAmountByGrade: GotItAmountByGradeReducer
});
