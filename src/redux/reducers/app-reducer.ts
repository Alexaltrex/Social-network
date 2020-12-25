import {getAuthUserData} from "./auth-reducer";
import {LangType} from "../../types/types";
import {BaseThunkType, GetActionsType} from "../redux-store";

export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>;
type ThunkType = BaseThunkType<AppActionsType>

let initialState = {
    isInitialized: false, // приложение проинициализировано (получены инициализационные данные)?
    globalError: null,
    isLoading: false, // загрузка происходит?
    lanError: false, // ошибка сети
    lang: 'eng' as LangType // язык приложения
};

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_LANG':
            return {...state, lang: action.lang}
        case 'APP/SET_IS_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'APP/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'APP/SET_LAN_ERROR': {
            return {...state, lanError: action.lanError}
        }
        default:
            return state;
    }
};

export const appAC = {
    setIsInitialized: (isInitialized: boolean) => ({type: 'APP/SET_IS_INITIALIZED', isInitialized} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'APP/TOGGLE_LOADING', isLoading} as const),
    setLanError: (lanError: boolean) => ({type: 'APP/SET_LAN_ERROR', lanError} as const),
    setLang: (lang: LangType) => ({type: 'APP/SET_LANG', lang} as const),
};

export const getIsInitialized = (): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let promise = dispatch(getAuthUserData());
        // dispatch(somethingElse());
        // dispatch(somethingElse());
        Promise.all([promise])
            .then(() => {
                dispatch(appAC.setIsInitialized(true));
            })
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false))
    }

};

export default appReducer;