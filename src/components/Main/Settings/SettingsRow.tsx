import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, {ReactElement} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getLang} from "../../../redux/selectors/app-selectors";
import {useSelector} from "react-redux";
import {translate} from "../../../const/lang";
import SelectColorButtonCustom from "../../common/SelectColorButtonCustom";

//===================== CUSTOM HOOK ===========================
const useSettingsRow = (probeBackgroundColor: string, defaultColor: string) => {
    const classes = useStyles();
    const lang = useSelector(getLang);
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
    return {
        classes, lang, classesSettings
    }
}

//====================== COMPONENT ============================
const SettingsRow: React.FC<PropsType> = (props): ReactElement => {
    const {
        title, onChangeHandler, resetToDefaultHandle,
        probeBackgroundColor, defaultColor
    } = props;
    const {
        classes, lang, classesSettings
    } = useSettingsRow(probeBackgroundColor, defaultColor);

    return (
        <div className={classes.row}>
            <Typography variant='subtitle1' className={classes.text}>
                {title}
            </Typography>

            <SelectColorButtonCustom
                color={probeBackgroundColor}
                enable={true}
                onPickColorHandler={onChangeHandler}
                size={40}
                borderRadius={5}
                tipTitle='Choose color'
                header='Choose color'
                anchorOriginVertical='top'
                anchorOriginHorizontal='left'
                transformOriginVertical='top'
                transformOriginHorizontal='left'
            />

            <Button variant='contained'
                    onClick={resetToDefaultHandle}
                    className={classes.button}>
                {translate(lang, 'Reset to default')}
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
        flexBasis: 220
    },
    item: {
        marginRight: 15
    },
    button: {
        textTransform: 'none',
        marginRight: 15,
        marginLeft: 30
    },

});
