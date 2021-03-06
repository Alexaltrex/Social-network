import React, {ReactElement} from "react";
import {reduxForm, Field, InjectedFormProps, reset} from "redux-form";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {shouldNotBeEmpty} from "../../utilities/validators/validators";
import SearchIcon from '@material-ui/icons/Search';
import RenderNakedTextAreaField from "../common/RenderNakedTextareaField";
import indigo from "@material-ui/core/colors/indigo";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {usersAC} from "../../redux/reducers/users-reduser";
import {getLang} from "../../redux/selectors/app-selectors";
import {Lang} from "../../const/lang";

//==================== CUSTOM HOOK =========================
const useForm = () => {
    const classes = useStyles();
    const classesField = useStylesField();
    const lang = useSelector(getLang);
    const placeholder = lang === 'rus' ? Lang['Search...'].rus : Lang['Search...'].eng;
    return {classes, classesField, placeholder}
};

//===================== FORM ==================================
const Form: React.FC<FormPropsType> = ({handleSubmit}) => {
    const {classes, classesField, placeholder} = useForm();
    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.fieldWrapper}>
                <SearchIcon className={classes.icon}/>
                <Field name='name'
                       component={RenderNakedTextAreaField}
                       validate={[shouldNotBeEmpty]}
                       multiline={false}
                       className={classes.field}
                       classes={classesField}
                       placeholder={placeholder}
                       size='small'
                />
            </div>

        </form>
    );
};

//============================= REDUX-FORM ========================================
const afterSubmit = (result: any, dispatch: any) => {
    dispatch(reset('header-search'));
};

const ReduxForm = reduxForm<FormValuesType, OwnPropsType>({
    form: 'header-search',
    onSubmitSuccess: afterSubmit,
})(Form);

//==================== CUSTOM HOOK =========================
const useHeaderSearch = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const onSubmit = (formValue: FormValuesType) => {
        dispatch(usersAC.setValueFromHeaderSearch(formValue.name))
        history.push('/users');
    };
    return {onSubmit}
};

//============================ COMPONENT ============================================
const HeaderSearch: React.FC<ComponentPropsType> = (): ReactElement => {
    const {onSubmit} = useHeaderSearch();
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

type ComponentPropsType = {}
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
        padding: '0 10px',
        color: 'white'
    }
});

const useStylesField = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            transition: theme.transitions.create('width'),
            backgroundColor: 'none',
            width: 200,
            '&:focus': {
                width: 300
            }
        }
    })
)