import {Theme} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const LinearPreloader: React.FC = (props: any) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LinearProgress color={'secondary'}/>
        </div>
    )
};

export default LinearPreloader;

//============================= STYLES ===============================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            paddingTop: 12,
            paddingBottom: 12
            // '& > * + *': {
            //     marginTop: theme.spacing(2),
            // },
        },
    }),
);
