import React, {ChangeEvent, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LockIcon from '@material-ui/icons/Lock';
import Typography from "@material-ui/core/Typography";

//======================== CUSTOM HOOK =========================
const useRenderPasswordField = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };
    return {classes, showPassword, password, handleChange,
        handleClickShowPassword, handleMouseDownPassword}
};


//======================= COMPONENT ===============================
const RenderPasswordField: React.FC<PropsType> = (props) => {
    const {label, input, placeholder, meta, disabled} = props;
    const {classes, showPassword, password, handleChange,
        handleClickShowPassword, handleMouseDownPassword} = useRenderPasswordField();

    return (
        <div className={classes.root}>
            <LockIcon className={classes.iconLeft}/>

            <FormControl className={classes.textField}
                         variant="outlined">

                <InputLabel htmlFor="outlined-adornment-password" classes={{
                    outlined: classes.outlined
                }}>{label}</InputLabel>

                <OutlinedInput
                    classes={{
                        root: classes.outlinedInputRoot,
                        input: classes.outlinedInputInput
                    }}
                    disabled={disabled}
                    id="outlined-adornment-password"
                    placeholder={placeholder}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    error={meta.touched && meta.invalid}
                    onChange={handleChange}

                    {...input}


                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                className={classes.iconButton}
                            >
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={73}
                />

                {meta.touched && meta.invalid && <Typography color='error' variant='caption' className={classes.error}>
                    {meta.error}
                </Typography>}

            </FormControl>
        </div>
    )
};

export default RenderPasswordField;

//=============================== TYPES =================================
type PropsType = {
    label: string
    input: any
    placeholder: string
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    disabled: boolean
}

//=============================== STYLES ================================
const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%'
    },
    iconLeft: {
        position: 'absolute',
        left: -5,
        top: '50%',
        transform: 'translate(-100%, -50%)'
    },
    textField: {
        width: '100%'
    },
    error: {
        paddingLeft: 14,
        paddingTop: 2
    },
    outlinedInputRoot: {
        //height: 40,
        width: '100%'
    },
    outlinedInputInput: {
        height: 40,
        paddingTop: 0,
        paddingBottom: 0
    },
    outlined: {
        transform: 'translate(14px, 12px) scale(1)'
    },
    iconButton: {
        padding: 8
    }

});