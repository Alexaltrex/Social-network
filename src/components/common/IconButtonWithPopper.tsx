import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem";


const IconButtonWithPopper: React.FC<PropsType> = (props) => {
    const {icon, classes, labels, callbacks} = props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const menuItemsElements = labels.map((el, i) => {
        const onClickHandle = (event: React.MouseEvent<EventTarget>) => {
            handleClose(event);
            callbacks[i]();
        }
        return (
            <MenuItem key={i}
                      onClick={onClickHandle}
            >
                {labels[i]}
            </MenuItem>
        )

    })


    return (
        <div>
            <IconButton ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        edge="end"
                        aria-label="delete"
                        className={classes.iconButton}>
                {icon}
            </IconButton>
            <Popper className={classes.popper}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    placement='bottom-end'
                    disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow"
                                          onKeyDown={handleListKeyDown}>
                                    {menuItemsElements}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
};

export default IconButtonWithPopper;


//======================== TYPE ====================================
type PropsType = {
    icon: React.ReactElement
    classes: any
    labels: Array<string>
    callbacks: Array<() => void>
};