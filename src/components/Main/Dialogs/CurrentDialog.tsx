import {makeStyles} from "@material-ui/core/styles";
import {Card, Typography} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import {getCurrentDialogsSidebarItem, getDeletedMessages, getMessagesSelector} from "../../../redux/dialogs-selectors";
import List from "@material-ui/core/List";
import CurrentDialogHeader from "./CurrentDialogHeader";
import {DialogType} from "../../../DAL/dialogs-api";
import CurrentDialogMessages from "./CurrentDialogMessages";
import CurrentDialogForm from "./CurrentDialogForm";
import {DialogsSidebarItemEnum} from "../../../types/types";
import {getLang} from "../../../redux/app-selectors";
import {translate} from "../../../const/lang";

const CurrentDialog: React.FC<PropsType> = ({currentDialog, userId}) => {
    const classes = useStyles();
    const messages = useSelector(getMessagesSelector);
    const currentDialogsSidebarItem = useSelector(getCurrentDialogsSidebarItem);
    const deletedMessages = useSelector(getDeletedMessages);
    const lang = useSelector(getLang);

    const src = (currentDialog !== null ? currentDialog.photos.small : undefined) as string | undefined;

    return (
        <Card elevation={6}>
            { currentDialogsSidebarItem === DialogsSidebarItemEnum.all ||
            currentDialogsSidebarItem === DialogsSidebarItemEnum.deleted && deletedMessages.length
                ? <List disablePadding
                      subheader={
                          <CurrentDialogHeader currentDialog={currentDialog}
                                               userId={userId}
                          />
                      }
                >
                    <CurrentDialogMessages messages={messages} src={src} userId={userId}/>
                </List>
                : <div className={classes.emptyMessages}>
                    <Typography variant='subtitle1' color='primary'>
                        {translate(lang, 'There ara no deleted messages')}
                    </Typography>

                </div>
            }

            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.all && userId &&
                <CurrentDialogForm id={userId}/>
            }

        </Card>
    )
};

export default CurrentDialog;

//========================= TYPE =================
type PropsType = {
    currentDialog: DialogType | null
    userId: number | undefined
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    btnWrapper: {
        marginBottom: 10
    },
    skeleton: {
        borderRadius: 4
    },
    emptyMessages: {
        padding: '8px 16px'
    }
});