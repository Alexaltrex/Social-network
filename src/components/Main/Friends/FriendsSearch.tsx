import React from "react";
import {Field, InjectedFormProps, reduxForm, reset, submit} from "redux-form";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core/styles";
import RenderTextField from "../../common/RenderTextField";
import {shouldNotBeEmpty} from "../../../utilities/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {usersAC} from "../../../redux/reducers/users-reduser";
import {IconButton} from "@material-ui/core";
import {getIsFriendsSearching, getSearchFriendsParams} from "../../../redux/selectors/users-selectors";
import CircularPreloader from "../../common/CircularPreloader";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {translate} from "../../../const/lang";
import {getLang} from "../../../redux/selectors/app-selectors";


//================= CUSTOM HOOK =========================
const useForm = () => {
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('friends-search')));
        dispatch(usersAC.setCurrentFriendsPage(1))
    };
    const nameOfTheFriendLabel = translate(lang, 'Name of the friend')
    return {onChangeHandler, nameOfTheFriendLabel}
}
//========================== FORM =======================================
const Form: React.FC<FormPropsType> = ({handleSubmit}) => {
    const {onChangeHandler, nameOfTheFriendLabel} = useForm();
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='term'
                       component={RenderTextField}
                       fullWidth
                       validate={[shouldNotBeEmpty]}
                       label={nameOfTheFriendLabel}
                       size='small'
                       onChange={onChangeHandler}
                />
            </div>
        </form>
    )
};

//================================== REDUX-FORM ======================================
const ReduxForm = reduxForm<FormParamsType, FormOwnPropsType>({
    form: 'friends-search',
    enableReinitialize: true,
})(Form);

//====================== CUSTOM HOOK =========================
const useFriendsSearch = () => {
    const classes = useStyles();
    const isFriendsSearching = useSelector(getIsFriendsSearching);
    const searchFriendsParams = useSelector(getSearchFriendsParams);
    const dispatch = useDispatch();
    const onSubmit = (formValue: FormParamsType) => {
        dispatch(usersAC.setSearchFriendsParams({term: formValue.term}))
    };
    const icon = searchFriendsParams.term === ''
        ? <SearchIcon/>
        : <HighlightOffIcon/>;
    const onClickHandler = () => {
        if (searchFriendsParams.term !== '') {
            dispatch(usersAC.setSearchFriendsParams({term: ''}));
            dispatch(usersAC.setCurrentFriendsPage(1));
            dispatch(reset('friends-search'));
        }
    };
    return {
        classes, isFriendsSearching, searchFriendsParams,
        onSubmit, icon, onClickHandler
    }
};

// =========================== COMPONENT ============================================================
const FriendsSearch: React.FC = () => {
    const {
        classes, isFriendsSearching,
        onSubmit, icon, onClickHandler, searchFriendsParams
    } = useFriendsSearch();

    return (
        <div className={classes.search}>
            <div className={classes.iconButton}>
                {
                    !isFriendsSearching
                        ? <IconButton onClick={onClickHandler}>{icon}</IconButton>
                        : <CircularPreloader size={20} styleType='absolute'/>
                }
            </div>

            <div className={classes.form}>
                <ReduxForm onSubmit={onSubmit} initialValues={searchFriendsParams}/>
            </div>

        </div>

    )

};

export default FriendsSearch;

//===================================== TYPES====================================================
type FormPropsType =
    InjectedFormProps<FormParamsType, FormOwnPropsType>
    & FormOwnPropsType;
type FormParamsType = {
    term: string
}
type FormOwnPropsType = {}

//===================================== STYLES ===================================================
const useStyles = makeStyles({
    fieldWrapper: {
        margin: '10px 10px 5px 35px'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px'
    },
    form: {
        flexGrow: 1
    },
    iconButton: {
        width: 48,
        height: 48,
        position: 'relative',
        marginRight: 5
    }

});