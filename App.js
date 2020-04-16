import React, {useState} from 'react';
import {downloadDB} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Reducer} from "./src/redux/reducers/Reducer";
import {Text, View} from "react-native";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";

const store = createStore(Reducer);

const Index = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
};

const App = () => {
    const [dbLoaded, setDbLoaded] = useState(false);
    let [fontsLoaded] = useFonts({
        'KanjiStrokeFont': require('./assets/fonts/KanjiStrokeOrders_v4.003.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        if (!dbLoaded) {
            downloadDB(setDbLoaded);
            return <View><Text>Loading</Text></View>
        } else {
            return (
                <Navigation/>
            );
        }
    }
};

export default Index;
