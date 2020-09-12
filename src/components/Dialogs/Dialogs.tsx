import React from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormControls";
import {maxLength100, required} from "../../utilities/validators/validators";
import {DialogType, MessageType} from "../../types/types";
import {LoginFormValuesType} from "../Login/Login";

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (message: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    const {dialogs, messages, addMessage} = props
    let dialogsElements = dialogs.map(dialogsItems =>
        <Dialog name={dialogsItems.name} id={dialogsItems.id}/>);

    let messagesElements = messages.map(messages =>
        <Message text={messages.text}/>
    );

    let onAddMessage = (formData: { newMessageText: string }) => {
        addMessage(formData.newMessageText);
    };

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
            </div>
            <AddMessageFormRedux onSubmit={onAddMessage}/>
        </div>
    );
};

export type DialogFormValuesType = {
    newMessageText: string
}
type DialogFormKeysType = Extract<keyof DialogFormValuesType, string>;
type DialogFormOwnProps = {}

const AddMessageForm: React.FC<InjectedFormProps<DialogFormValuesType, DialogFormOwnProps> & DialogFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<DialogFormKeysType>('enter your message', "newMessageText", [required, maxLength100], Textarea)}
            </div>
            <div>
                <button>Add Talk</button>
            </div>
        </form>
    )
};

const AddMessageFormRedux = reduxForm<DialogFormValuesType, DialogFormOwnProps>({
    form: 'dialog'
})(AddMessageForm);

export default Dialogs;