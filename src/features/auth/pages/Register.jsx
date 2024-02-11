import { useTranslation } from "react-i18next";
import LoginScreenImage from "../../../shared/assets/images/LoginScreenImage.png";
import jusoorLogo from "../../../shared/assets/images/jusoor-logo.png";
import KFUPM from "../../../shared/assets/images/KFUPM.png";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col basis-full lg:basis-1/2 p-8">
        <div className="flex flex-row   gap-2 justify-start items-center">
          <Avatar className="rounded-10">
            <AvatarImage src={jusoorLogo} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-bold text-lg">{t("general.jusoor")}</p>
        </div>
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="flex flex-col gap-8 w-11/12 sm:w-3/5">
            <div>
              <p className="text-gray-900 font-bold text-4xl">
                {t("login.registerNewAccountName")}
              </p>{" "}
              <p className="text-gray-500 text-lg">{t("login.loginIntro")}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-bold">{t("login.name")}</p>
                  <Input
                    type="email"
                    placeholder={t("login.namePlaceholder")}
                  />
                </div>
                <div>
                  <p className="font-bold">{t("login.email")}</p>
                  <Input
                    type="email"
                    placeholder={t("login.emailPlaceholder")}
                  />
                </div>
                <div>
                  <p className="font-bold">{t("login.password")}</p>{" "}
                  <Input
                    type="email"
                    placeholder={t("login.passwordPlaceholder")}
                  />
                </div>
              </div>{" "}
              <div className="flex flex-col gap-2">
                <Button className="bg-primary-500">
                  <p className="font-bold">
                    {t("login.registerNewAccountAction")}
                  </p>
                </Button>
                <Button className="bg-primary-900">
                  {" "}
                  <div className="flex flex-row gap-2 items-center justify-center">
                    {" "}
                    <img src={KFUPM} alt="KFUPM" />
                    <p className="font-bold">{t("login.loginViaKFUPM")}</p>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex flex-row gap-2 justify-center">
              <p className="text-gray-500">{t("login.alreadyHaveAccount")}</p>{" "}
              <p
                className="text-primary-700 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {t("login.login")}
              </p>
            </div>
          </div>{" "}
        </div>
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="flex flex-row gap-2 justify-center items-center">
            <HiOutlineMail className=" text-gray-500 " />
            <p className=" text-gray-500 ">{t("general.support")}</p>
          </div>
          <p className=" text-gray-500">{t("general.copyright")}</p>
        </div>
      </div>
      <div className="hidden lg:flex lg:basis-1/2">
        <img
          src={LoginScreenImage}
          alt="LoginScreenImage"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default Register;