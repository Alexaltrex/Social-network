import React, {useState} from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {useDispatch, useSelector} from "react-redux";
import {getProfileSelector} from "../../../redux/profile-selectors";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularPreloader from "../../common/CircularPreloader";
import ProfileStatus from "./ProfileStatus";
import Divider from "@material-ui/core/Divider";
import BlockTitle from "../../common/BlockTitle";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import BlockField from "../../common/BlockField";
import {ContactsType, ProfileType} from "../../../types/types";

const ProfileInfo: React.FC<PropsType> = ({isOwner, userId, profile}) => {
    const classes = useStyles();
    const [showDetailedInfo, setShowDetailedInfo] = useState(false)

    const onShowInfoClick = () => {
        setShowDetailedInfo(!showDetailedInfo);
    };

    const showDetailedInfoTitle = showDetailedInfo
        ? 'Hide detailed information'
        : 'Show detailed information';

    const lookingForAJob = profile && profile.lookingForAJob ? 'Да' : 'Нет';

    const contactsElements = profile && Object
        .keys(profile.contacts)
        .map(key => {
            if (profile.contacts[key as keyof ContactsType]) {
                return <BlockField left={key} right={profile.contacts[key as keyof ContactsType]} rightType='link'/>
            }
        });

    if (!profile) return <CircularPreloader/>

    return (
        <Card className={classes.card}
              elevation={6}>
            <CardContent className={classes.cardContent}>
                <Typography variant='h6'
                            color='primary'
                            classes={{
                                h6: classes.fullName
                            }}>
                    {profile.fullName}
                </Typography>
                <ProfileStatus isOwner={isOwner} userId={userId}/>

                <Divider classes={{
                    root: classes.divider
                }}/>

                <ListItem button
                          className={classes.showDetailInfo}
                          onClick={onShowInfoClick}
                          classes={{
                              //root: classes.listItem,
                              //gutters: classes.gutters
                          }}
                >
                    <Typography variant='body2' align='center' color='primary' display='block'>
                        {showDetailedInfoTitle}
                    </Typography>
                </ListItem>

                <Collapse in={showDetailedInfo} timeout="auto" unmountOnExit>

                    <>
                        <BlockTitle title='About job'/>
                        <BlockField left='Looking for a job' right={lookingForAJob}/>
                        {
                            profile.lookingForAJobDescription
                            && <BlockField left='My professional skills' right={profile.lookingForAJobDescription}/>
                        }
                    </>

                    {Object.keys(profile.contacts).some(key => profile.contacts[key as keyof ContactsType])
                        ? <>
                            <BlockTitle title='Contacts'/>
                            {contactsElements}
                        </>
                        : <>
                            {isOwner &&
                            <>
                                <BlockTitle title='Contacts'/>
                                <Typography color='textSecondary' align='center'>No information available</Typography>
                            </>
                            }
                        </>
                    }


                </Collapse>

            </CardContent>
        </Card>
    );
}
export default ProfileInfo;

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {
    },
    cardContent: {
        paddingLeft: 5,
        paddingTop: 15,
        paddingRight: 5,
        '&:last-child': {
            paddingBottom: 15
        }
    },
    fullName: {
        paddingLeft: 10,
        marginBottom: 5,
        lineHeight: '1.25rem'
    },
    divider: {
        marginTop: 5,
        marginBottom: 16
    },
    showDetailInfo: {
        justifyContent: 'center'
    }
});

//========================== TYPES =================================================
type PropsType = {
    isOwner: boolean
    userId: number
    profile: ProfileType
}