import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import {composeWithDevTools} from "redux-devtools-extension";

// объединяем редьюсеры в объект
let rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

export type StateType = ReturnType<typeof rootReducer>

export type GetActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.store = store;

export default store;