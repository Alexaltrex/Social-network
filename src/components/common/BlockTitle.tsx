import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const BlockTitle: React.FC<PropsType> = ({title}) => {
    const classes = useStyles();

    return (
        <div className={classes.block}>
            <Divider classes={{
                root: classes.divider
            }}/>
            <Typography variant='subtitle2'
                //color='primary'
                        className={classes.title}
            >
                {title}
            </Typography>
        </div>
    )
};

export default BlockTitle;


//==================== TYPES =====================
type PropsType = {
    title: string
}

//======================== STYLE =================
const useStyles = makeStyles({
    block: {
        position: 'relative'
    },
    divider: {
        marginTop: 16,
        marginBottom: 16
    },
    title: {
        position: 'absolute',
        left: 8,
        top: '50%',
        transform: 'translate(0, -50%)',
        backgroundColor: 'white',
        paddingLeft: 3,
        paddingRight: 3,
    }
})