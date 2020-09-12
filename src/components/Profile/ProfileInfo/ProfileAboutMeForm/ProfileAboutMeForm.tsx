import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeysType, Input, Textarea} from "../../../common/FormsControls/FormControls";
import style from "../../../common/FormsControls/FormControls.module.css";
import {LoginFormValuesType} from "../../../Login/Login";
import {ProfileType} from "../../../../types/types";

type OwnPropsType = {
    profile: ProfileType
}
type ProfileAboutMeFormValuesType = ProfileType;
type ProfileAboutMeFormKeysType = GetStringKeysType<ProfileAboutMeFormValuesType>;

let ProfileAboutMeForm: React.FC<InjectedFormProps<ProfileAboutMeFormValuesType, OwnPropsType> & OwnPropsType> = (props) => {
    const {handleSubmit, profile, error} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <b>Full name:</b>
                {createField<ProfileAboutMeFormKeysType>('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Ищу работу: </b>
                {createField<ProfileAboutMeFormKeysType>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField<ProfileAboutMeFormKeysType>('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b>
                {createField<ProfileAboutMeFormKeysType>('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Контакты: </b>
                {Object.keys(profile.contacts).map((key, i) => (
                    <div key={key}><b>{key}: </b>
                        <span>
                        {createField(key, `contacts.${key}`, [], Input)}
                        </span>
                    </div>
                ))}
            </div>
            {props.error && <div className={style.summaryError}>{props.error}</div>}
            <div>
                <button>save changes</button>
            </div>
        </form>
    )
};

const ProfileAboutMeFormRedux = reduxForm<ProfileAboutMeFormValuesType, OwnPropsType>({
    form: 'profileAboutMeForm'
})(ProfileAboutMeForm);


export default ProfileAboutMeFormRedux;