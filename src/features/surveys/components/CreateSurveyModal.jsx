import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeaturedIcon from "@/shared/components/FeaturedIcon";
import { useTranslation } from "react-i18next";
import { IoAdd, IoDocumentText } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { createSurvey } from "@/store/slices/surveys";
import { CircularProgress } from "@nextui-org/react";
import { showFlashMessage } from "@/store/slices/notifications";

export const CreateSurveyModal = () => {
  //SECTION - GENERAL
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //SECTION - useState
  const [open, setOpen] = useState(false);
  const [surveyData, setSurveyData] = useState({
    name: null,
    description: null,
  });

  //SECTION - useSelector
  const createSurveyStatus = useSelector(
    (state) => state.surveysReducer.createSurveyStatus
  );

  //SECTION - FUNCTIONS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSurveyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = () => {
    if (!surveyData.name || !surveyData.description) {
      dispatch(
        showFlashMessage({
          message: t("surveys.fillMissingData"),
          severity: "error",
        })
      );
    } else {
      dispatch(createSurvey(surveyData)).then((res) => {
        if (res?.payload?.status === 201) {
          setOpen(false);
          setSurveyData({
            name: null,
            description: null,
          });
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gap-3 w-full md:w-auto">
          <IoAdd className="w-5 h-5" /> {t("surveys.createSurvey")}
        </Button>{" "}
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col gap-8  w-full  max-w-[450px]">
        <div className="flex flex-col  gap-2">
          <div className="item-center w-full flex justify-center">
            <FeaturedIcon size={"lg"} icon={<IoDocumentText />} />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-gray-900">
              {t("surveys.createSurvey")}
            </h1>
            <p className="text-sm text-gray-500 ">
              {t("surveys.chooseNameAndDescription")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("surveys.name")}
              </Label>
              <Input
                placeholder={t("surveys.name")}
                className="border-gray-300 w-full"
                name="name"
                value={surveyData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("surveys.description")}
              </Label>
              <Input
                placeholder={t("surveys.description")}
                className="border-gray-300 w-full"
                name="description"
                value={surveyData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <Button
            className="w-full"
            disabled={createSurveyStatus === "loading"}
            onClick={handleSubmitForm}
          >
            {createSurveyStatus === "loading" ? (
              <CircularProgress size="sm" aria-label="Loading..." />
            ) : (
              t("patients.approve")
            )}
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
