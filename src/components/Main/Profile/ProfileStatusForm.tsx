import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import {reduxForm, Field, InjectedFormProps} from 'redux-form'
import {updateStatus} from "../../../redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import RenderTextField from "../../common/RenderTextField";
import {empty, maxLength30} from "../../../utilities/validators/validators";
import {getStatusSelector} from "../../../redux/profile-selectors";

//=================================== FORM ==========================================================================================
const Form: React.FC<InjectedFormProps<StatusFormValuesType, StatusFormOwnPropsType> & StatusFormOwnPropsType> = (props) => {
    const {handleSubmit, submitting, pristine, reset, error, onClose} = props
    const classes = useStyles();
    const classesField = useStylesField();

    const normalize = (value: any) => {
        if (empty(value)) {
            return ''
        } else return value
    };

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
                    Save status
                </Button>
            </div>
        </form>)
};

//===================================== REDUX-FORM===============================================================
const ReduxStatusForm = reduxForm<StatusFormValuesType, StatusFormOwnPropsType>({
    form: 'status',
})(Form);


//====================================== COMPONENT =====================================================================
const ProfileStatusForm = (props: PropsType) => {
    const {id, open, anchorEl, onClose} = props
    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = (formValue: StatusFormValuesType) => {
        console.log(formValue);
        dispatch(updateStatus(formValue.status));
    };

    const statusFromState = useSelector(getStatusSelector);
    const status = statusFromState ? statusFromState : ''

    const initialValues = {
        status: status
    };

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}

            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            classes={{
                paper: classes.paper,
            }}
        >
            <ReduxStatusForm onSubmit={onSubmit}
                             initialValues={initialValues}
                             onClose={onClose}/>
        </Popover>
    )
};

export default ProfileStatusForm

//=================================TYPES===================================================
type initialValuesType = {
    status: string
}

type PropsType = {
    id: string | undefined
    open: boolean
    anchorEl: HTMLButtonElement | null
    onClose: () => void

}
type StatusFormValuesType = {
    status: string
}
type StatusFormOwnPropsType = {
    onClose: () => void
    initialValues: initialValuesType
}

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
        //backgroundColor: indigo[50],
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


