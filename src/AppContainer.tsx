import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {HashRouter, Route} from "react-router-dom";
import React, {ReactElement} from "react";
import App from "./App";
import ErrorBoundary from "./Components/common/ErrorBoundary";
import {QueryParamProvider} from "use-query-params";

const AppContainer: React.FC = (): ReactElement => {
    return (
        <HashRouter>
            <Provider store={store}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <ErrorBoundary>
                        <App/>
                    </ErrorBoundary>
                </QueryParamProvider>
            </Provider>
        </HashRouter>
    )
}

export default AppContainer;