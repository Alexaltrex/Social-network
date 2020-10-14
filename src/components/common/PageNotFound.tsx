import React from "react";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getLang} from "../../redux/app-selectors";
import {translate} from "../../const/lang";

const PageNotFound: React.FC = () => {
    const lang = useSelector(getLang);
    return (
        <Typography align='center'
                    color='secondary'
                    variant='h6'>
            {translate(lang, 'Page not found')}
        </Typography>
    )

};

export default PageNotFound;


