import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from './../../../assets/img/user.png';
import ProfileAboutMe from "./ProfileAboutMe/ProfileAboutMe";
import ProfileAboutMeFormRedux from "./ProfileAboutMeForm/ProfileAboutMeForm";
import {ProfileType} from "../../../types/types";
import {ProfilePropsType} from "../Profile";

const ProfileInfo: React.FC<ProfilePropsType> = (props) => {
    const {profile, savePhoto, saveProfile, status, updateStatus, isOwner} = props;

    const [editMode, setEditMode] = useState(false);

    const setEditModeOn = () => {
        setEditMode(true);
    }

    if (!profile) {
        return <Preloader/>
    }
    let lookingForAJob;
    profile.lookingForAJob ? lookingForAJob = 'да' : lookingForAJob = 'нет';

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
        }

    }

    const onSubmit = (values: ProfileType) => {
        saveProfile(values)
            .then(() => {
                setEditMode(false);
            })
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.img}>
                <img
                    src="https://gran-tur.com/assets/image/Blog/%D0%A2%D1%83%D1%80%D1%86%D0%B8%D1%8F/%D0%9F%D0%BB%D1%8F%D0%B6%D0%B8%20%D0%A2%D1%83%D1%80%D1%86%D0%B8%D0%B8/plyaz%20kliopatry.jpg"
                    alt=""/>
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
            <div className={style.avatar}>
                <div>
                    <img
                        className={style.avatarImg}
                        src={profile.photos.large || userPhoto}
                        alt=""/>
                    {isOwner && <input type="file" onChange={onPhotoSelected}/>}
                </div>
                {editMode
                    ? <ProfileAboutMeFormRedux
                        initialValues={profile}
                        onSubmit={onSubmit}
                        profile={profile}/>
                    : <ProfileAboutMe profile={profile}
                                      setEditModeOn={setEditModeOn}
                                      isOwner={isOwner}/>}
            </div>
        </div>
    );
}

export default ProfileInfo;
