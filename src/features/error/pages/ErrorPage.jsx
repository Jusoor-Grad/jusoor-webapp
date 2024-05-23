import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import i18n from "../../../i18n";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  //SECTION - general
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { code } = useParams();

  //SECTION - functions
  const errorMessage = t(`errorCodes.${code}`, {
    defaultValue:
      i18n.language === "en"
        ? "Sorry, an unknown error occurred"
        : "عذرا, لقد حصل خطأ غير معروف",
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex gap-6 flex-col justify-center items-center">
        <h1 className="font-bold text-primary text-6xl md:text-9xl">
          {t("navigate.error")}
        </h1>
        <h2 className="font-bold text-lg md:text-4xl">
          {code} - {errorMessage}
        </h2>
        <Button onClick={() => navigate("/")} className="w-fit h-fit p-3">
          <h2 className="font-bold text-lg md:text-4xl">
            {t("navigate.homePage")}
          </h2>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
