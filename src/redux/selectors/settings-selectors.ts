import {StateType} from "../redux-store";

export const getTheme = (state: StateType) => state.settings.theme;
