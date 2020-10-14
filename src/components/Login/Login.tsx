import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required, shouldNotBeEmpty} from "../../utilities/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {getCaptchaSelector, getIsAuth} from "../../redux/auth-selectors";
import {makeStyles} from "@material-ui/core/styles";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RenderTextField from "../common/RenderTextField";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import RenderPasswordField from "../common/RenderPasswordField";
import RenderCheckbox from "../common/RenderCheckbox";
import Button from "@material-ui/core/Button";
import {getLang} from "../../redux/app-selectors";
import {Lang} from "../../const/lang";

//=================================== Form =========================================
const LoginForm: React.FC<LoginFormPropsType> = (props) => {
    const {handleSubmit, submitting, pristine, error, captcha} = props;
    const classes = useStyles();
    const lang = useSelector(getLang);
    const emailLabel = lang === 'rus' ? Lang['email'].rus : Lang['email'].eng;
    const passwordLabel = lang === 'rus' ? Lang['password'].rus : Lang['password'].eng;
    const rememberMeLabel = lang === 'rus' ? Lang['Remember me'].rus : Lang['Remember me'].eng;
    const сaptchaLabel = lang === 'rus' ? Lang['Captcha'].rus : Lang['Captcha'].eng;
    const сaptchaText = lang === 'rus' ? Lang['Enter symbols from image'].rus : Lang['Enter symbols from image'].eng;
    const buttonLabel = lang === 'rus' ? Lang['Login'].rus : Lang['Login'].eng;

    return <form onSubmit={handleSubmit}>

        <div className={classes.fieldWrapper}>
            <Field name='email'
                   component={RenderTextField}
                   icon={<MailOutlineIcon/>}
                   className={classes.textField}
                   validate={[required, shouldNotBeEmpty]}
                   label={emailLabel}
                   size='small'
            />
        </div>

        <div className={classes.fieldWrapper}>
            <Field
                name='password'
                //disabled={isLoading}
                className={classes.textField}
                component={RenderPasswordField}
                placeholder={passwordLabel}
                label={passwordLabel}
                validate={[required, shouldNotBeEmpty]}
            />
        </div>

        <div className={classes.fieldWrapper}>
            <Field name="rememberMe" component={RenderCheckbox} label={rememberMeLabel}/>
        </div>

        {
            captcha
            && <>
                <div className={classes.fieldWrapper}>
                    <img src={captcha} alt=""/>
                </div>
                <Typography className={classes.captcha}>
                    {сaptchaText}
                </Typography>
                <div className={classes.fieldWrapper}>
                    <Field
                        name='captcha'
                        className={classes.textField}
                        component={RenderTextField}
                        placeholder={сaptchaLabel}
                        label={сaptchaLabel}
                        validate={[required, shouldNotBeEmpty]}
                        size='small'
                    />
                </div>
            </>
        }

        {error && !pristine &&
        <Typography color='error' variant='h6' className={classes.fieldWrapper}>
            {error}
        </Typography>}

        <div className={classes.fieldWrapper}>
            <Button type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth={true}
                    size='large'
                    disabled={submitting || pristine}>
                {buttonLabel}
            </Button>
        </div>

    </form>
};

/////////////////////-ReduxLoginForm-////////////////////////////////////////
const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);


//========================= COMPONENT =============================================================
const Login: React.FC = () => {
    const classes = useStyles();
    const isAuth = useSelector(getIsAuth);
    const captcha = useSelector(getCaptchaSelector);
    const lang = useSelector(getLang);
    const dispatch = useDispatch();

    const onSubmit = (values: LoginFormValuesType) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
    };

    const title = lang === 'rus' ? Lang['Enter in your profile'].rus : Lang['Enter in your profile'].eng;

    if (isAuth) {
        return <Redirect to='/profile'/>
    }
    return (
        <div className={classes.root}>
            <Card className={classes.card} elevation={6}>
                <Typography
                    className={classes.title}
                    align='center'
                    color='primary'
                    variant='h5'
                >
                    {title}
                </Typography>

                <ReduxLoginForm onSubmit={onSubmit}
                                captcha={captcha}/>

            </Card>
        </div>
    )
};

export default Login;

//========================== TYPES ===============================
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormOwnProps = {
    captcha: string | null
}
type LoginFormPropsType = InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps;

//========================== STYLES ==============================
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        width: 500,
        padding: '15px 30px 15px 10px',
        borderRadius: 10
    },
    error: {
        width: 300,
        marginBottom: 10,
    },
    textField: {

        width: '100%',
    },
    fieldWrapper: {
        marginLeft: 35,
        marginBottom: 10
    },
    title: {
        marginBottom: 20
    },
    captcha: {
        marginLeft: 35,
        marginBottom: 10
    }
});


