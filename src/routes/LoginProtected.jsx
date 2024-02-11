/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
// import auth from "../shared/utils/Authentication";

const LoginProtected = ({ children }) => {
    const redirectPath = "/";
    //TODO - Auth logic
    if (false) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};
export default LoginProtected;
