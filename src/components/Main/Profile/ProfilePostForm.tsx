import React, {ReactElement, useRef} from "react";
import {Button, Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {ProfileType} from "../../../types/types";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import PostAddIcon from '@material-ui/icons/PostAdd';
import {required, shouldNotBeEmpty} from "../../../utilities/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import RenderNakedTextAreaField from "../../common/RenderNakedTextareaField";
import Typography from "@material-ui/core/Typography";
import {profileAC} from "../../../redux/profile-reducer";
import {getEditingPost} from "../../../redux/selectors/profile-selectors";
import BlockTitle from "../../common/BlockTitle";
import {getLang} from "../../../redux/selectors/app-selectors";
import {translate} from "../../../const/lang";
import useOutsideClick from "../../../hooks/useOutsideClick";

//===================== CUSTOM HOOK ===========================
const useForm = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const placeholder = translate(lang, 'Enter your post');
    const buttonLabel = translate(lang, 'Add post')
    return {classes, placeholder, buttonLabel}
};

//============================ FORM ===================================
const Form: React.FC<FormPropsType> = (props): ReactElement => {
    const {handleSubmit, submitting, pristine} = props;
    const {classes, placeholder, buttonLabel} = useForm();

    return (
        <form onSubmit={handleSubmit}>
            <Field name='newPostText'
                   component={RenderNakedTextAreaField}
                   validate={[shouldNotBeEmpty, required]}
                   autoFocus={true}
                   className={classes.textArea}
                   placeholder={placeholder}
                   size='small'
            />

            <BlockTitle title=''/>

            <div>
                <Button type="submit"
                        size="small"
                        color='primary'
                        variant="contained"
                        startIcon={<PostAddIcon/>}
                        disabled={submitting || pristine}
                        className={classes.button}
                >
                    {buttonLabel}
                </Button>
            </div>
        </form>
    );
};

const afterSubmit = (result: any, dispatch: any) => {
    dispatch(reset('post'))
};

//============================= REDUX-FORM ========================================
const ReduxForm = reduxForm<FormValuesType, OwnPropsType>({
    form: 'post',
    onSubmitSuccess: afterSubmit,
})(Form);

//===================== CUSTOM HOOK ===========================
const useProfilePostForm = () => {
    const classes = useStyles();
    const editingPost = useSelector(getEditingPost)
    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const onSubmit = (formValue: FormValuesType) => {
        dispatch(profileAC.addPost(formValue.newPostText, lang));
    };
    const onClickHandler = () => {
        dispatch(profileAC.setEditingPost(true))
    };
    const onOutClickHandler = () => {
        dispatch(profileAC.setEditingPost(false))
    };
    const wrapperRef = useRef(null);

    return {
        classes, editingPost, lang, onSubmit,
        onClickHandler, onOutClickHandler, wrapperRef
    }
};

//============================= COMPONENT =====================================================
const ProfilePostForm: React.FC<PropsType> = ({profile}): ReactElement => {
    const {
        classes, editingPost, lang, onSubmit,
        onClickHandler, onOutClickHandler, wrapperRef
    } = useProfilePostForm();
    useOutsideClick(wrapperRef, onOutClickHandler);

    return (
        <Card className={classes.card}
              elevation={6}
              ref={wrapperRef}
        >
            <div className={classes.formWrapper}>
                <Avatar className={classes.avatar}
                        src={profile.photos.large ? profile.photos.large : undefined}
                />
                <div>
                    {
                        editingPost
                            ? <ReduxForm onSubmit={onSubmit}/>
                            : <Typography onClick={onClickHandler}
                                          color='textSecondary'
                                          className={classes.text}>
                                {translate(lang, 'Enter your post')}
                            </Typography>
                    }

                </div>

            </div>

        </Card>
    )
};

export default ProfilePostForm;

//========================== TYPES ==============================================
type PropsType = {
    profile: ProfileType
}
type OwnPropsType = {}
export type FormValuesType = {
    newPostText: string
}
type FormPropsType = InjectedFormProps<FormValuesType, OwnPropsType> & OwnPropsType

//========================== STYLES =============================================
const useStyles = makeStyles({
    card: {
        padding: 15,
        marginTop: 10,
    },
    avatar: {
        width: 28,
        height: 28,
        position: 'absolute',
        top: 0,
        left: 0
    },
    formWrapper: {
        position: 'relative'
    },
    textArea: {
        border: 0,
        width: '100%',
        marginLeft: 38
    },
    text: {
        marginLeft: 38
    },
    button: {
        textTransform: 'none'
    }
});



