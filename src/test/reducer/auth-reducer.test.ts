import authReducer, {authAC} from "../../redux/reducers/auth-reducer";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as null | string
};

describe('auth-reducer', () => {
    it('AUTH/SET_AUTH_USER_DATA - id', () => {
        const id = 1;
        const action = authAC.setAuthUserData(id, null, null, false);
        const newState = authReducer(initialState, action);
        expect(newState.id).toBe(id);
    })
    it('AUTH/SET_AUTH_USER_DATA - email', () => {
        const email = 'email';
        const action = authAC.setAuthUserData(null, email, null, false);
        const newState = authReducer(initialState, action);
        expect(newState.email).toBe(email);
    })
    it('AUTH/SET_AUTH_USER_DATA - login', () => {
        const login = 'login';
        const action = authAC.setAuthUserData(null, null, login, false);
        const newState = authReducer(initialState, action);
        expect(newState.login).toBe(login);
    })
    it('AUTH/SET_AUTH_USER_DATA - isAuth', () => {
        const isAuth = true;
        const action = authAC.setAuthUserData(null, null, null, isAuth);
        const newState = authReducer(initialState, action);
        expect(newState.isAuth).toBe(isAuth);
    })
    it('AUTH/SET_CAPTCHA', () => {
        const captcha = 'captcha';
        const action = authAC.setCaptchaUrl(captcha);
        const newState = authReducer(initialState, action);
        expect(newState.captcha).toBe(captcha);
    })
})