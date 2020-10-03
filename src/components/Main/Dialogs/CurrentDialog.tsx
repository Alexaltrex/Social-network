import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import {getMessagesSelector} from "../../../redux/dialogs-selectors";
import List from "@material-ui/core/List";
import CurrentDialogHeader from "./CurrentDialogHeader";
import {DialogType} from "../../../DAL/dialogs-api";
import CurrentDialogMeseges from "./CurrentDialogMeseges";
import CurrentDialogForm from "./CurrentDialogForm";

const CurrentDialog: React.FC<PropsType> = ({currentDialog, userId, isLoading}) => {
    const classes = useStyles();
    const messages = useSelector(getMessagesSelector);

    const src = (currentDialog !== null ? currentDialog.photos.small : undefined) as string | undefined;

    return (
        <Card className={classes.card} elevation={6}>
            <List disablePadding
                subheader={
                <CurrentDialogHeader currentDialog={currentDialog}
                                     userId={userId}
                                     isLoading={isLoading}
                />
            }
            >
                <CurrentDialogMeseges messages={messages} src={src} userId={userId}/>
            </List>
            <CurrentDialogForm id={userId}/>
        </Card>
    )
};

export default CurrentDialog;

//========================= TYPE =================
type PropsType = {
    currentDialog: DialogType | null
    userId: number | undefined
    isLoading: boolean
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {
        //padding: 15,
    },
    btnWrapper: {
        marginBottom: 10
    }
});