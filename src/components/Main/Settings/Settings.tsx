import React from "react";
import Typography from "@material-ui/core/Typography";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {settingsAC} from "../../../redux/settings-reducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getTheme} from "../../../redux/settings-selectors";
import SettingsRow from "./SettingsRow";
import {defaultTheme} from "../../../const/const";

const Settings: React.FC = () => {
    const classes = useStyles();
    const theme = useSelector(getTheme);
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

    return (
        <Card className={classes.card} elevation={6}>

            <Typography variant='h6' color='primary' align='center' className={classes.title}>
                Settings
            </Typography>

            <SettingsRow title='Menu background color'
                         onChangeHandler={onMenuBCChangeHandler}
                         probeBackgroundColor={theme.menuBackgroundColor}
                         defaultColor={defaultTheme.menuBackgroundColor}
                         resetToDefaultHandle={resetMenuBCToDefaultHandle}
            />

            <SettingsRow title='Display background color'
                         onChangeHandler={onDisplayBCChangeHandler}
                         probeBackgroundColor={theme.displayBackgroundColor}
                         defaultColor={defaultTheme.displayBackgroundColor}
                         resetToDefaultHandle={resetDisplayBCToDefaultHandle}
            />

        </Card>
    )
};

export default withAuthRedirect(Settings);

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