import React from 'react';
import {ContactsType, ProfileType} from "../../../../types/types";

type PropsType = {
    setEditModeOn: any
    profile: ProfileType
    isOwner: boolean
}

const ProfileAboutMe: React.FC<PropsType> = (props) => {
    const {setEditModeOn, profile, isOwner} = props;
    const onClick = () => {
        setEditModeOn();
    };
    const contactsElements = Object
        .keys(profile.contacts)
        .map((key) => {
            return <div key={key}>
                <b>{key}:</b>
                <span>{profile.contacts[key as keyof ContactsType]}</span>
            </div>
        });

    return (<div>
            <h2>{profile.fullName}</h2>
            <h3>{profile.aboutMe}</h3>
            <div>
                <b>Контакты: </b>{contactsElements}</div>
            <div>
                <b>Ищу работу: </b>
                <span>{profile.lookingForAJob}</span>
            </div>
            <div>
                <b>My professional skills: </b>
                <span>{profile.lookingForAJobDescription}</span>
            </div>
            {isOwner && <div>
                <button onClick={onClick}>edit profile</button>
            </div>}
        </div>
    )
};

export default ProfileAboutMe;