import React, {ReactElement} from "react";
import Typography from "@material-ui/core/Typography";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {settingsAC} from "../../../redux/settings-reducer";
import {getTheme} from "../../../redux/selectors/settings-selectors";
import SettingsRow from "./SettingsRow";
import {defaultTheme} from "../../../const/const";
import {getLang} from "../../../redux/selectors/app-selectors";
import {translate} from "../../../const/lang";

//===================== CUSTOM HOOK ===========================
const useSettings = () => {
    const classes = useStyles();
    const theme = useSelector(getTheme);
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const onMenuBCChangeHandler = (color: string) => {
        if (color) {
            dispatch(settingsAC.setMenuBackgroundColor(color))
        }
    };
    const onDisplayBCChangeHandler = (color: string) => {
        if (color) {
            dispatch(settingsAC.setDisplayBackgroundColor(color))
        }
    };
    const resetMenuBCToDefaultHandle = () => {
        dispatch(settingsAC.setMenuBackgroundColor(defaultTheme.menuBackgroundColor))
    };
    const resetDisplayBCToDefaultHandle = () => {
        dispatch(settingsAC.setDisplayBackgroundColor(defaultTheme.displayBackgroundColor))
    };
    return {
        classes, theme, lang, onMenuBCChangeHandler,
        onDisplayBCChangeHandler, resetMenuBCToDefaultHandle,
        resetDisplayBCToDefaultHandle
    }
};

//====================== COMPONENT ============================
const Settings: React.FC = (): ReactElement => {
    const {
        classes, theme, lang, onMenuBCChangeHandler,
        onDisplayBCChangeHandler, resetMenuBCToDefaultHandle,
        resetDisplayBCToDefaultHandle
    } = useSettings();

    return (
        <Card className={classes.card} elevation={6}>

            <Typography variant='h6' color='primary' align='center' className={classes.title}>
                {translate(lang, 'Settings')}
            </Typography>

            <SettingsRow title={translate(lang, 'Menu background color')}
                         onChangeHandler={onMenuBCChangeHandler}
                         probeBackgroundColor={theme.menuBackgroundColor}
                         defaultColor={defaultTheme.menuBackgroundColor}
                         resetToDefaultHandle={resetMenuBCToDefaultHandle}
            />

            <SettingsRow title={translate(lang, 'Display background color')}
                         onChangeHandler={onDisplayBCChangeHandler}
                         probeBackgroundColor={theme.displayBackgroundColor}
                         defaultColor={defaultTheme.displayBackgroundColor}
                         resetToDefaultHandle={resetDisplayBCToDefaultHandle}
            />

        </Card>
    )
};

export default Settings;

//================== STYLE =========================
const useStyles = makeStyles({
    card: {
        padding: 20,
        paddingBottom: 400
    },
    title: {
        marginBottom: 15
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        marginRight: 15,
        flexBasis: 200
    },
    item: {
        marginRight: 15
    },
    button: {
        textTransform: 'none',
        marginRight: 15
    },
    default: {
        backgroundColor: '#3f50b5',
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 15
    }
});