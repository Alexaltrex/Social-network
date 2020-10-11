import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DialogsList from "./DialogsList";
import CurrentDialog from "./CurrentDialog";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoading} from "../../../redux/app-selectors";
import {getDialogsSelector} from "../../../redux/dialogs-selectors";
import {dialogsAC, getDialogs, getMessages} from "../../../redux/dialogs-reducer";
import {useParams} from "react-router";
import {DialogType} from "../../../DAL/dialogs-api";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import DialogsSidebar from "./DialogsSidebar";

const Dialogs: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading);
    const dialogs = useSelector(getDialogsSelector);

    let {userId} = useParams();

    useEffect(() => {
        dispatch(getDialogs())
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(getMessages(userId));
        }
        return () => {
            dispatch(dialogsAC.setMessages(null))
        }
    }, [userId]);

    const currentDialog = (dialogs && userId) ? dialogs.find(el => el.id === +userId) as DialogType : null;

    return (
        <>
            {
                (!isLoading || dialogs) &&
                <div className={classes.root}>

                    <div className={classes.firstColumn}>
                        <DialogsList dialogs={dialogs}/>
                    </div>

                    <div className={classes.secondColumn}>
                        <CurrentDialog currentDialog={currentDialog}
                                       userId={userId}
                        />
                    </div>

                    <div className={classes.lastColumn}>
                        <DialogsSidebar/>
                    </div>
                </div>
            }
        </>
    );
};


export default withAuthRedirect(Dialogs);

//========================== STYLES =============================================
const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    firstColumn: {
        flexBasis: 230,
        flexShrink: 0,
        marginRight: 10,
    },
    secondColumn: {
        flexGrow: 1,
        marginRight: 10,
    },
    lastColumn: {
        flexBasis: 120,
        flexShrink: 0,
    },
});