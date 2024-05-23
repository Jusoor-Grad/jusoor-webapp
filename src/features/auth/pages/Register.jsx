import { useTranslation } from "react-i18next";
import RegisterScreenImage from "../../../shared/assets/images/RegisterScreenImage.svg";
import jusoorLogo from "../../../shared/assets/images/jusoor-logo.png";
import KFUPM from "../../../shared/assets/images/KFUPM.svg";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/slices/auth";
import { CircularProgress } from "@nextui-org/react";
import { showFlashMessage } from "@/store/slices/notifications";
import { formulateErrorMessage } from "@/shared/utils/formulateErrorMessage";

const Register = () => {
  //SECTION - general
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //SECTION - useState
  const [registerInformation, setRegisterInformation] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity state

  //SECTION - useSelector
  const registerStatus = useSelector(
    (state) => state.authReducer.registerStatus
  );

  //SECTION - functions
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegisterInformation((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setIsEmailValid(EmailValidator.validate(value)); // Validate email on change
    }
  };
  const handleSubmit = () => {
    dispatch(register(registerInformation)).then((payload) => {
      console.warn("payload", payload);
      if (payload.type === "auth/register/fulfilled") {
        navigate("/dashboard");
      } else {
        dispatch(
          showFlashMessage({
            message: formulateErrorMessage(t("errorCodes.general")),
            severity: "error",
          })
        );
      }
    });
  };

  return (
    <div className="flex flex-row h-full">
      <div className="hidden lg:flex lg:basis-1/2">
        <img
          src={RegisterScreenImage}
          alt="LoginScreenImage"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
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
                {t("auth.registerNewAccountName")}
              </h1>{" "}
              <p className="text-gray-500 text-lg">{t("auth.loginIntro")}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col" style={{ gap: "6px" }}>
                  <Label htmlFor="name" className="font-medium">
                    {t("auth.name")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("auth.namePlaceholder")}
                    value={registerInformation.name}
                    onChange={handleChange}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      registerInformation.name &&
                      registerInformation.email &&
                      isEmailValid &&
                      registerInformation.password &&
                      handleSubmit()
                    }
                  />
                </div>
                <div className="flex flex-col" style={{ gap: "6px" }}>
                  <Label htmlFor="email" className="font-medium">
                    {t("auth.email")}
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("auth.emailPlaceholder")}
                    onChange={handleChange}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      registerInformation.name &&
                      registerInformation.email &&
                      isEmailValid &&
                      registerInformation.password &&
                      handleSubmit()
                    }
                  />
                  {!isEmailValid && (
                    <Label
                      className=" font-bold text-error-500"
                      style={{ gap: "6px" }}
                    >
                      {t("auth.invalidEmailError")}
                    </Label>
                  )}
                </div>
                <div className="flex flex-col" style={{ gap: "6px" }}>
                  <Label htmlFor="password" className="font-medium">
                    {t("auth.password")}
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t("auth.passwordPlaceholder")}
                    onChange={handleChange}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      registerInformation.name &&
                      registerInformation.email &&
                      isEmailValid &&
                      registerInformation.password &&
                      handleSubmit()
                    }
                  />
                </div>
              </div>{" "}
              <div className="flex flex-col gap-2">
                <Button
                  disabled={
                    registerInformation.name === "" ||
                    registerInformation.password === "" ||
                    !isEmailValid
                  }
                  onClick={handleSubmit}
                >
                  {registerStatus === "loading" ? (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  ) : (
                    <p className="font-bold">
                      {t("auth.registerNewAccountAction")}
                    </p>
                  )}
                </Button>
                <Button className="bg-primary-900 ">
                  {" "}
                  <div className="flex flex-row gap-2 items-center justify-center">
                    {" "}
                    <img src={KFUPM} alt="KFUPM" />
                    <p className="font-bold">{t("auth.loginViaKFUPM")}</p>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex flex-row gap-2 justify-center">
              <p className="text-gray-500">{t("auth.alreadyHaveAccount")}</p>{" "}
              <p
                className="text-primary-700 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {t("auth.login")}
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
    </div>
  );
};

export default Register;
