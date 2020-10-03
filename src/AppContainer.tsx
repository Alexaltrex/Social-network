import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {HashRouter} from "react-router-dom";
import React from "react";
import App from "./App";

const AppGlobal = () => {
    return <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
}

export default AppGlobal;