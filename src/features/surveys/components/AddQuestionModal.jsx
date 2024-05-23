import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { IoAdd, IoRemoveCircle } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { createTextOrMcqQuestion } from "@/store/slices/surveys";
import { CircularProgress } from "@nextui-org/react";
import { showFlashMessage } from "@/store/slices/notifications";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export function AddQuestionModal({ surveyId }) {
  //SECTION - GENERAL
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  //SECTION - useState
  const [open, setOpen] = useState(false);

  const [textData, setTextData] = useState({
    description: null,
  });
  const [mcqData, setMcqData] = useState({
    description: null,
    choices: [""],
    allow_multiple: false,
  });

  //SECTION - useSelector
  const getSurveyQuestionsStatus = useSelector(
    (state) => state.surveysReducer.getSurveyQuestionsStatus
  );
  const createTextOrMcqQuestionStatus = useSelector(
    (state) => state.surveysReducer.createTextOrMcqQuestionStatus
  );

  //SECTION - FUNCTIONS
  const handleChange = (event, type) => {
    if (type === "allow_multiple") {
      setMcqData({ ...mcqData, ["allow_multiple"]: event });
    } else {
      const { name, value } = event.target;
      if (type === "text") {
        setTextData({ [name]: value });
      } else {
        setMcqData({ ...mcqData, [name]: value });
      }
    }
  };

  // Function to handle changing a choice value
  const handleChangeChoice = (index, value) => {
    setMcqData((prevData) => {
      const newChoices = [...prevData.choices];
      newChoices[index] = value;
      return {
        ...prevData,
        choices: newChoices,
      };
    });
  };

  const handleRemoveChoice = (index) => {
    setMcqData((prevData) => {
      const newChoices = [...prevData.choices];
      newChoices.splice(index, 1);
      return {
        ...prevData,
        choices: newChoices,
      };
    });
  };

  const handleAddChoice = () => {
    setMcqData((prevData) => ({
      ...prevData,
      choices: [...prevData.choices, ""],
    }));
  };

  const handleSubmitForm = (type) => {
    if (type === "text") {
      console.log("textData :", textData);

      if (!textData.description) {
        dispatch(
          showFlashMessage({
            message: t("surveys.fillMissingData"),
            severity: "error",
          })
        );
        return;
      }

      const data = {
        type: "text",
        payload: {
          description: textData.description,
          survey: surveyId,
          schema: {},
        },
      };

      dispatch(createTextOrMcqQuestion(data)).then((res) => {
        if (res?.payload?.status === 201) {
          setOpen(false);
          setMcqData({
            description: null,
            choices: [""],
            allow_multiple: false,
          });
          setTextData({
            description: null,
          });
        }
      });
    } else {
      console.log("mcqData :", mcqData);

      if (!mcqData.description || mcqData.choices.length === 0) {
        dispatch(
          showFlashMessage({
            message: t("surveys.fillMissingData"),
            severity: "error",
          })
        );
        return;
      }

      const data = {
        type: "mcq",
        payload: {
          description: mcqData.description,
          survey: surveyId,
          schema: {
            options: mcqData.choices.filter((option) => option !== ""),
            allow_multiple: mcqData.allow_multiple,
          },
        },
      };

      dispatch(createTextOrMcqQuestion(data)).then((res) => {
        if (res?.payload?.status === 201) {
          setOpen(false);
          setMcqData({
            description: null,
            choices: [""],
            allow_multiple: false,
          });
          setTextData({
            description: null,
          });
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="secondary"
          disabled={getSurveyQuestionsStatus === "loading"}
          className="h-8 w-fit text-gray-500"
        >
          {t("surveys.addQuestion")}
          <IoAdd />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col   w-full  max-w-[450px]">
        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">{t("surveys.text")}</TabsTrigger>
            <TabsTrigger value="multiple_choice">
              {t("surveys.multiple_choice")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <Card>
              <CardHeader>
                <CardTitle
                  className={`flex ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  {t("surveys.text")}
                </CardTitle>
                <CardDescription
                  className={`flex ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  {t("surveys.textDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className={`flex flex-col gap-2 w-full  ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  <Label className="text-gray-700 font-normal text-sm">
                    {t("surveys.question")}
                  </Label>
                  <Input
                    placeholder={t("surveys.question")}
                    className={`border-gray-300 w-full  ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                    name="description"
                    value={textData.description}
                    onChange={(e) => {
                      handleChange(e, "text");
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleSubmitForm("text");
                  }}
                  disabled={createTextOrMcqQuestionStatus === "loading"}
                >
                  {createTextOrMcqQuestionStatus === "loading" ? (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  ) : (
                    t("surveys.create")
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="multiple_choice">
            <Card>
              <CardHeader>
                <CardTitle
                  className={`flex ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  {" "}
                  {t("surveys.multiple_choice")}
                </CardTitle>
                <CardDescription
                  className={`flex ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  {t("surveys.multipleChoiceDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className={`flex flex-col gap-2 w-full  ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  <Label className="text-gray-700 font-normal text-sm">
                    {t("surveys.question")}
                  </Label>
                  <Input
                    placeholder={t("surveys.question")}
                    className={`border-gray-300 w-full  ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                    name="description"
                    value={mcqData.description}
                    onChange={(e) => {
                      handleChange(e, "multiple_choice");
                    }}
                  />
                </div>
                <Label
                  className={`text-gray-700 flex flex-col font-normal text-sm ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("surveys.choices")}
                </Label>
                {mcqData.choices.map((choice, index) => (
                  <div key={index} className="flex items-center">
                    <Input
                      placeholder={t("surveys.choice", {
                        choiceNum: index + 1,
                      })}
                      className={`border-gray-300 w-full ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                      value={choice}
                      onChange={(e) =>
                        handleChangeChoice(index, e.target.value)
                      }
                    />
                    <IoRemoveCircle
                      className="text-red-500 cursor-pointer ml-2"
                      onClick={() => handleRemoveChoice(index)}
                    />
                  </div>
                ))}
                <p
                  className="text-sm  hover:cursor-pointer underline text-gray-400 justify-center flex items-center"
                  onClick={handleAddChoice}
                >
                  <IoAdd />
                  {t("surveys.addChoice")}
                </p>
                <div
                  className={`flex items-center  gap-2 ${
                    i18n.language === "ar" ? " flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Checkbox
                    checked={mcqData.allow_multiple}
                    value={mcqData.allow_multiple}
                    name="allow_multiple"
                    onCheckedChange={(e) => handleChange(e, "allow_multiple")}
                  />
                  <label className="text-sm   peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
                    {t("surveys.allowMultipleAnswers")}
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleSubmitForm("multiple_choice");
                  }}
                  disabled={createTextOrMcqQuestionStatus === "loading"}
                >
                  {createTextOrMcqQuestionStatus === "loading" ? (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  ) : (
                    t("surveys.create")
                  )}
                </Button>{" "}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
