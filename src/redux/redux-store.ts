import {Action, applyMiddleware, combineReducers, createStore, Middleware} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import sidebarReducer from "./reducers/sidebar-reducer";
import usersReducer from "./reducers/users-reduser";
import authReducer from "./reducers/auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./reducers/app-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import settingsReducer from "./reducers/settings-reducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../Saga/saga";

let rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
    form: formReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleware: Array<Middleware> = [thunkMiddleware, sagaMiddleware];
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
sagaMiddleware.run(rootSaga);

export default store;

//======================== TYPE ==========================
export type StateType = ReturnType<typeof rootReducer>
export type GetActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>