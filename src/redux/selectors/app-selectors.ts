import {StateType} from "../redux-store";

export const getIsInitializedSelector = (state: StateType) => state.app.isInitialized;
export const getIsLoading = (state: StateType) => state.app.isLoading;
export const getLanError = (state: StateType) => state.app.lanError;
export const getLang = (state: StateType) => state.app.lang;
