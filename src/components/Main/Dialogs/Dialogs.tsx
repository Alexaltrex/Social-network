import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DialogsList from "./DialogsList";
import CurrentDialog from "./CurrentDialog";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoading} from "../../../redux/app-selectors";
import CircularPreloader from "../../common/CircularPreloader";
import {getCurrentFriendsId, getDialogsSelector} from "../../../redux/dialogs-selectors";
import {getDialogs, getMessages} from "../../../redux/dialogs-reducer";
import {useParams} from "react-router";
import Dialog from "@material-ui/core/Dialog";
import {DialogType} from "../../../DAL/dialogs-api";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";


const Dialogs: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading);
    const dialogs = useSelector(getDialogsSelector);
    const currentFriendsId = useSelector(getCurrentFriendsId);

    let {userId} = useParams();

    useEffect(() => {
        dispatch(getDialogs())
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(getMessages(userId));
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
                    <div className={classes.lastColumn}>
                        <CurrentDialog currentDialog={currentDialog}
                                       userId={userId}
                                       isLoading={isLoading}
                        />
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
        flexBasis: 300,
        marginRight: 15,
    },
    lastColumn: {
        flexGrow: 1
    },
});