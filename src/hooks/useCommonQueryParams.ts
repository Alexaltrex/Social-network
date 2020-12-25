import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../redux/selectors/app-selectors";
import {getTheme} from "../redux/selectors/settings-selectors";
import {getCurrentSidebarItem} from "../redux/selectors/sidebar-selectors";
import {NumberParam, StringParam, useQueryParam} from "use-query-params";
import {useEffect} from "react";
import {appAC} from "../redux/reducers/app-reducer";
import {LangType} from "../types/types";
import {settingsAC} from "../redux/reducers/settings-reducer";
import {sidebarAC} from "../redux/reducers/sidebar-reducer";

const useCommonQueryParams = () => {
    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const theme = useSelector(getTheme);
    const currentSidebarItem = useSelector(getCurrentSidebarItem);

    const [langQuery, setLangQuery] = useQueryParam('lang', StringParam);
    const [menuColorQuery, setMenuColorQuery] = useQueryParam('menuColor', StringParam);
    const [displayColorQuery, setDisplayColorQuery] = useQueryParam('displayColor', StringParam);
    const [sidebarItemQuery, setSidebarItemQuery] = useQueryParam('sidebarItem', NumberParam);

    // URL => STATE
    useEffect(() => {
        dispatch(appAC.setLang(langQuery ? langQuery as LangType : lang));
        dispatch(settingsAC.setMenuBackgroundColor(menuColorQuery ? menuColorQuery : theme.menuBackgroundColor));
        dispatch(settingsAC.setDisplayBackgroundColor(displayColorQuery ? displayColorQuery : theme.displayBackgroundColor));
        dispatch(sidebarAC.setCurrentSidebarItem(sidebarItemQuery ? sidebarItemQuery : currentSidebarItem));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setLangQuery(lang !== 'eng' ? lang : undefined);
        setMenuColorQuery(theme.menuBackgroundColor !== '#3f50b5' ? theme.menuBackgroundColor : undefined);
        setDisplayColorQuery(theme.displayBackgroundColor !== '#e8eaf6' ? theme.displayBackgroundColor : undefined);
        setSidebarItemQuery(currentSidebarItem ? currentSidebarItem : undefined);
    }, [
        lang,
        theme,
        currentSidebarItem
    ]);
}
export default useCommonQueryParams;