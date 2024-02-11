import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "../../../assets/avatarMockup.jpg";
import jusoorLogo from "../../../assets/jusoor-logo.png";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  IoCalendarOutline,
  IoCalendar,
  IoPeople,
  IoPeopleOutline,
  IoDocumentTextOutline,
  IoDocumentText,
  IoSettings,
  IoSettingsOutline,
  IoHelpBuoy,
  IoHelpBuoyOutline,
} from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className=" bg-primary-900  h-screen p-4 flex justify-between flex-col items-center ">
      <Avatar
        className="rounded-full cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <AvatarImage src={avatar} alt="avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2  items-center">
        <Icon
          inPath={location.pathname === "/"}
          filledIcon={<GoHomeFill className="h-6 w-6 text-white" />}
          outlinedIcon={<GoHome className="h-6 w-6 text-white" />}
          navigateTo="/"
        />
        <Icon
          inPath={location.pathname === "/appointments"}
          filledIcon={<IoCalendar className="h-6 w-6 text-white" />}
          outlinedIcon={<IoCalendarOutline className="h-6 w-6 text-white" />}
          navigateTo="/appointments"
        />
        <Icon
          inPath={location.pathname === "/patients"}
          filledIcon={<IoPeople className="h-6 w-6 text-white" />}
          outlinedIcon={<IoPeopleOutline className="h-6 w-6 text-white" />}
          navigateTo="/patients"
        />
        <Icon
          inPath={location.pathname === "/patients"}
          filledIcon={<IoDocumentText className="h-6 w-6 text-white" />}
          outlinedIcon={
            <IoDocumentTextOutline className="h-6 w-6 text-white" />
          }
          navigateTo="/patients"
        />
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 ">
          <Icon
            inPath={location.pathname === "/help"}
            filledIcon={<IoHelpBuoy className="h-6 w-6 text-white" />}
            outlinedIcon={<IoHelpBuoyOutline className="h-6 w-6 text-white" />}
            navigateTo="/help"
          />
          <Icon
            inPath={location.pathname === "/settings"}
            filledIcon={<IoSettings className="h-6 w-6 text-white" />}
            outlinedIcon={<IoSettingsOutline className="h-6 w-6 text-white" />}
            navigateTo="/settings"
          />
        </div>
        <Separator />
        <Avatar className="rounded-10">
          <AvatarImage src={jusoorLogo} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const Icon = ({ inPath, filledIcon, outlinedIcon, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        inPath
          ? "p-3 rounded-15 bg-primary-700 cursor-pointer"
          : "p-3 rounded-15 hover:bg-primary-700 cursor-pointer"
      }
      onClick={() => navigate(navigateTo)}
    >
      {inPath ? filledIcon : outlinedIcon}
    </div>
  );
};

export default Navbar;
