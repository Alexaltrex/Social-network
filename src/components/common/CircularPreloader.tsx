import {CircularProgress} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

//======================== CUSTOM HOOK =========================
const useCircularPreloader = ({styleType}: UseCircularPreloaderPropsType) => {
    const classesAbsolute = useStylesAbsolute();
    const classesStaticCenter = useStylesStaticCenter();
    const classesStaticTop = useStylesStaticTop();
    let classes = classesStaticCenter;
    if (styleType === 'absolute') {
        classes = classesAbsolute;
    }
    if (styleType === 'static-top') {
        classes = classesStaticTop;
    }
    return {classes}
};

//======================= COMPONENT ===============================
const CircularPreloader: React.FC<PropsType> = (props) => {
    const {size = 100, styleType = 'static-center'} = props;
    const {classes} = useCircularPreloader({styleType});

    return (
        <div className={classes.circularWrapper}>
            <CircularProgress size={size} color={'secondary'}/>
        </div>
    )
};

export default CircularPreloader;

//============================ TYPES ==================================================
type PropsType = {
    size?: number | undefined
    styleType?: 'absolute' | 'static-center' | 'static-top'
}
type UseCircularPreloaderPropsType = {
    styleType?: 'absolute' | 'static-center' | 'static-top'
}

//============================ STYLES =======================================================
const useStylesAbsolute = makeStyles({
    circularWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001
    }
});
const useStylesStaticCenter = makeStyles({
    circularWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
const useStylesStaticTop = makeStyles({
    circularWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
