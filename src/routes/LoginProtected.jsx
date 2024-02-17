/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import auth from "@/shared/utils/authentication";

const LoginProtected = ({ children }) => {
  const redirectPath = "/dashboard";
  //TODO - Auth logic
  if (auth.validateToken()) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
export default LoginProtected;
