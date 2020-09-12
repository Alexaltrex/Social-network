import {connect, Provider} from "react-redux";
import store, {StateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import App from "./App";
import {HashRouter} from "react-router-dom";
import React from "react";

const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
});

const AppContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>
(mapStateToProps, {initializeApp})(App)

type MapStatePropsType = {
    initialized: boolean
};

type MapDispatchPropsType = {
    initializeApp: () => void
};

export type AppPropsType = MapStatePropsType & MapDispatchPropsType;

const AppGlobal = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default AppGlobal;