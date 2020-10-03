import React from "react";
import {MessageType} from "../../../DAL/dialogs-api";
import CurrentDialogMessage from "./CurrentDialogMessage";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {useSelector} from "react-redux";
import {getMessagesIsLoading} from "../../../redux/dialogs-selectors";

const SkeletonCustom: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.skeletonCustom}>
            <Skeleton variant="circle" width={40} height={40} className={classes.avatar}/>
            <Skeleton variant="rect" width='100%' height={40}/>
        </div>
    )
}


const CurrentDialogMeseges: React.FC<PropsType> = ({messages, src, userId}) => {
    const messagesIsLoading = useSelector(getMessagesIsLoading);

    const elements = messages && messages
        .map(el => <CurrentDialogMessage message={el} src={src}/>)

    return (
        <>
            {
                userId &&
                <div>
                    {
                        messagesIsLoading
                            ? <>
                                <SkeletonCustom/>
                                <SkeletonCustom/>
                                <SkeletonCustom/>
                                <SkeletonCustom/>
                            </>
                            : <>
                                {elements}
                            </>
                    }
                </div>
            }

        </>
    )
};

export default CurrentDialogMeseges;

//==================== TYPES ==================
type PropsType = {
    messages: Array<MessageType> | null
    src: string | undefined
    userId: number | undefined
}

//========================== STYLES ===================================================
const useStyles = makeStyles({
    skeletonCustom: {
        height: 59,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 15

    },
    avatar: {
        marginRight: 10
    }
});