import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authAC, logout} from "../../redux/auth-reduser";
import {StateType} from "../../redux/redux-store";

const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

//const setAuthUserData = authAC.setAuthUserData;

let HeaderContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {logout})(Header);

export default HeaderContainer;

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType