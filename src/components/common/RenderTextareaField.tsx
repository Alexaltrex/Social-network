import {OutlinedInputProps, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const RenderTextAreaField: React.FC<PropsType> = (props) => {
    const {icon, label, placeholder, input, meta: {touched, invalid, error}, classes, rows = 4, ...custom} = props;
    const styles = useStyles();

    return (
        <div className={styles.root}>
            {icon && <div className={styles.iconLeft}>
                {icon}
            </div>}
            <TextField
                InputProps={classes ? {classes} as Partial<OutlinedInputProps> : null}
                multiline
                variant="outlined"
                label={label}
                placeholder={placeholder}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}/>
        </div>
    );
}

export default RenderTextAreaField;

//======================= TYPES ======================================================
type PropsType = {
    icon: React.ReactElement
    label: string
    placeholder: string
    input: any
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    classes?: any
    rows?: any
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



