import React from "react";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import indigo from "@material-ui/core/colors/indigo";
import Tab from "@material-ui/core/Tab";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentDialogsSidebarItem, getLoading} from "../../../redux/dialogs-selectors";
import {dialogsAC} from "../../../redux/dialogs-reducer";
//import WarningIcon from '@material-ui/icons/Warning';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Link as RouterLink} from "react-router-dom";
import {getLang} from "../../../redux/app-selectors";
import {translate} from "../../../const/lang";


const DialogsSidebar = () => {
    const classes = useStyles();
    const currentDialogsSidebarItem = useSelector(getCurrentDialogsSidebarItem);
    const loading = useSelector(getLoading);
    const lang = useSelector(getLang);
    const dispatch = useDispatch();

    const onChangeHandle = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(dialogsAC.setCurrentDialogsSidebarItem(newValue));
    };

    return (
        <Card className={classes.card} elevation={6}>
            <Tabs
                classes={{
                    indicator: classes.indicator
                }}
                orientation="vertical"
                value={currentDialogsSidebarItem}
                onChange={onChangeHandle}
                className={classes.tabs}
            >

                <Tab label={translate(lang, "All")}
                     component={RouterLink}
                     to='/dialogs'
                     disabled={loading}
                     icon={<ChatIcon className={classes.icon}/>}
                     classes={{
                         wrapper: classes.wrapper,
                         selected: classes.selected,
                         root: classes.tabRoot,
                         labelIcon: classes.labelIcon
                     }}/>

                <Tab label={translate(lang, "Deleted")}
                     component={RouterLink}
                     to='/dialogs'
                     disabled={loading}
                     icon={<DeleteForeverIcon className={classes.icon}/>}
                     classes={{
                         wrapper: classes.wrapper,
                         selected: classes.selected,
                         root: classes.tabRoot,
                         labelIcon: classes.labelIcon
                     }}/>

                {/*<Tab label="Spam"*/}
                {/*     component={RouterLink}*/}
                {/*     to='/dialogs'*/}
                {/*     disabled={loading}*/}
                {/*     icon={<WarningIcon className={classes.icon}/>}*/}
                {/*     classes={{*/}
                {/*         wrapper: classes.wrapper,*/}
                {/*         selected: classes.selected,*/}
                {/*         root: classes.tabRoot,*/}
                {/*         labelIcon: classes.labelIcon*/}
                {/*     }}/>*/}

            </Tabs>
        </Card>
    )
};

export default DialogsSidebar;

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {
        padding: 5,
    },
    tabs: {
        borderLeft: `3px solid #ccc`,
    },
    indicator: {
        width: 2,
        left: 0,
        right: 'auto'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        textTransform: 'none',
        '& > *:first-child': {
            marginBottom: '0!important'
        }
    },
    icon: {
        margin: '0 10px',
    },
    selected: {
        color: indigo[500],
        backgroundColor: '#eee'
    },
    tabRoot: {
        padding: 0,
        minWidth: 0
    },
    labelIcon: {
        minHeight: 50
    }
});