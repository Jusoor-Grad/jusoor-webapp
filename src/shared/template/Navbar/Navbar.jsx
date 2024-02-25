import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "../../assets/images/avatarMockup.jpg";
import jusoorLogo from "../../assets/images/jusoor-logo.png";
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
  IoGlobeOutline,
} from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { i18n } = useTranslation();
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
          inPath={location.pathname === "/dashboard"}
          filledIcon={<GoHomeFill className="h-6 w-6 text-white" />}
          outlinedIcon={<GoHome className="h-6 w-6 text-white" />}
          navigateTo="/dashboard"
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
          inPath={location.pathname === "/surveys"}
          filledIcon={<IoDocumentText className="h-6 w-6 text-white" />}
          outlinedIcon={
            <IoDocumentTextOutline className="h-6 w-6 text-white" />
          }
          navigateTo="/surveys"
        />
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 ">
          {/* <Icon
            inPath={location.pathname === "/help"}
            filledIcon={<IoHelpBuoy className="h-6 w-6 text-white" />}
            outlinedIcon={<IoHelpBuoyOutline className="h-6 w-6 text-white" />}
            navigateTo="/help"
          /> */}
          <div
            className={"p-3 rounded-15 hover:bg-primary-700 cursor-pointer"}
            // onClick={() => navigate(navigateTo)}
            onClick={() => {
              if (localStorage.getItem("i18nextLng")) {
                if (i18n.language === "ar") {
                  i18n.changeLanguage("en");
                  localStorage.setItem("i18nextLng", "en");
                } else {
                  i18n.changeLanguage("ar");
                  localStorage.setItem("i18nextLng", "ar");
                }
              } else {
                i18n.changeLanguage("en");
                localStorage.setItem("i18nextLng", "en");
              }
            }}
          >
            <IoGlobeOutline className="h-6 w-6 text-white" />
          </div>
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

// eslint-disable-next-line react/prop-types
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
