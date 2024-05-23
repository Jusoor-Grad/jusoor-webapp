import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import PieChartGraph from "./PieChartGraph";

const ScoresBox = () => {
  //SECTION - general
  const { t } = useTranslation();

  //SECTION - useSelector
  const specificReport = useSelector(
    (state) => state.reportsReducer.specificReport
  );
  let scores = [
    {
      name: t("reports.noMentalDisorderScore"),
      value: 1 - parseFloat(specificReport.no_mental_disorder_score),
    },
    {
      name: t("reports.depressionScore"),
      value: specificReport.depression_score,
    },
    { name: t("reports.autismScore"), value: specificReport?.autism_score },
    { name: t("reports.adhdScore"), value: specificReport?.adhd_score },
    { name: t("reports.anxietyScore"), value: specificReport?.anxiety_score },
    { name: t("reports.bipolarScore"), value: specificReport?.bipolar_score },
    { name: t("reports.ocdScore"), value: specificReport?.ocd_score },
  ];
  return (
    <div className="border-1 border-gray-200 bg-white flex p-4 justify-between rounded-10 shadow-sm flex-col gap-4 w-full ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className={`h-2 w-2 bg-error-500 rounded-full`} />
            <p className="text-primary text">{t("reports.analysis")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {scores.map((score, index) => (
          <div key={index} className="w-3/12 ">
            <PieChartGraph score={score} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoresBox;
