import React from "react";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const FriendsSomethingElse: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={6}>
            <Typography variant='h6' color='primary' align='center'>
                Something else
            </Typography>

        </Card>
    )
};

export default FriendsSomethingElse;

const useStyles = makeStyles({
    card: {
        padding: 20,

    }
});