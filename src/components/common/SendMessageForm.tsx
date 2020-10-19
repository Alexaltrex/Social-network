import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import indigo from "@material-ui/core/colors/indigo";
import Avatar from "@material-ui/core/Avatar";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {shouldNotBeEmpty} from "../../utilities/validators/validators";
import RenderTextAreaField from "./RenderTextareaField";
import SendIcon from '@material-ui/icons/Send';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../redux/dialogs-reducer";
import {DialogType} from "../../DAL/dialogs-api";
import {getLang} from "../../redux/app-selectors";
import {translate} from "../../const/lang";

//======================== CUSTOM HOOK =========================
const useForm = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const classesField = useStylesField();
    const label = translate(lang, 'Enter your message');
    const buttonLabel = translate(lang, 'Send message');
    return {classes, classesField, label, buttonLabel}
};

//===================== FORM ==================================
const Form: React.FC<FormPropsType> = (props) => {
    const {handleSubmit, submitting, pristine} = props;
    const {classes, classesField, label, buttonLabel} = useForm();

    return (
        <form onSubmit={handleSubmit}>
            <Field name='message'
                   component={RenderTextAreaField}
                   validate={[shouldNotBeEmpty]}
                   autoFocus={true}
                   className={classes.textArea}
                   classes={classesField}
                   label={label}
                   placeholder={label}
                   size='small'
            />

            <div>
                <Button type="submit"
                        size="small"
                        color='primary'
                        variant="contained"
                        startIcon={<SendIcon/>}
                        disabled={submitting || pristine}
                        className={classes.button}
                >
                    {buttonLabel}
                </Button>
            </div>
        </form>
    );
};

//============================= REDUX-FORM ========================================
const ReduxForm = reduxForm<FormValuesType, OwnPropsType>({
    form: 'send-message',
})(Form);

//======================== CUSTOM HOOK =========================
const useSendMessageForm = ({onClose, id, dialogs}: UseSendMessageFormType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const onFormCloseHandle = () => {
        onClose(false);
    };
    const onSubmit = (formValue: FormValuesType) => {
        dispatch(sendMessage(id, formValue.message));
        onClose(false);
    };
    const dialogIsExist = dialogs && dialogs.some(el => el.id === id);
    const newMessageLabel = translate(lang, 'New message');
    const goToDialogWithLabel = translate(lang, 'Go to dialog with');
    return {
        classes, onFormCloseHandle, onSubmit, dialogIsExist,
        newMessageLabel, goToDialogWithLabel
    }
};

//================ COMPONENT =========================================
const SendMessageForm: React.FC<ComponentPropsType> = ({open, onClose, id, name, src, dialogs}) => {
    const {
        classes, onFormCloseHandle, onSubmit, dialogIsExist,
        newMessageLabel, goToDialogWithLabel
    } = useSendMessageForm({onClose, id, dialogs});

    return (
        <>
            {
                dialogs &&
                <Dialog open={open}
                        classes={{
                            paper: classes.paper
                        }}
                >
                    <div className={classes.titleWrapper}>
                        <Typography className={classes.title}>
                            {newMessageLabel}
                        </Typography>

                        {
                            dialogIsExist &&
                            <Link component={RouterLink}
                                  to={`/dialogs/${id}`}
                                  variant='body2'
                                  className={classes.titleLink}
                            >
                                {`${goToDialogWithLabel} ${name}`}
                            </Link>
                        }

                        <IconButton className={classes.titleIcon}
                                    onClick={onFormCloseHandle}
                        >
                            <HighlightOffIcon/>
                        </IconButton>
                    </div>

                    <DialogContent className={classes.content}>
                        <div className={classes.friendInfo}>
                            <Avatar
                                className={classes.avatar}
                                src={src}
                            />
                            <Link component={RouterLink}
                                  to={`/users/${id}`}
                                  variant='subtitle2'
                            >
                                {name}
                            </Link>
                        </div>

                        <ReduxForm onSubmit={onSubmit}/>

                    </DialogContent>

                </Dialog>
            }
        </>
    )
};

export default SendMessageForm;

//=========================== TYPE =======================
type OwnPropsType = {}
export type FormValuesType = {
    message: string,
}
type FormPropsType = InjectedFormProps<FormValuesType, OwnPropsType> & OwnPropsType
type ComponentPropsType = {
    open: boolean
    onClose: (openForm: boolean) => void
    id: number
    name: string
    src: string | undefined
    dialogs: Array<DialogType> | null
}
type UseSendMessageFormType = {
    onClose: (openForm: boolean) => void
    id: number
    dialogs: Array<DialogType> | null
}
//========================== STYLES ======================
const useStyles = makeStyles({
    paper: {
        width: 500
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: indigo[500],
        color: 'white',
        padding: '5px 5px 5px 15px',
    },
    title: {
        flexGrow: 1
    },
    titleLink: {
        color: 'white',
    },
    titleIcon: {
        color: 'white',
        marginLeft: 10
    },
    friendInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0 15px 0'
    },
    avatar: {
        marginRight: 10
    },
    content: {
        backgroundColor: indigo[50],
        paddingBottom: 15
    },
    textArea: {
        width: '100%',
    },
    button: {
        marginTop: 15
    }
});

const useStylesField = makeStyles({
    root: {
        backgroundColor: 'white'
    },
})