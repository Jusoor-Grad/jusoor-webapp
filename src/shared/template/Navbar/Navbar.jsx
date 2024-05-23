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
  IoGlobeOutline,
  IoLogOutOutline,
  IoLogOut,
} from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { logout } from "@/store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidReport } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";

const NavbarComp = () => {
  //SECTION - GENERAL
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //SECTION - useState
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //SECTION - useSelector
  const logoutStatus = useSelector((state) => state.authReducer.logoutStatus);

  //SECTION - functions
  const menuItems = [
    { name: t("navbar.dashboard"), to: "/dashboard" },
    { name: t("navbar.appointments"), to: "/appointments" },
    { name: t("navbar.patients"), to: "/patients" },
    { name: t("navbar.surveys"), to: "/surveys" },
    { name: t("navbar.reports"), to: "/reports" },

    { name: t("navbar.logout"), to: "" },
  ];

  const handleLogout = () => {
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
    <>
      {/* //SECTION On Desktop */}
      <div className=" bg-primary-900 h-full hidden sm:h-screen p-4 sm:flex justify-between sm:flex-col items-center ">
        <Avatar
          className="rounded-full cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <AvatarImage src={avatar} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="sm:flex flex-col gap-2 hidden items-center">
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
          <Icon
            inPath={location.pathname === "/reports"}
            filledIcon={<BiSolidReport className="h-6 w-6 text-white" />}
            outlinedIcon={
              <HiOutlineDocumentReport className="h-6 w-6 text-white" />
            }
            navigateTo="/reports"
          />
        </div>
        <div className="sm:flex hidden flex-col gap-6 items-center">
          <div className="flex flex-col gap-2 ">
            {/* <Icon
            inPath={location.pathname === "/help"}
            filledIcon={<IoHelpBuoy className="h-6 w-6 text-white" />}
            outlinedIcon={<IoHelpBuoyOutline className="h-6 w-6 text-white" />}
            navigateTo="/help"
          /> */}
            <LanguageButton />
            <Icon
              isLogout={true}
              filledIcon={<IoLogOut className="h-6 w-6 text-white" />}
              outlinedIcon={<IoLogOutOutline className="h-6 w-6  text-white" />}
              navigateTo="/settings"
              handleLogout={handleLogout}
            />
          </div>
          <Separator />
          <Avatar className="rounded-10">
            <AvatarImage src={jusoorLogo} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* //SECTION - On Mobile */}
      <Navbar
        isBordered
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="sm:hidden bg-primary-900 text-white"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className=" text-inherit">{t("general.jusoor")}</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <LanguageButton />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-primary-900 ">
          {menuItems.map((item, index) => (
            <NavbarMenuItem className="w-full " key={`${item}-${index}`}>
              {index === menuItems.length - 1 ? (
                <Button
                  className="bg-red-600 hover:bg-red-700 cursor-pointer text-white "
                  onClick={() => handleLogout()}
                >
                  {logoutStatus === "loading" ? (
                    <CircularProgress size="sm" />
                  ) : (
                    item.name
                  )}
                </Button>
              ) : (
                <a
                  className="w-full text-gray-300  text-lg cursor-pointer hover:underline"
                  onClick={() => {
                    navigate(item.to);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Icon = ({
  isLogout,
  inPath,
  filledIcon,
  outlinedIcon,
  navigateTo,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const logoutStatus = useSelector((state) => state.authReducer.logoutStatus);

  return (
    <div
      className={
        isLogout
          ? "p-3 rounded-15 bg-red-600 hover:bg-red-700 cursor-pointer"
          : inPath
          ? "p-3 rounded-15 bg-primary-700 cursor-pointer"
          : "p-3 rounded-15 hover:bg-primary-700 cursor-pointer"
      }
      onClick={() => (isLogout ? handleLogout() : navigate(navigateTo))}
    >
      {isLogout && logoutStatus === "loading" ? (
        <CircularProgress size="sm" />
      ) : inPath ? (
        filledIcon
      ) : (
        outlinedIcon
      )}
    </div>
  );
};

const LanguageButton = () => {
  //SECTION - general
  const { i18n } = useTranslation();

  return (
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
  );
};

export default NavbarComp;
