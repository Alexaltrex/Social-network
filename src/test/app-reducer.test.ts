import {LangType} from "../types/types";
import appReducer, {appAC} from "../redux/app-reducer";

let initialState = {
    isInitialized: false, // приложение проинициализировано (получены инициализационные данные)?
    globalError: null,
    isLoading: false, // загрузка происходит?
    lanError: false, // ошибка сети
    lang: 'eng' as LangType // язык приложения
};

describe('app-reducer', () => {
    it('APP/SET_LANG', () => {
        const action = appAC.setLang('rus');
        const newState = appReducer(initialState, action)
        expect(newState.lang).toBe('rus')
    })
    it('APP/SET_IS_INITIALIZED', () => {
        const action = appAC.setIsInitialized(true);
        const newState = appReducer(initialState, action);
        expect(newState.isInitialized).toBe(true);
    })
    it('APP/TOGGLE_LOADING', () => {
        const action = appAC.toggleLoading(true);
        const newState = appReducer(initialState, action);
        expect(newState.isLoading).toBe(true);
    })
    it('APP/SET_LAN_ERROR', () => {
        const action = appAC.setLanError(true);
        const newState = appReducer(initialState, action);
        expect(newState.lanError).toBe(true);
    })
});


