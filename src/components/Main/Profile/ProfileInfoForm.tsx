import React, {ReactElement} from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentInfoFormSidebarItem, getProfileSelector} from "../../../redux/selectors/profile-selectors";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import RenderTextField from "../../common/RenderTextField";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import RenderCheckbox from "../../common/RenderCheckbox";
import SaveIcon from '@material-ui/icons/Save';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import HttpIcon from '@material-ui/icons/Http';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
import ContactsIcon from '@material-ui/icons/Contacts';
import CircularPreloader from "../../common/CircularPreloader";
import {ProfileSidebarItemEnum, ProfileType} from "../../../types/types";
import clsx from "clsx";
import RenderTextAreaField from "../../common/RenderTextareaField";
import {saveProfile} from "../../../redux/profile-reducer";
import {required, shouldNotBeEmpty} from "../../../utilities/validators/validators";
import {getLang} from "../../../redux/selectors/app-selectors";
import {translate} from "../../../const/lang";

//===================== CUSTOM HOOK ===========================
const useForm = ({profile}: FormOwnPropsType) => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const currentInfoFormSidebarItem = useSelector(getCurrentInfoFormSidebarItem);
    const FieldContactsIconArray = [
        <FacebookIcon/>,
        <HttpIcon/>,
        <ContactsIcon/>,
        <TwitterIcon/>,
        <InstagramIcon/>,
        <YouTubeIcon/>,
        <GitHubIcon/>,
        <LanguageIcon/>
    ];
    const FieldContactsElements = Object.keys(profile.contacts)
        .map((el, i) => <div key={i} className={classes.fieldWrapper}>
            <Field name={`contacts.${el}`}
                   icon={FieldContactsIconArray[i]}
                   component={RenderTextField}
                   validate={[shouldNotBeEmpty]}
                   className={classes.field}
                   label={el}
                   size='small'
            />
        </div>);

    return {
        classes, lang, currentInfoFormSidebarItem,
        FieldContactsElements
    }
};

//========================== FORM ==============================================
const Form: React.FC<InjectedFormProps<FormValuesType, FormOwnPropsType> & FormOwnPropsType> = (props): ReactElement => {
    const {handleSubmit, submitting, pristine, error, profile} = props;
    const {
        classes, lang, currentInfoFormSidebarItem,
        FieldContactsElements
    } = useForm({profile});

    return (
        <form onSubmit={handleSubmit}>
            <div
                className={clsx(classes.fieldWrapper, (currentInfoFormSidebarItem) !== ProfileSidebarItemEnum.main && classes.hide)}>
                <Field name='fullName'
                       icon={<AccountCircleIcon/>}
                       component={RenderTextField}
                       validate={[required, shouldNotBeEmpty]}
                       className={classes.field}
                       label={translate(lang, 'Name')}
                       size='small'
                />
            </div>

            <div className={clsx(currentInfoFormSidebarItem !== ProfileSidebarItemEnum.job && classes.hide)}>
                <div className={classes.fieldWrapper}>
                    <Field name='lookingForAJob'
                           component={RenderCheckbox}
                           className={classes.iconField}
                           label={translate(lang, 'Looking for a job')}
                           size='small'
                           variant='outlined'
                    />
                </div>
                <div className={classes.fieldWrapper}>
                    <Field name='lookingForAJobDescription'
                           icon={<WorkIcon/>}
                           component={RenderTextAreaField}
                           validate={[shouldNotBeEmpty]}
                           className={classes.field}
                           label = {translate(lang, 'My professional skills')}
                           placeholder={translate(lang, 'My professional skills')}
                           size='small'
                    />
                </div>
            </div>

            <div className={clsx(currentInfoFormSidebarItem !== ProfileSidebarItemEnum.contacts && classes.hide)}>
                {FieldContactsElements}
            </div>

            <Button type="submit"
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    disabled={submitting || pristine}
                    className={classes.button}>
                {translate(lang, 'Save')}
            </Button>

            {error && !pristine &&
            <Typography color='error' variant='h6'>
                {error}
            </Typography>}

        </form>
    )
};

//----------------------------REDUX-FORM------------------------------------------------
const ReduxForm = reduxForm<FormValuesType, FormOwnPropsType>({
    form: 'profile-info',
})(Form);

//===================== CUSTOM HOOK ===========================
const useProfileInfoForm = () => {
    const classes = useStyles();
    const currentInfoFormSidebarItem = useSelector(getCurrentInfoFormSidebarItem);
    const profile = useSelector(getProfileSelector);
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    let title;
    switch (currentInfoFormSidebarItem) {
        case 0: {
            title = translate(lang, 'Main')
            break
        }
        case 1: {
            title = translate(lang, 'Job')
            break
        }
        case 2: {
            title = translate(lang, 'Contacts')
            break
        }
    }
    let onSubmit = (values: FormValuesType) => {
        dispatch(saveProfile(values));
    };
    const initialValues = profile ? profile : undefined;

    return {
        classes, profile, title, onSubmit, initialValues
    }
}

//----------------------------COMPONENT-------------------------------------------------------
const ProfileInfoForm: React.FC = (): ReactElement => {
    const {
        classes, profile, title, onSubmit, initialValues
    } = useProfileInfoForm();

    return (
        <>
            {profile
                ? <Card className={classes.card}
                        elevation={6}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='h6'
                                    color='primary'
                                    classes={{
                                        h6: classes.title
                                    }}>
                            {title}
                        </Typography>
                        <Divider classes={{
                            root: classes.divider
                        }}/>

                        <ReduxForm onSubmit={onSubmit}
                                   profile={profile}
                                   initialValues={initialValues}
                        />

                    </CardContent>
                </Card>
                : <CircularPreloader/>
            }
        </>
    )
};

export default ProfileInfoForm;

//========================= TYPES ==============================================
type FormValuesType = ProfileType;
type FormOwnPropsType = {
    profile: ProfileType
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {},
    cardContent: {
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15,
        '&:last-child': {
            paddingBottom: 15
        }
    },
    title: {
        marginLeft: 15,
    },
    divider: {
        marginTop: 5,
        marginBottom: 15
    },
    field: {
        width: '100%',
    },
    iconField: {
        marginBottom: 35,
    },
    fieldWrapper: {
        marginLeft: 35,
        marginBottom: 15
    },
    button: {
        width: '100%',
    },
    hide: {
        display: 'none'
    }
});







