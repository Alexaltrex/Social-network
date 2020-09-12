import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

export type ProfilePropsType = {
    profile: ProfileType | null
    savePhoto: (photo: File) => void
    saveProfile: (values: ProfileType) => Promise<any>
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    const {profile, savePhoto, saveProfile, status, updateStatus, isOwner} = props
    return (
        <div className={style.profile}>

            <ProfileInfo profile={profile}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
                         status={status}
                         isOwner={isOwner}
                         updateStatus={updateStatus}
                         />
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;
