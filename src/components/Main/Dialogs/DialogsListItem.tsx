import React from "react";
import {DialogType} from "../../../DAL/dialogs-api";
import {makeStyles} from "@material-ui/core/styles";
import {ListItem} from "@material-ui/core";
import {Link as RouterLink, LinkProps as RouterLinkProps, useParams} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentDialogsListItem, getCurrentFriendsId} from "../../../redux/dialogs-selectors";
import {dialogsAC} from "../../../redux/dialogs-reducer";
import {DATE} from "../../../utilities/date";

const ListItemLink: React.FC<ListItemLinkPropsType> = ({primary, secondary, to, src, dialog}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let {userId} = useParams();
    const selected = +userId === dialog.id;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );
    const onClickHandle = () => {
        dispatch(dialogsAC.setCurrentFriendsId(dialog.id))
    };

    const secondaryTransformed = DATE.dateTranslateFromAPI(secondary)

    return (
        <li className={classes.item}>
            <ListItem button component={renderLink} selected={selected} onClick={onClickHandle}>
                <ListItemAvatar>
                    <Avatar src={src} className={classes.avatar}/>
                </ListItemAvatar>
                <Typography color='primary' variant='h6'>
                    <ListItemText primary={primary} secondary={secondaryTransformed}/>
                </Typography>
            </ListItem>
        </li>
    );
}


const DialogsListItem: React.FC<PropsType> = ({dialog}) => {

    return (
        <ListItemLink
            to={`/dialogs/${dialog.id}`}
            primary={dialog.userName}
            secondary={dialog.lastDialogActivityDate}
            src={dialog.photos.small ? dialog.photos.small : undefined}
            dialog={dialog}
        >
        </ListItemLink>
    )
};
export default DialogsListItem;

//===================== TYPE =======================
type ListItemLinkPropsType = {
    primary: string
    secondary: string
    to: string
    src: string | undefined
    dialog: DialogType
}

type PropsType = {
    dialog: DialogType
}

//===================== STYLE ======================
const useStyles = makeStyles({
    item: {
        borderTop: '1px solid #ccc',
        '&:last-child': {
            borderBottom: '1px solid #ccc'
        },
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10
    }
});