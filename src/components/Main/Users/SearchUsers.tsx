import React, {useRef} from "react";
import {reduxForm, Field, InjectedFormProps, submit} from 'redux-form'
import {makeStyles} from "@material-ui/core/styles";
import RenderTextField from "../../common/RenderTextField";
import {Button, Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import RenderRadioButton from "../../common/RenderRadioButton";
import SearchIcon from '@material-ui/icons/Search';
import Divider from "@material-ui/core/Divider";
import {shouldNotBeEmpty} from "../../../utilities/validators/validators";
import {useDispatch} from "react-redux";
import {searchUsers, usersAC} from "../../../redux/users-reduser";
import {SearchUsersParamsType} from "../../../types/types";

//========================== FORM =======================================
const SearchUsersForm: React.FC<SearchUsersFormPropsType> = (props) => {
    const {handleSubmit, submitting, pristine, reset, error} = props;
    const classes = useStyles();
    const classesRadioButton = useStylesRadioButton();
    const dispatch = useDispatch();

    return (

        <form onSubmit={handleSubmit}>

            <Field name='term'
                   component={RenderTextField}
                   fullWidth
                   validate={[shouldNotBeEmpty]}
                   label='User name'
                   size='small'
                   onChange={() => dispatch(submit('searchUsers'))}
            />

            <Field name='friend'
                   label='User are friend or not'
                   component={RenderRadioButton}
                   classes={classesRadioButton}
                   labels={[
                       {value: "all", label: 'All'},
                       {value: "true", label: 'Friend'},
                       {value: "false", label: 'Not friend'}
                   ]}
                   size='small'
            />

            <div>
                <Button type="submit"
                        size="small"
                        color='primary'
                        variant="contained"
                        startIcon={<SearchIcon/>}
                        disabled={submitting || pristine}
                        className={classes.button}
                >
                    Search
                </Button>
            </div>


            {error && !pristine &&
            <Typography color='error' variant='h6'>
                {error}
            </Typography>}

        </form>

    )
};

//================================== REDUX-FORM ======================================
const SearchUsersReduxForm = reduxForm<SearchUsersParamsType, SearchUsersFormOwnPropsType>({
    form: 'searchUsers',
    //validate
})(SearchUsersForm);

// =========================== COMPONENT ============================================================
const SearchUsers: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = (formValue: SearchUsersParamsType) => {
        console.log(formValue)
        dispatch(usersAC.setSearchUsersParams(formValue));
        dispatch(usersAC.setCurrentPage(1));
        dispatch(usersAC.setShowUsersFrom('search'));
    };

    const initialValues = {term: '', friend: 'all'} as SearchUsersParamsType;

    return (
        <Card className={classes.card} elevation={6}>
            <Typography variant='h6'
                        color='primary'
                        classes={{
                            h6: classes.title
                        }}>
                Search users
            </Typography>
            <Divider classes={{
                root: classes.divider
            }}/>
            <SearchUsersReduxForm onSubmit={onSubmit} initialValues={initialValues}/>
        </Card>
    )
};

export default SearchUsers;

//===================================== TYPES====================================================
type SearchUsersFormPropsType =
    InjectedFormProps<SearchUsersParamsType, SearchUsersFormOwnPropsType>
    & SearchUsersFormOwnPropsType;
type SearchUsersFormOwnPropsType = {}

//===================================== STYLES ===================================================
const useStyles = makeStyles({
    card: {
        padding: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    title: {
        marginLeft: 10,
    },
    divider: {
        marginTop: 5,
        marginBottom: 15
    },
    button: {
        textTransform: 'none'
    }
});
const useStylesRadioButton = makeStyles({
    formLabel: {
        margin: '15px 10px 5px',
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10
    },
    formControlLabel: {},

});