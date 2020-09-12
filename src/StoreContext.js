import React from "react";
import store from "./redux/redux-store";
import App from "./App";

// создаем контекст
const StoreContext = React.createContext('null');

export const Provider = (props) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>

}


export default StoreContext;