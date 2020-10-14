import Button from "@material-ui/core/Button";
import React from "react";
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getLang} from "../../redux/app-selectors";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { appAC } from "../../redux/app-reducer";
import {translate} from "../../const/lang";

const HeaderLang: React.FC<PropsType> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseRus = () => {
        dispatch(appAC.setLang('rus'));
        setAnchorEl(null);
    };
    const handleCloseEng = () => {
        dispatch(appAC.setLang('eng'));
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={translate(lang, 'Change language')} placement="bottom-start">
                <Button
                    className={classes.button}
                    startIcon={<LanguageIcon/>}
                    endIcon={<ExpandMoreIcon/>}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {translate(lang, 'English')}
                </Button>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCloseEng}
                          selected={lang === 'eng'}
                >
                    English
                </MenuItem>
                <MenuItem onClick={handleCloseRus}
                          selected={lang === 'rus'}
                >
                    Русский
                </MenuItem>
            </Menu>
        </>
    )
};

export default HeaderLang;


//========================== TYPE ========================
type PropsType = {}

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        color: 'white',
        marginRight: 10,
        textTransform: 'none'
    },
})