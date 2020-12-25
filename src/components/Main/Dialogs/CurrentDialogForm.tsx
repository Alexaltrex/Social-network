import SendIcon from '@material-ui/icons/Send';
import {IconButton} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import RenderTextAreaField from "../../common/RenderTextareaField";
import {shouldNotBeEmpty} from "../../../utilities/validators/validators";
import {reduxForm, Field, InjectedFormProps, reset} from "redux-form";
import grey from "@material-ui/core/colors/grey";
import {dialogsSagaAC} from "../../../redux/reducers/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getLoading,
    getMessageIsSending,
} from "../../../redux/selectors/dialogs-selectors";
import {getLang} from "../../../redux/selectors/app-selectors";
import {translate} from "../../../const/lang";

//================= Custom Hook =========================
const useForm = (messageIsSending: boolean) => {
    const classes = useStyles();
    const classesField = useStylesField();
    const lang = useSelector(getLang);
    const label = messageIsSending
        ? translate(lang, 'Message is sent...')
        : translate(lang, 'Enter your message');
    const placeholder = translate(lang, 'Enter your message');
    return {classes, classesField, label, placeholder}
}

//===================== FORM ==================================
const Form: React.FC<FormPropsType> = (props) => {
    const {handleSubmit, submitting, pristine, loading, messageIsSending} = props;
    const {classes, classesField, label, placeholder} = useForm(messageIsSending);

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.fieldWrapper}>
                <Field name='message'
                       component={RenderTextAreaField}
                       validate={[shouldNotBeEmpty]}
                       autoFocus={true}
                       rows={1}
                       className={classes.textArea}
                       classes={classesField}
                       label={label}
                       placeholder={placeholder}
                       size='small'
                />
            </div>

            <IconButton
                type="submit"
                color='primary'
                disabled={submitting || pristine || loading}
            >
                <SendIcon/>
            </IconButton>

        </form>
    );
};

//============================= REDUX-FORM ========================================
const afterSubmit = (result: any, dispatch: any) => {
    dispatch(reset('send-message-from-dialog'));
}

const ReduxForm = reduxForm<FormValuesType, OwnPropsType>({
    form: 'send-message-from-dialog',
    onSubmitSuccess: afterSubmit
})(Form);

//================= Custom Hook =========================
const useCurrentDialogForm = (id: number | undefined) => {
    const classes = useStyles();
    const messageIsSending = useSelector(getMessageIsSending);
    const loading = useSelector(getLoading);
    const dispatch = useDispatch();

    const onSubmit = (formValue: FormValuesType) => {
        if (id) {
            dispatch(dialogsSagaAC.sendMessage(id, formValue.message))
        }
    };
    return {
        classes, messageIsSending, loading, onSubmit
    }
};

//============================= COMPONENT =========================================
const CurrentDialogForm: React.FC<ComponentPropsType> = ({id}) => {
    const {classes, messageIsSending, loading, onSubmit} = useCurrentDialogForm(id);

    return (
        <div className={classes.formWrapper}>
            <ReduxForm onSubmit={onSubmit}
                       messageIsSending={messageIsSending}
                       loading={loading}/>
        </div>
    )
};

export default CurrentDialogForm;

//=============================== TYPES ================================================
type OwnPropsType = {
    loading: boolean
    messageIsSending: boolean
}
export type FormValuesType = {
    message: string,
}
type FormPropsType = InjectedFormProps<FormValuesType, OwnPropsType> & OwnPropsType

type ComponentPropsType = {
    id: number | undefined
}

//========================== STYLES ===================================================
const useStylesField = makeStyles({
    root: {
        backgroundColor: 'white',
        width: '100%'
    },
});

const useStyles = makeStyles({
    formWrapper: {
        backgroundColor: grey[100],
        padding: 10,
    },
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    fieldWrapper: {
        flexGrow: 1,
        marginRight: 5
    },
    textArea: {
        width: '100%',

    }
})