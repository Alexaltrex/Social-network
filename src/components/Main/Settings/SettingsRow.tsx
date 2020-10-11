import Typography from "@material-ui/core/Typography";
import ColorPicker from "material-ui-color-picker";
import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const SettingsRow: React.FC<PropsType> = (props) => {
    const {title, onChangeHandler, resetToDefaultHandle, probeBackgroundColor, defaultColor} = props;
    const classes = useStyles();

    const useStylesSettings = makeStyles({
        probe: {
            backgroundColor: probeBackgroundColor,
            width: 40,
            height: 40,
            borderRadius: 5,
            marginRight: 15
        },
        default: {
            backgroundColor: defaultColor,
            width: 40,
            height: 40,
            borderRadius: 5,
            marginRight: 15
        }
    });
    const classesSettings = useStylesSettings();

    return (
        <div className={classes.row}>
            <Typography variant='subtitle1' className={classes.text}>
                {title}
            </Typography>
            <ColorPicker className={classes.item}
                         name='color'
                         variant='outlined'
                         size='small'
                         defaultValue='choose color'
                         onChange={onChangeHandler}
            />

            <div className={classesSettings.probe}/>

            <Button variant='contained'
                    onClick={resetToDefaultHandle}
                    className={classes.button}>
                Reset to default
            </Button>

            <div className={classesSettings.default}/>
        </div>
    )

};

export default SettingsRow;

//====================== TYPE ===================
type PropsType = {
    title: string
    onChangeHandler: (color: string) => void
    resetToDefaultHandle: () => void
    probeBackgroundColor: string
    defaultColor: string
}

//================== STYLE =========================
const useStyles = makeStyles({
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

});
