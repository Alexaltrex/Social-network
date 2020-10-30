import {useSelector} from "react-redux";
import {getIsAuth} from "../redux/selectors/auth-selectors";
import { useHistory } from "react-router-dom";

const useAuthRedirect = () => {
    const isAuth = useSelector(getIsAuth);
    let history = useHistory();
    if (!isAuth) {
        history.push("/login");
    }
};

export default useAuthRedirect;