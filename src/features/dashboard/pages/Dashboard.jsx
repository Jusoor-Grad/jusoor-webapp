import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //SECTION - general
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <Button onClick={handleSubmit}>Logout</Button>
    </div>
  );
};

export default Dashboard;
