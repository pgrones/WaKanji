import React from "react";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";
import {downloadDB} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {setDbLoaded} from "./src/redux/actions/Actions";
import {connect} from "react-redux";

const Index = (dbLoaded, setDbLoaded) => {
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
    setDbLoaded: (isLoaded) => dispatch(setDbLoaded(isLoaded))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index)
