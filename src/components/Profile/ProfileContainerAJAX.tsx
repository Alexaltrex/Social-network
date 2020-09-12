import React, {useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import Profile from "./Profile";
import {RouteComponentProps} from "react-router";
import {ProfileContainerPropsType} from "./ProfileContainer";

// class ProfileContainerAJAX extends React.Component<PropsType> {
//
//     refreshProfile() {
//         const {match, authorizedUserId, history, getProfile, getStatus} = this.props;
//         let userId: null | number = +match.params.userId;
//         if (!userId) {
//             userId = authorizedUserId;
//             if (!userId) { // если авторизованного тоже нет
//                 history.push('/login');// программный редирект
//
//             }
//         }
//         if (!userId) {
//             throw new Error('ID should be exist')
//         } else {
//             getProfile(userId);
//             getStatus(userId);
//         }
////     }
//
//     componentDidMount() {
//         this.refreshProfile()
//     }
//
//     componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
//         if (this.props.match.params.userId !== prevProps.match.params.userId) {
//             this.refreshProfile()
//         }
//     }
//
//     render() {
//         return (
//             <>
//                 {this.props.isLoading ? <Preloader/> : null}
//                 <Profile profile={this.props.profile}
//                          savePhoto={this.props.savePhoto}
//                          saveProfile={this.props.saveProfile}
//                          status={this.props.status}
//                          updateStatus={this.props.updateStatus}
//                          isOwner={!this.props.match.params.userId}
//                 />
//             </>
//         );
//     }
// }
//
// export default ProfileContainerAJAX

type PathParamsType = {
    userId: string
}
type ProfileContainerAJAXPropsType = ProfileContainerPropsType & RouteComponentProps<PathParamsType>

const ProfileContainerAJAX: React.FC<ProfileContainerAJAXPropsType> = (props) => {
    const {match, authorizedUserId, history, getProfile, getStatus,
        isLoading, profile, savePhoto, saveProfile, status, updateStatus} = props;

    useEffect(()=>{
        let userId: null | number = +match.params.userId;
        if (!userId) {
            userId = authorizedUserId;
            if (!userId) { // если авторизованного тоже нет
                history.push('/login');// программный редирект

            }
        }
        if (!userId) {
            throw new Error('ID should be exist')
        } else {
            getProfile(userId);
            getStatus(userId);
        }
    }, [match.params.userId])

    return (
        <>
            {isLoading ? <Preloader/> : null}
            <Profile profile={profile}
                     savePhoto={savePhoto}
                     saveProfile={saveProfile}
                     status={status}
                     updateStatus={updateStatus}
                     isOwner={!match.params.userId}
            />
        </>
    )

};

export default ProfileContainerAJAX;