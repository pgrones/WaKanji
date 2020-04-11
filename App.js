import React, {useState} from 'react';
import {downloadDB} from "./src/persistence/DbConnection";
import Navigation from "./src/components/Navigation";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Reducer} from "./src/components/redux/reducers/Reducer";
import {Text, View} from "react-native";

const store = createStore(Reducer);

const App = () => {
    const [dbLoaded, setDbLoaded] = useState(false);

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
