import React, {useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {downloadDB} from "./src/persistence/DbConnection";
import {Navigation} from "./src/components/Navigation";

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

const App = () => {
    const [dbLoaded, setDbLoaded] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);

    // if (!fontLoaded) {
    //    return fetchFonts(setFontLoaded);
    // }

    if(!dbLoaded){
        downloadDB().then((value) => setDbLoaded(value));
        return <></>
    } else {
        return (
            <Navigation/>
        );
    }
};

export default App;
