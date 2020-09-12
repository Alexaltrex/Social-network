import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeysType, Input, Textarea} from "../../../common/FormsControls/FormControls";
import {maxLength30, required} from "../../../../utilities/validators/validators";
import React from "react";
import {LoginFormValuesType} from "../../../Login/Login";

type OwnPropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormKeysType = GetStringKeysType<AddPostFormValuesType>;

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, OwnPropsType> & OwnPropsType> = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<AddPostFormKeysType>('enter your post', "newPostText", [required, maxLength30], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddPostFormRedux = reduxForm<AddPostFormValuesType, OwnPropsType>({form: 'post'})(AddPostForm);

export default AddPostFormRedux;