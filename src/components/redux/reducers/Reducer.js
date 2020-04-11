import {combineReducers} from "redux";
import ThemeReducer from "./ThemeReducer";
import GradeReducer from "./GradeReducer";
import KanjiReducer from "./KanjiReducer";

export const Reducer = combineReducers({
    theme: ThemeReducer,
    grades: GradeReducer,
    kanji: KanjiReducer
});
