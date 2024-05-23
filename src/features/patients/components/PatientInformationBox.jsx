import { useTranslation } from "react-i18next";
import { CircularProgress } from "@nextui-org/react";

const PatientInformationBox = ({ title = "title", specificPatient = {} }) => {
  //SECTION - general
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6 p-6 shadow-sm border border-gray-200 rounded-10 bg-white h-[200px]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex item-cent gap-6 ">
        <div className="flex flex-col gap-1 whitespace-nowrap  w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="flex gap-2 font-medium">{t("patients.id") + ":"}</p>
            {specificPatient ? (
              <p className=" text-gray-500  flex gap-2  ">
                {specificPatient?.id}
              </p>
            ) : (
              <CircularProgress size="sm" />
            )}
          </div>{" "}
          <div className="flex flex-row justify-between items-center w-full">
            <p className="flex gap-2 font-medium">
              {t("patients.email") + ":"}
            </p>
            <p className=" text-gray-500  flex gap-2  ">
              {" "}
              {specificPatient ? (
                <p className=" text-gray-500  flex gap-2  ">
                  {specificPatient?.email}
                </p>
              ) : (
                <CircularProgress size="sm" />
              )}
            </p>
          </div>{" "}
          <div className="flex flex-row justify-between items-center w-full">
            <p className="flex gap-2 font-medium">
              {t("patients.department") + ":"}
            </p>
            <p className=" text-gray-500  flex gap-2  ">
              {" "}
              {specificPatient ? (
                <p className=" text-gray-500  flex gap-2  ">
                  {specificPatient?.department}
                </p>
              ) : (
                <CircularProgress size="sm" />
              )}{" "}
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default PatientInformationBox;
