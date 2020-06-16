import React, {useEffect, useState} from "react";
import {AppLoading} from "expo";
import {downloadDB, getSetting} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {setFurigana, setKunyomi, setOnyomi, setSkipAnimations, setTheme} from "./src/redux/actions/Actions";
import {connect} from "react-redux";

/**
 * First component to be rendered after the start of the app. Initializes all global states
 * @param setTheme
 * @param setKunyomi
 * @param setOnyomi
 * @param setFurigana
 * @param setSkipAnimations
 */
const Index = ({setTheme, setKunyomi, setOnyomi, setFurigana, setSkipAnimations}) => {
    const [dbLoaded, setDbLoaded] = useState(false);

    useEffect(() => {
        if (dbLoaded) {
            getSetting('theme', setTheme);
            getSetting('kunReading', setKunyomi);
            getSetting('onReading', setOnyomi);
            getSetting('furigana', setFurigana);
            getSetting('skipAnimations', setSkipAnimations);
        }
    }, [dbLoaded]);

    if (!dbLoaded) {
        downloadDB(setDbLoaded);
        return <AppLoading/>;
    }

    return <Navigation/>;
};

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(setTheme(theme)),
    setKunyomi: (kun) => dispatch(setKunyomi(kun)),
    setOnyomi: (on) => dispatch(setOnyomi(on)),
    setFurigana: (furigana) => dispatch(setFurigana(furigana)),
    setSkipAnimations: (skipAnimations) => dispatch(setSkipAnimations(skipAnimations))
});

export default connect(null, mapDispatchToProps)(Index)
