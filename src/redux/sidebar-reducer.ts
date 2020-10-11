import {GetActionsType} from "./redux-store";

let initialState = {
    currentSidebarItem: null as null | number // текущий элемент главного бокового меню
}

type initialStateType = typeof initialState;
export type SidebarActionsType = GetActionsType<typeof sidebarAC>

const sidebarReducer = (state = initialState, action: SidebarActionsType): initialStateType => {
    switch (action.type) {
        case 'SIDEBAR/SET_CURRENT_SIDEBAR_ITEM': {
            return {...state, currentSidebarItem: action.currentSidebarItem}
        }
        default:
            return state;
    }
};

export const sidebarAC = {
    setCurrentSidebarItem: (currentSidebarItem: null | number) => ({type: 'SIDEBAR/SET_CURRENT_SIDEBAR_ITEM', currentSidebarItem} as const)
};

export default sidebarReducer;