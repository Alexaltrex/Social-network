import {BaseThunkType, GetActionsType, StateType} from "./redux-store";
import {Dispatch} from "redux";
import {FormAction} from "redux-form";
import {authAC} from "./auth-reduser";

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimon'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'John'},
        {id: 4, name: 'Tony'},
    ],
    messages: [
        {id: 1, text: 'Hei-Hei'},
        {id: 2, text: 'Hello'},
        {id: 3, text: 'Yow'}
    ]
};

export type initialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof dialogsAC>
type GetStateType = () => StateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'dialogs/ADD_MESSAGE': {
            let id = state.messages ? state.messages[state.messages.length - 1].id : 1;
            return {
                ...state,
                messages: [...state.messages, {id: id, text: action.message}]
            };
        }
        default:
            return state;
    }
};

export const dialogsAC = {
    addMessage: (message: string) => ({type: 'dialogs/ADD_MESSAGE', message: message} as const)
}

export default dialogsReducer;