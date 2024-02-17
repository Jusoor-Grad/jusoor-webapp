import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth";
import { CircularProgress } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //SECTION - general
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  //SECTION - useSelector
  const logoutStatus = useSelector((state) => state.authReducer.logoutStatus);

  //SECTION - functions
  const handleSubmit = () => {
    dispatch(logout()).then((payload) => {
      if (payload.type === "auth/logout/fulfilled") {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        //TODO - failure
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Button onClick={handleSubmit} className="w-24">
        {" "}
        {logoutStatus === "loading" ? (
          <CircularProgress size="sm" aria-label="Loading..." />
        ) : (
          <p className="font-bold">{t("auth.logout")}</p>
        )}
      </Button>
    </div>
  );
};

export default Dashboard;
