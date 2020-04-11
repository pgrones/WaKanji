import React, {useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {downloadDB} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Reducer} from "./src/components/redux/reducers/Reducer";
import {Text, View} from "react-native";

const fetchFonts = (setFontLoaded) => {
    return (
        <AppLoading
            startAsync={Font.loadAsync({
                'notoSansJP': require('./assets/fonts/NotoSansJP-Regular.otf'),
                'notoSansJP-bold': require('./assets/fonts/NotoSansJP-Bold.otf')
            })}
            onFinish={() => setFontLoaded(true)}
        />
    );
};

const store = createStore(Reducer);

const App = () => {
    const [dbLoaded, setDbLoaded] = useState(false);
    //const [fontLoaded, setFontLoaded] = useState(false);

    // if (!fontLoaded) {
    //    return fetchFonts(setFontLoaded);
    // }

    if (!dbLoaded) {
        downloadDB(setDbLoaded);
        return <View><Text>Loading</Text></View>
    } else {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
};

export default App;
