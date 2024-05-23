import { t } from "i18next";
import moment from "moment";
import { useSelector } from "react-redux";

const InformationBox = () => {
  //SECTION - useSelector
  const specificReport = useSelector(
    (state) => state.reportsReducer.specificReport
  );
  return (
    <div className="border-1 border-gray-200 bg-white flex p-4  rounded-10 shadow-sm flex-col gap-4 w-full lg:w-1/3 ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className={`h-2 w-2 bg-error-500 rounded-full`} />
            <p className="text-primary text">
              {t("reports.reportsInformation")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 justify-between ">
        <div className="flex flex-col gap-1">
          <p className="text font-bold font-">
            {t("reports.createdAt") + ": "}
          </p>
          <p className="text-xs text-gray-500">
            {moment(specificReport.created_at).format("DD/MM/YYYY")}
          </p>
        </div>{" "}
        <div className="flex flex-col gap-1">
          <p className="text font-bold font-">
            {t("reports.messagesNumber") + ": "}
          </p>
          <p className="text-xs text-gray-500">
            {specificReport.messages_covered}
          </p>
        </div>{" "}
        <div className="flex flex-col gap-1">
          <p className="text font-bold font-">{t("reports.status") + ": "}</p>
          <p className="text-xs text-gray-500">{specificReport.status}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
