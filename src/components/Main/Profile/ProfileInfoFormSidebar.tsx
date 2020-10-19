import CardContent from "@material-ui/core/CardContent";
import React, {ReactElement} from "react";
import {Card, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import LanguageIcon from '@material-ui/icons/Language';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentInfoFormSidebarItem} from "../../../redux/profile-selectors";
import indigo from "@material-ui/core/colors/indigo";
import {profileAC} from "../../../redux/profile-reducer";
import {getLang} from "../../../redux/app-selectors";
import {translate} from "../../../const/lang";

//===================== CUSTOM HOOK ===========================
const useProfileInfoFormSidebar = () => {
    const classes = useStyles();
    const currentInfoFormSidebarItem = useSelector(getCurrentInfoFormSidebarItem);
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(profileAC.setCurrentInfoFormSidebarItem(newValue));
    };
    return {
        classes, currentInfoFormSidebarItem,
        lang, handleChange
    }
};

//====================== COMPONENT ============================
const ProfileInfoFormSidebar: React.FC = (): ReactElement => {
    const {
        classes, currentInfoFormSidebarItem,
        lang, handleChange
    } = useProfileInfoFormSidebar();

    return (
        <Card elevation={6}>
            <CardContent className={classes.cardContent}>

                <Tabs
                    classes={{
                        indicator: classes.indicator
                    }}
                    orientation="vertical"
                    value={currentInfoFormSidebarItem}
                    onChange={handleChange}
                    className={classes.tabs}
                >

                    <Tab label={translate(lang, 'Main')} icon={<AccountCircleIcon className={classes.icon}/>} classes={{
                        wrapper: classes.wrapper,
                        selected: classes.selected,
                        root: classes.tabRoot,
                        labelIcon: classes.labelIcon
                    }}/>
                    <Tab label={translate(lang, 'Job')} icon={<WorkOutlineIcon className={classes.icon}/>} classes={{
                        wrapper: classes.wrapper,
                        selected: classes.selected,
                        root: classes.tabRoot,
                        labelIcon: classes.labelIcon
                    }}/>
                    <Tab label={translate(lang, 'Contacts')} icon={<LanguageIcon className={classes.icon}/>} classes={{
                        wrapper: classes.wrapper,
                        selected: classes.selected,
                        root: classes.tabRoot,
                        labelIcon: classes.labelIcon
                    }}/>

                </Tabs>

            </CardContent>
        </Card>
    )
};

export default ProfileInfoFormSidebar;

//========================== TYPES =================================================
type PropsType = {
    label: string
    icon: React.ReactElement
}

//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) => ({
    cardContent: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingRight: 5,
        '&:last-child': {
            paddingBottom: 5
        }
    },
    tabs: {
        borderLeft: `3px solid ${theme.palette.divider}`,
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
        margin: '0 10px 0',

    },
    selected: {
        color: indigo[500],
        backgroundColor: '#eee'
    },
    tabRoot: {
        padding: 0,
        marginLeft: 0
    },
    labelIcon: {
        minHeight: 50,
    }
}));