import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import React from "react";
import {DialogType} from "../../../DAL/dialogs-api";
import List from "@material-ui/core/List";
import DialogsListItem from "./DialogsListItem";
import ListItem from "@material-ui/core/ListItem";
import {Skeleton} from "@material-ui/lab";
import {useSelector} from "react-redux";
import {getDialogsIsLoading} from "../../../redux/dialogs-selectors";

const SkeletonListItem = () => {
    const classes = useStyles();
    return (
        <div className={classes.skeletonWrapper}>
            <Skeleton variant="circle" width={40} height={40} className={classes.avatar}/>
            <Skeleton variant="rect" width={200} height={45}/>
        </div>
    )
}


const DialogsList: React.FC<PropsType> = ({dialogs}) => {
    const classes = useStyles();
    const dialogsIsLoading = useSelector(getDialogsIsLoading);

    const dialogsElements = dialogs && dialogs
        .map((item, i) => <DialogsListItem key={item.id}
                                           dialog={item}/>);

    return (
        <Card className={classes.card} elevation={6}>
            { dialogsIsLoading
                ? <div>
                    <SkeletonListItem/>
                    <SkeletonListItem/>
                    <SkeletonListItem/>
                    <SkeletonListItem/>
                </div>
                : <List disablePadding>
                {dialogsElements}
            </List>
            }
        </Card>
    )
};

export default DialogsList;

//============================ TYPE ================================================
type PropsType = {
    dialogs: null | Array<DialogType>
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {

    },
    avatar: {
        marginRight: 10
    },
    btnWrapper: {
        marginBottom: 10
    },
    skeletonWrapper: {
        padding: '0 16px',
        height: 72,
        display: 'flex',
        alignItems: 'center'
    }
});