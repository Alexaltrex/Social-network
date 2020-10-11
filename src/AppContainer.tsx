import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {HashRouter} from "react-router-dom";
import React from "react";
import App from "./App";
import ErrorBoundary from "./Components/common/ErrorBoundary";

const AppGlobal = () => {
    return <HashRouter>
        <Provider store={store}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </Provider>
    </HashRouter>
}

export default AppGlobal;