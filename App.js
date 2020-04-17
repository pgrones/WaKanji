import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Reducer} from "./src/redux/reducers/Reducer";
import Index from "./Index";

const store = createStore(Reducer);

const App = () => {
    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    )
};

export default App;
