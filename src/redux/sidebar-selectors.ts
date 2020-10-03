import {StateType} from "./redux-store";

export const getSidebarIsOpen = (state: StateType) => state.sidebar.sidebarIsOpen;
export const getCurrentSidebarItem = (state: StateType) => state.sidebar.currentSidebarItem;