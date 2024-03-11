/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import auth from "@/shared/utils/Authentication";

const AuthProtected = ({ children }) => {
  const redirectPath = "/login";
  //TODO - Auth logic
  if (true) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};
export default AuthProtected;
