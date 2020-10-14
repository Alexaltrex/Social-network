import React from "react";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {getLang} from "../../../redux/app-selectors";
import {useSelector} from "react-redux";
import {translate} from "../../../const/lang";

const FriendsSomethingElse: React.FC = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);

    return (
        <Card className={classes.card} elevation={6}>
            <Typography variant='h6' color='primary' align='center'>
                {translate(lang, 'Something else')}
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