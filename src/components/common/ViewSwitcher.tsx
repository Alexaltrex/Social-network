import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import {ToggleButtonGroup} from "@material-ui/lab";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React from 'react';
import {ViewType} from "../../types/types";

//======================== CUSTOM HOOK =========================
const useViewSwitcher = ({setView}: UseViewSwitcherType) => {
    const onChangeHandle = (event: React.MouseEvent<HTMLElement>, newView: ViewType) => {
        setView(newView);
    };
    return {onChangeHandle}
};

//====================== COMPONENT ================
const ViewSwitcher: React.FC<PropsType> = ({view, setView}) => {
    const {onChangeHandle} = useViewSwitcher({setView});

    return (
        <ToggleButtonGroup
            size='small'
            exclusive
            value={view}
            onChange={onChangeHandle}
            aria-label="items view"
        >
            <ToggleButton value="block" aria-label="block view">
                <ViewModuleIcon fontSize='small' color='primary'/>
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
                <ViewListIcon fontSize='small' color='primary'/>
            </ToggleButton>

        </ToggleButtonGroup>
    )
};

export default ViewSwitcher;

//========================== TYPES ===========================
type PropsType = {
    view: ViewType
    setView: (view: ViewType) => void
}
type UseViewSwitcherType = {
    setView: (view: ViewType) => void
}