import React, {useState} from 'react';
import {Navigation} from "./src/Navigation";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const fetchFonts = () => {
    return Font.loadAsync({
        'notoSansJP': require('./assets/fonts/NotoSansJP-Regular.otf'),
        'notoSansJP-bold': require('./assets/fonts/NotoSansJP-Bold.otf')
    });
};

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
            />
        );
    }

    return (
        <Navigation/>
    );
};

export default App;
