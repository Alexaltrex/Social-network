import Dialogs from "./Dialogs";
import {dialogsAC} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {StateType} from "../../redux/redux-store";
import {DialogType, MessageType} from "../../types/types";

type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    isAuth: boolean
}

type MapDispatchPropsType = {
    addMessage: (message: string) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: StateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
};

const addMessage = dialogsAC.addMessage;

const DialogsContainer = compose<React.ComponentType>(connect<MapStatePropsType,
            MapDispatchPropsType,
            OwnPropsType,
            StateType>(mapStateToProps, {addMessage}),
    withAuthRedirect)(Dialogs);

export default DialogsContainer;