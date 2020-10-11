import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const RenderNakedTextAreaField: React.FC<PropsType> = (props) => {
    const {icon, label, placeholder, input, meta: {touched, invalid}, rows = 4, multiline = true, classes, ...custom} = props;
    const styles = useStyles();

    return (
        <div className={styles.root}>
            {icon && <div className={styles.iconLeft}>
                {icon}
            </div>}
            <InputBase
                classes={classes ? classes : null}
                multiline={multiline}
                rows={rows}
                variant="outlined"
                label={label}
                placeholder={placeholder}
                error={touched && invalid}
                {...input}
                {...custom}/>
        </div>
    );
}

export default RenderNakedTextAreaField;

//======================= TYPES ======================================================
type PropsType = {
    icon: React.ReactElement
    label: string
    placeholder: string
    input: any
    meta: {
        touched: boolean
        invalid: boolean
    },
    rows?: number
    multiline?: boolean
    classes?: any
}
//========================= STYLES =============================================================
const useStyles = makeStyles({
        root: {
            position: 'relative',
        },
        iconLeft: {
            position: 'absolute',
            left: -5,
            top: '50%',
            transform: 'translate(-100%, -50%)'
        }
    }
);



