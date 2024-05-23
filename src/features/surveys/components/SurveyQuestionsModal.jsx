import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flushSurveyQuestions,
  getSurveyQuestions,
} from "@/store/slices/surveys";
import { Toggle } from "@/components/ui/toggle";
import { CircularProgress } from "@nextui-org/react";
import Question from "./Question";
import { AddQuestionModal } from "./AddQuestionModal";

export const SurveyQuestionsModal = ({ surveyId }) => {
  //SECTION - GENERAL
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  //SECTION - useState
  const [open, setOpen] = useState(false);

  //SECTION - useEffect
  useEffect(() => {
    //on modal close, set the state to null
    if (!open && surveyQuestions) {
      dispatch(flushSurveyQuestions());
    }
  }, [open]);

  //SECTION - useSelector
  const getSurveyQuestionsStatus = useSelector(
    (state) => state.surveysReducer.getSurveyQuestionsStatus
  );
  const surveyQuestions = useSelector(
    (state) => state.surveysReducer.surveyQuestions
  );

  //SECTION - FUNCTIONS

  const handleSubmitForm = () => {
    setOpen(false);

    // You can dispatch actions or perform other operations here
    // For example:
    // dispatch(createSurvey(surveyData));
  };

  const fetchSurveyQuestions = () => {
    dispatch(getSurveyQuestions({ query: `survey=${surveyId}` }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="secondary"
          onClick={() => {
            fetchSurveyQuestions();
          }}
          className="h-8 w-fit text-gray-500"
        >
          {t("surveys.show")}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col gap-8  w-full max-h-[95vh] overflow-y-scroll overflow-x-hidden  max-w-[850px]">
        <div className="flex flex-col  gap-2">
          <div className="flex  justify-between items-center">
            <div className="flex flex-col gap-2 justify-start text-start ">
              <h1 className="font-bold text-xl text-gray-900">
                {t("surveys.questions")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Toggle
                pressed={isEdit}
                className="text-gray-400 underline h-8"
                onPressedChange={() => {
                  setIsEdit(!isEdit);
                }}
              >
                {t("surveys.edit")}
              </Toggle>
              <AddQuestionModal surveyId={surveyId} />
            </div>
          </div>

          {getSurveyQuestionsStatus === "loading" ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : surveyQuestions && surveyQuestions?.results.length === 0 ? (
            <div className="flex justify-center">
              <p>{t("surveys.notFound")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-scroll">
              {surveyQuestions?.results.map((question, index) => {
                return (
                  <Question
                    key={question.id}
                    question={question}
                    isEdit={isEdit}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="flex gap-4 w-full   justify-end">
          <Button
            className="w-full"
            disabled={getSurveyQuestionsStatus === "loading"}
            onClick={handleSubmitForm}
          >
            {t("patients.approve")}
          </Button>

          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              {t("patients.cancel")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
