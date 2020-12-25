import settingsReducer, {settingsAC} from "../../redux/reducers/settings-reducer";

const initialState = {
    theme: {
        menuBackgroundColor: '#3f50b5',
        displayBackgroundColor: '#e8eaf6',
    }
};

describe('settings-reducer', () => {

    it('Settings/SET_MENU_BACKGROUND_COLOR', () => {
        const menuBackgroundColor = 'menuBackgroundColor';
        const action = settingsAC.setMenuBackgroundColor(menuBackgroundColor);
        const newState = settingsReducer(initialState, action);
        expect(newState.theme.menuBackgroundColor).toBe(menuBackgroundColor);
    })

    it('Settings/SET_DISPLAY_BACKGROUND_COLOR', () => {
        const displayBackgroundColor = 'displayBackgroundColor';
        const action = settingsAC.setDisplayBackgroundColor(displayBackgroundColor);
        const newState = settingsReducer(initialState, action);
        expect(newState.theme.displayBackgroundColor).toBe(displayBackgroundColor);
    })


})

