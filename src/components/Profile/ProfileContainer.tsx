import React from 'react';
import {connect} from "react-redux";
import {
    getProfile,
    getStatus, profileAC,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {StateType} from "../../redux/redux-store";
import ProfileContainerAJAX from "./ProfileContainerAJAX";

//type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapStatePropsType = {
    profile: ProfileType | null
    isLoading: boolean
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
    toggleLoading: (isLoading: boolean) => void
    getProfile: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (values: ProfileType) => Promise<any>
}



export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
    isLoading: state.usersPage.isLoading,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

const setUserProfile = profileAC.setUserProfile
const toggleLoading = profileAC.toggleLoading

let ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps,
    {
        setUserProfile, toggleLoading, getProfile, getStatus,
        updateStatus, savePhoto, saveProfile
    }), withRouter, withAuthRedirect)(ProfileContainerAJAX);

export default ProfileContainer;
