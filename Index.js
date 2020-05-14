import React, {useEffect} from "react";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";
import {downloadDB, getSetting} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {setDbLoaded, setFurigana, setKunyomi, setOnyomi, setTheme} from "./src/redux/actions/Actions";
import {connect} from "react-redux";

/**
 * First component to be rendered after the start of the app. Initializes all global states
 * @param dbLoaded Flag to indicate if the DB has loaded
 * @param setDbLoaded
 * @param setTheme
 * @param setKunyomi
 * @param setOnyomi
 * @param setFurigana
 */
const Index = ({dbLoaded, setDbLoaded, setTheme, setKunyomi, setOnyomi, setFurigana}) => {
    useEffect(() => {
        if (dbLoaded) {
            getSetting('theme', setTheme);
            getSetting('kunReading', setKunyomi);
            getSetting('onReading', setOnyomi);
            getSetting('furigana', setFurigana);
        }
    }, [dbLoaded]);


    let [fontsLoaded] = useFonts({
        'KanjiStrokeFont': require('./assets/fonts/KanjiStrokeOrders_v4.003.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }

    if (!dbLoaded) {
        downloadDB(setDbLoaded);
        return <AppLoading/>;
    }

    return <Navigation/>;
};

const mapStateToProps = state => ({
    dbLoaded: state.dbLoaded
});

const mapDispatchToProps = (dispatch) => ({
    setDbLoaded: (isLoaded) => dispatch(setDbLoaded(isLoaded)),
    setTheme: (theme) => dispatch(setTheme(theme)),
    setKunyomi: (kun) => dispatch(setKunyomi(kun)),
    setOnyomi: (on) => dispatch(setOnyomi(on)),
    setFurigana: (furigana) => dispatch(setFurigana(furigana))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index)
