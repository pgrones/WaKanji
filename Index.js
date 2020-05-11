import React, {useEffect} from "react";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";
import {getSetting, overWriteOldDb} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {setDbLoaded, setKunyomi, setOnyomi, setTheme} from "./src/redux/actions/Actions";
import {connect} from "react-redux";

const Index = ({dbLoaded, setDbLoaded, setTheme, setKunyomi, setOnyomi}) => {
    useEffect(() => {
        if(dbLoaded) {
            getSetting('theme', setTheme);
            getSetting('kunReading', setKunyomi);
            getSetting('onReading', setOnyomi);
        }
    }, [dbLoaded]);


    let [fontsLoaded] = useFonts({
        'KanjiStrokeFont': require('./assets/fonts/KanjiStrokeOrders_v4.003.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }

    if (!dbLoaded) {
        overWriteOldDb(setDbLoaded);
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
    setKunyomi: (theme) => dispatch(setKunyomi(theme)),
    setOnyomi: (theme) => dispatch(setOnyomi(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index)
