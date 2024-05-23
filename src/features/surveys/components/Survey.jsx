import { t } from "i18next";
import DynamicDropDownMenu from "./DynamicDropDownMenu";
import { SurveyQuestionsModal } from "./SurveyQuestionsModal";
import moment from "moment";

const Survey = ({
  surveyId,
  isActive,
  description,
  name,
  therapist,
  lastUpdated,
}) => {
  const handleEdit = () => {
    alert("edited");
  };
  const handleDelete = () => {
    alert("deleted");
  };

  const menuItems = [
    {
      label: t("surveys.edit"),
      onClick: handleEdit,
    },
    {
      label: t("surveys.delete"),
      style: "text-red-500",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="border-1 border-gray-200 bg-white flex p-4 justify-between rounded-10 shadow-sm flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div
              className={`h-2 w-2 ${
                isActive ? "bg-primary" : "bg-error-500"
              } rounded-full`}
            />

            <p className="text-primary text-xs">
              {t("surveys.surveyId", { id: surveyId })}
            </p>
          </div>
          <DynamicDropDownMenu menuItems={menuItems} />
        </div>

        <div>
          <h5 className="font-bold text-xl">{name}</h5>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-xs ">{therapist.username}</p>
          <p className="text-xs text-gray-500">
            {moment(lastUpdated).format("DD/MM/YYYY")}
          </p>
        </div>
        <SurveyQuestionsModal surveyId={surveyId} />
      </div>
    </div>
  );
};

export default Survey;
