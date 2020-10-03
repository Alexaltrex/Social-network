import {GetActionsType} from "./redux-store";

let initialState = {
    sidebarIsOpen: true,
    currentSidebarItem: null as null | number
}

type initialStateType = typeof initialState;
export type SidebarActionsType = GetActionsType<typeof sidebarAC>

const sidebarReducer = (state = initialState, action: SidebarActionsType): initialStateType => {
    switch (action.type) {
        case 'SIDEBAR/SET_SIDEBAR_IS_OPEN': {
            return {...state, sidebarIsOpen: action.sidebarIsOpen}
        }
        case 'SIDEBAR/SET_CURRENT_SIDEBAR_ITEM': {
            return {...state, currentSidebarItem: action.currentSidebarItem}
        }
        default:
            return state;
    }
};

export const sidebarAC = {
    setSidebarIsOpen: (sidebarIsOpen: boolean) => ({type: 'SIDEBAR/SET_SIDEBAR_IS_OPEN', sidebarIsOpen} as const),
    setCurrentSidebarItem: (currentSidebarItem: null | number) => ({type: 'SIDEBAR/SET_CURRENT_SIDEBAR_ITEM', currentSidebarItem} as const)
};

export default sidebarReducer;