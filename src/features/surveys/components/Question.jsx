import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

const Question = ({ question, isEdit, index }) => {
  //SECTION - general
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="border-1 border-gray-200 bg-gray-25 flex p-4  rounded-10 shadow-sm flex-col gap-4 ">
        <div className="flex flex-col gap-2 w-full ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div
                className={`h-2 w-2 ${
                  question.active ? "bg-success-400" : "bg-error-400"
                } rounded-full`}
              />
              <Label className="text-gray-700 font-normal text-sm">
                {t("surveys.questionNum", { num: index + 1 })}
              </Label>

              <Label className="text-gray-500 font-normal text-xs bg-gray-100 py-1 px-2 rounded-10 ">
                {t(`surveys.${question.question_type}`)}
              </Label>
            </div>
            {isEdit && <IoClose className="text-error-500 cursor-pointer" />}
          </div>
          <Input
            placeholder={t("surveys.name")}
            className="border-gray-300 w-full"
            name="name"
            disabled={!isEdit}
            value={question.description}
          />
        </div>
        {question.question_type === "multiple_choice" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">{t("surveys.choices")}</p>
            {question.schema.options.map((option) => {
              return (
                <div key={option.id} className="flex items-center gap-2">
                  <Checkbox disabled={!isEdit} />
                  <label className="text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
                    {option}
                  </label>
                </div>
              );
            })}
            <p className="text-xs text-gray-400">
              {t("surveys.allowMultiple", {
                isAllowed: t(`surveys.${question.schema.allow_multiple}`),
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
