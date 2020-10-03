import React from "react";
import Typography from "@material-ui/core/Typography";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const Settings: React.FC = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card} elevation={6}>
            <Typography variant='h6' color='primary' align='center'>
                Settings
            </Typography>

        </Card>
    )
};

export default Settings;

//================== STYLE =========================
const useStyles = makeStyles({
    card: {
        padding: 20,

    }
});