import Button from "@material-ui/core/Button";
import React, {ReactElement} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {reduxForm, Field, InjectedFormProps} from 'redux-form'
import {updateStatus} from "../../../redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import RenderTextField from "../../common/RenderTextField";
import {empty, maxLength30} from "../../../utilities/validators/validators";
import {getStatusSelector} from "../../../redux/profile-selectors";
import {translate} from "../../../const/lang";
import {getLang} from "../../../redux/app-selectors";

//===================== CUSTOM HOOK ===========================
const useForm = () => {
    const classes = useStyles();
    const classesField = useStylesField();
    const lang = useSelector(getLang);
    const normalize = (value: string) => {
        if (empty(value)) {
            return ''
        } else return value
    };
    const buttonLabel = translate(lang, 'Save status');
    return {classes, classesField, normalize, buttonLabel}
}

//======================== FORM ================================
const Form: React.FC<FormPropsType> = ({handleSubmit, onClose}): ReactElement => {
    const {classes, classesField, normalize, buttonLabel} = useForm();

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div>
                <Field className={classes.field}
                       classes={classesField}
                       autoFocus={true}
                       name='status'
                       validate={[maxLength30]}
                       component={RenderTextField}
                       size='small'
                       normalize={normalize}
                />
            </div>
            <div>
                <Button classes={{
                    root: classes.button
                }}
                        color='primary'
                        size='small'
                        type="submit"
                        onClick={onClose}
                        variant="outlined">
                    {buttonLabel}
                </Button>
            </div>
        </form>)
};

//===================================== REDUX-FORM===============================================================
const ReduxStatusForm = reduxForm<StatusFormValuesType, StatusFormOwnPropsType>({
    form: 'status',
})(Form);

//===================== CUSTOM HOOK ===========================
const useProfileStatusForm = () => {
    const dispatch = useDispatch();
    const onSubmit = (formValue: StatusFormValuesType) => {
        dispatch(updateStatus(formValue.status));
    };
    const statusFromState = useSelector(getStatusSelector);
    const status = statusFromState ? statusFromState : ''
    const initialValues = {
        status: status
    };
    return {onSubmit, initialValues}
};

//====================================== COMPONENT =====================================================================
const ProfileStatusForm = ({onClose}: PropsType): ReactElement => {
    const {
        onSubmit, initialValues
    } = useProfileStatusForm();

    return (
        <ReduxStatusForm onSubmit={onSubmit}
                         initialValues={initialValues}
                         onClose={onClose}/>
    )
};

export default ProfileStatusForm

//=================================TYPES===================================================
type initialValuesType = {
    status: string
}
type PropsType = {
    onClose: () => void
}
type StatusFormValuesType = {
    status: string
}
type StatusFormOwnPropsType = {
    onClose: () => void
    initialValues: initialValuesType
}
type FormPropsType = InjectedFormProps<StatusFormValuesType, StatusFormOwnPropsType> & StatusFormOwnPropsType

//======================== STYLE =================================================================
const useStyles = makeStyles({
    paper: {
        right: 36,
        border: '1px solid #ccc'
    },
    button: {
        marginTop: 10,
    },
    form: {
        padding: 5,
    },
    field: {
        width: '100%',
        backgroundColor: 'white'
    }
});

const useStylesField = makeStyles({
        root: {
            fontSize: '0.875rem',
            padding: 0
        },
        input: {
            padding: 0
        },
        marginDense: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 6,
            borderRadius: 0,
            border: '1px solid #ccc'
        }
    }
);


