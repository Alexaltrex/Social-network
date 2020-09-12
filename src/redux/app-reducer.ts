import {getAuthUserData} from "./auth-reduser";
import {GetActionsType} from "./redux-store";

export type stateInitialType = typeof stateInitial

let stateInitial = {
    initialized: true,//false,
    globalError: null
};

const appReducer = (state = stateInitial, action: ActionsType):stateInitialType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return state;
    }
};

export const appAC = {
    initializedSuccess: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const)
};

type ActionsType = GetActionsType<typeof appAC>

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    // dispatch(somethingElse());
    // dispatch(somethingElse());
    Promise.all([promise])
        .then(()=> {
            dispatch(appAC.initializedSuccess())
        })
};

export default appReducer;