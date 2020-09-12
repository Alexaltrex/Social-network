import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeysType, Input} from "../common/FormsControls/FormControls";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormControls.module.css';
import styleLogin from './Login.module.css';
import {StateType} from "../../redux/redux-store";


///////////////////////-LoginForm-//////////////////////
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
//type LoginFormKeysType = 'email' | 'password' | 'rememberMe' | captcha
//type LoginFormKeysType = Extract<keyof LoginFormValuesType, string>;
type LoginFormKeysType = GetStringKeysType<LoginFormValuesType>;
type LoginFormOwnProps = {
    captcha: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    const {handleSubmit, error, captcha} = props;
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormKeysType>('email', "email", [required], Input)}
        {createField<LoginFormKeysType>('Password', 'password', [required], Input, {type: 'password'})}
        {createField<LoginFormKeysType>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
        {error && <div className={style.summaryError}>{error}</div>}
        <div>
            <button>Login</button>
        </div>
        {captcha && <div>
            <img src={captcha} alt=""/>
            <div>
                {createField<LoginFormKeysType>('введите символы с картинки', 'captcha', [required], Input, {})}
            </div>
        </div>}
    </form>
};

/////////////////////-ReduxLoginForm-////////////////////////////////////////
const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);



////////////////////////////-Login-//////////////////////////////////////////////////////////
type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (values: LoginFormValuesType) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha)
    };
    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }
    return <div className={styleLogin.login}>
        <h3>Login</h3>
        <ReduxLoginForm onSubmit={onSubmit}
                        captcha={props.captcha}/>
    </div>
};

////////////////////////-LoginContainer-//////////////////////////////////////////////////////

type MapStatePropsType = {
    isAuth: boolean
    captcha: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
});

const LoginContainer = connect(mapStateToProps, {login})(Login);

export default LoginContainer;

