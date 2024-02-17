import { useTranslation } from "react-i18next";
import LoginScreenImage from "../../../shared/assets/images/LoginScreenImage.svg";
import jusoorLogo from "../../../shared/assets/images/jusoor-logo.png";
import KFUPM from "../../../shared/assets/images/KFUPM.svg";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { login } from "@/store/slices/auth";
import { useDispatch } from "react-redux";
import * as EmailValidator from "email-validator";

const Login = () => {
  //SECTION - general
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //SECTION - useState
  const [loginInformation, setLoginInformation] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity state

  //SECTION - functions
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginInformation((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setIsEmailValid(EmailValidator.validate(value)); // Validate email on change
    }
  };
  const handleSubmit = () => {
    dispatch(login(loginInformation)).then((payload) => {
      if (payload.type === "auth/login/fulfilled") {
        navigate("/dashboard");
      } else {
        //TODO - failure
      }
    });
  };
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col basis-full lg:basis-1/2 p-8">
        <div className="flex flex-row  gap-2 justify-start items-center cursor-pointer">
          <Avatar className="rounded-10">
            <AvatarImage src={jusoorLogo} alt="avatar" />
          </Avatar>
          <p className="font-bold text-lg">{t("general.jusoor")}</p>
        </div>
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="flex flex-col gap-8 w-11/12 sm:w-3/5">
            <div className="flex flex-col gap-3">
              <h1 className="text-gray-900 font-bold text-4xl">
                {t("login.login")}
              </h1>{" "}
              <p className="text-gray-500 text-lg">{t("login.loginIntro")}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col" style={{ gap: "6px" }}>
                  <Label htmlFor="email" className="font-bold">
                    {t("login.email")}
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("login.emailPlaceholder")}
                    onChange={handleChange}
                  />
                  {!isEmailValid && (
                    <Label
                      className=" font-bold text-error-500"
                      style={{ gap: "6px" }}
                    >
                      {t("login.invalidEmailError")}
                    </Label>
                  )}
                </div>
                <div className="flex flex-col" style={{ gap: "6px" }}>
                  <Label htmlFor="password" className="font-bold">
                    {t("login.password")}
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t("login.passwordPlaceholder")}
                    onChange={handleChange}
                  />
                </div>
              </div>{" "}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={loginInformation.password === "" || !isEmailValid}
                >
                  <p className="font-bold">{t("login.login")}</p>
                </Button>
                <Button className="bg-primary-900 ">
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
              <p className="text-gray-500">{t("login.doNotHaveAccount")}</p>{" "}
              <p
                className="text-primary-700 underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {t("login.signUp")}
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

export default Login;
