import {FormControl} from "@material-ui/core";
import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

//======================== CUSTOM HOOK =========================
const useRenderRadioButton = ({labels, classes}: UseRenderRadioButtonType) => {
    const formControlLabelElements = labels
        .map((el, i) => <FormControlLabel value={el.value}
                                          key={i}
                                          className={classes.formControlLabel}
                                          control={<Radio/>}
                                          label={el.label}/>)
    return {formControlLabelElements}
};


//======================= COMPONENT ===============================
const RenderRadioButton: React.FC<PropsType> = (props) => {
    const {labels, value, input, classes, label, ...rest} = props;
    const {formControlLabelElements} = useRenderRadioButton({labels, classes});
    return (
        <FormControl >
            <FormLabel component="legend" className={classes.formLabel}>
                {label}
            </FormLabel>
            <RadioGroup value="all" className={classes.radioGroup}  {...input} {...rest}>
                {formControlLabelElements}
            </RadioGroup>
        </FormControl>
    )
};

export default RenderRadioButton;

//======================= TYPES ======================================================
type labelsItemType = {
    value: string
    label: string
}
type PropsType = {
    value: string
    labels: Array<labelsItemType>
    input: any
    classes: any
    label: string
}
type UseRenderRadioButtonType = {
    labels: Array<labelsItemType>
    classes: any
}
