import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';


const BlockField: React.FC<PropsType> = (props) => {
    const {left, right, rightType} = props;
    const classes = useStyles();
    return (
        <div className={classes.block}>
            {left && <div className={classes.left}>
                <Typography color='textSecondary'>{left}</Typography>
            </div>}
            {rightType === undefined && <div className={classes.right}>
                <Typography>{right}</Typography>
            </div>}
            {rightType === 'link' && <div className={classes.right}>
                <Link href={right}>
                    {right}
                </Link>
            </div>}
        </div>
    )
};

export default BlockField;

//========================== STYLES ================================================
const useStyles = makeStyles({
    block: {
        display: 'flex',
        paddingLeft: 11
    },
    left: {
        flexBasis: 200
    },
    right: {
        flexGrow: 1
    }
});

//========================== TYPES =================================================
type PropsType = {
    left: string | null
    right: string
    rightType?: undefined | 'link'
}