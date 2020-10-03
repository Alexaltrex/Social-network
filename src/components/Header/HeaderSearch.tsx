import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {shouldNotBeEmpty} from "../../utilities/validators/validators";
import SearchIcon from '@material-ui/icons/Search';
import RenderNakedTextAreaField from "../common/RenderNakedTextareaField";
import indigo from "@material-ui/core/colors/indigo";

//===================== FORM ==================================
const Form: React.FC<FormPropsType> = (props) => {
    const {handleSubmit, submitting, pristine} = props;
    const classes = useStyles();
    const classesField = useStylesField();
    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.fieldWrapper}>
                <SearchIcon className={classes.icon}/>
                <Field name='name'
                       component={RenderNakedTextAreaField}
                       validate={[shouldNotBeEmpty]}
                    //autoFocus={true}
                       multiline={false}
                    //rows={1}
                       className={classes.field}
                       classes={classesField}
                    //label='Enter your message'
                       placeholder='Search...'
                       size='small'
                />
            </div>

        </form>
    );
};

//============================= REDUX-FORM ========================================
const ReduxForm = reduxForm<FormValuesType, OwnPropsType>({
    form: 'header-search',
})(Form);

const HeaderSearch: React.FC = () => {
    const onSubmit = (formValue: FormValuesType) => {
        console.log(formValue);
    };

    return (
        <div>
            <ReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

export default HeaderSearch;

//=========================== TYPE =======================
type OwnPropsType = {}
export type FormValuesType = {
    name: string,
}
type FormPropsType = InjectedFormProps<FormValuesType, OwnPropsType> & OwnPropsType

type ComponentPropsType = {
    // open: boolean
    // onClose: (openForm: boolean) => void
    // id: number
    // name: string
    // src: string | undefined
    // dialogs: Array<DialogType> | null
}
//========================== STYLES ======================
const useStyles = makeStyles({
    field: {
        color: 'white',
    },
    fieldWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: indigo[400],
        height: 40,
        borderRadius: 20,
        paddingRight: 20,
        '&:hover': {
            backgroundColor: indigo[300],
        },
        marginRight: 15
    },
    icon: {
        padding: '0 10px'
    }
});

const useStylesField = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            transition: theme.transitions.create('width'),
            width: 200,
            '&:focus': {
                width: 300
            }
        }
    })
)