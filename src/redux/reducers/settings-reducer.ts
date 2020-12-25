import {GetActionsType} from "../redux-store";

export type InitialStateType = typeof initialState;
export type SettingsActionsType = GetActionsType<typeof settingsAC>;

let initialState = {
    theme: {
        menuBackgroundColor: '#3f50b5',
        displayBackgroundColor: '#e8eaf6',
    }
};

const settingsReducer = (state = initialState, action: SettingsActionsType): InitialStateType => {
    switch (action.type) {
        case 'Settings/SET_MENU_BACKGROUND_COLOR':
            return {...state, theme: {...state.theme, menuBackgroundColor: action.menuBackgroundColor}};
        case 'Settings/SET_DISPLAY_BACKGROUND_COLOR':
            return {...state, theme: {...state.theme, displayBackgroundColor: action.displayBackgroundColor}};
        default:
            return state;
    }
};

export const settingsAC = {
    setMenuBackgroundColor: (menuBackgroundColor: string) => ({
        type: 'Settings/SET_MENU_BACKGROUND_COLOR',
        menuBackgroundColor
    } as const),
    setDisplayBackgroundColor: (displayBackgroundColor: string) => ({
        type: 'Settings/SET_DISPLAY_BACKGROUND_COLOR',
        displayBackgroundColor
    } as const),
};


export default settingsReducer;