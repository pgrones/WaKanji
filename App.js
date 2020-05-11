import node_libs_react_native from "node-libs-react-native/globals";
import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Reducer} from "./src/redux/reducers/Reducer";
import Index from "./Index";
import ErrorBoundary from "./src/components/ErrorBoundary";

const store = createStore(Reducer);

const App = () => {
    const globals = node_libs_react_native;
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <Index/>
            </ErrorBoundary>
        </Provider>
    )
};

export default App;
