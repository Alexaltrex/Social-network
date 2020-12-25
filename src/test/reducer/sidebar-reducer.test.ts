import sidebarReducer, {sidebarAC} from "../../redux/reducers/sidebar-reducer";
import appReducer from "../../redux/reducers/app-reducer";

const initialState = {
    currentSidebarItem: null as null | number // текущий элемент главного бокового меню
};

describe('sidebar-reducer', () => {

    it('SIDEBAR/SET_CURRENT_SIDEBAR_ITEM', () => {
        const currentSidebarItem = 1;
        const action = sidebarAC.setCurrentSidebarItem(currentSidebarItem);
        const newState = sidebarReducer(initialState, action);
        expect(newState.currentSidebarItem).toEqual(currentSidebarItem);
    })
})

