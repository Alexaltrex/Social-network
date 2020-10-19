import React, {ReactElement} from "react";
import {Grid} from "@material-ui/core";
import {UserType, ViewType} from "../../../types/types";
import UserBlockItem from "./UserBlockItem";
import {DialogType} from "../../../DAL/dialogs-api";
import UserListItem from "./UserListItem";
import List from "@material-ui/core/List";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

//======================== CUSTOM HOOK =========================
const useUsersList = (
    users: null | Array<UserType>,
    dialogs: null | Array<DialogType>,
    isLoading: boolean,
    pageSize: number
) => {
    const classes = useStyles();
    const usersBlockItems = users && users.map(user => <UserBlockItem
        user={user}
        key={user.id}
        dialogs={dialogs}
    />);
    const usersListItems = users && users.map(user => <UserListItem
        user={user}
        key={user.id}
        dialogs={dialogs}
    />);
    const allIsLoaded = !isLoading && users && dialogs;
    let skeletonBlockItems = [] as Array<React.ReactElement>;
    for (let i = 0; i < pageSize; i++) {
        skeletonBlockItems.push(
            <Grid item key={i}>
                <Skeleton variant="rect" width={170} height={272} className={classes.skeletonBlockItem}/>
            </Grid>
        )
    }
    let skeletonListItems = [] as Array<React.ReactElement>;
    for (let i = 0; i < pageSize; i++) {
        skeletonListItems.push(
            <Skeleton variant="rect" width='100%' height={96} className={classes.skeletonListItem}/>
        )
    }
    return {
        usersBlockItems, usersListItems,
        allIsLoaded, skeletonBlockItems, skeletonListItems
    }
};

//======================= COMPONENT ===============================
const UsersList: React.FC<PropsType> = ({isLoading, users, dialogs, view, pageSize}): ReactElement => {
    const {
        usersBlockItems, usersListItems,
        allIsLoaded, skeletonBlockItems, skeletonListItems
    } = useUsersList(users, dialogs, isLoading, pageSize);

    return (
        <div>
            {
                view === "block" &&
                <>
                    {
                        allIsLoaded
                            ? <Grid container alignContent='stretch' justify='flex-start' wrap='wrap' spacing={2}>
                                {usersBlockItems}
                            </Grid>
                            : <Grid container alignContent='stretch' justify='flex-start' wrap='wrap' spacing={2}>
                                {skeletonBlockItems}
                            </Grid>
                    }
                </>
            }

            {
                view === "list" &&
                <>
                    {
                        allIsLoaded
                            ? <List disablePadding>
                                {usersListItems}
                            </List>
                            : <List disablePadding>
                                {skeletonListItems}
                            </List>
                    }
                </>
            }

        </div>
    )
};

export default UsersList;

//======================= TYPES =====================
type PropsType = {
    isLoading: boolean
    users: null | Array<UserType>
    dialogs: null | Array<DialogType>
    view: ViewType
    pageSize: number
};

//========================== STYLES =============================================================
const useStyles = makeStyles({
    skeletonBlockItem: {
        borderRadius: 4
    },
    skeletonListItem: {
        borderRadius: 4,
        marginBottom: 5
    }
})