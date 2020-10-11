import React from "react";
import {makeStyles} from "@material-ui/core/styles";
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
const useStyles = makeStyles({
    root: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12
    },
});
