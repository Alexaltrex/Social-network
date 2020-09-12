import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/redux-store";

let mapStateToPropsRedirect = (state: StateType) => {
    return {
        isAuth: state.auth.isAuth
    }
};

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {

}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
       let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>;
        return <WrappedComponent {...restProps as WCP}/>
    }
    return connect<MapStatePropsType, MapDispatchPropsType, WCP, StateType>(mapStateToPropsRedirect)(RedirectComponent);
};