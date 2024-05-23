import { useEffect } from "react";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { useTranslation } from "react-i18next";
import { CreateSurveyModal } from "../components/CreateSurveyModal";
import Survey from "../components/Survey";
import { useDispatch, useSelector } from "react-redux";
import { getSurveys } from "@/store/slices/surveys";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { CircularProgress } from "@nextui-org/react";

const Surveys = () => {
  //SECTION - general
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //SECTION - useState
  const [search, setSearch] = useState("");

  //SECTION - useSelector
  const surveys = useSelector((state) => state.surveysReducer.surveys);
  const getSurveysStatus = useSelector(
    (state) => state.surveysReducer.getSurveysStatus
  );

  //SECTION - useEffect
  useEffect(() => {
    dispatch(getSurveys({ query: "" }));
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 z-0 relative w-full">
      <div className="absolute top-0 left-0 z-[-1]">
        <img src={logoPattern} />
      </div>
      <section className="flex flex-col gap-8 md:justify-between md:flex-row items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">{t("surveys.surveysPage")}</h1>
          <p className=" text-gray-500 text-xl font-medium ">
            {t("surveys.pageDescription")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:justify-end">
          <CreateSurveyModal />
        </div>
      </section>
      <div className="flex flex-col gap-2">
        <h6>{t("surveys.surveys")}</h6>
        <section className="flex flex-col gap-6 ">
          <div className="flex gap-4 w-full flex-col sm:flex-row ">
            <Input
              placeholder={t("surveys.searchBySurveyName")}
              className="border-gray-300 w-full max-w-[400px] z-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    getSurveys({
                      query: `name__icontains=${search}`,
                    })
                  );
                }
              }}
            />
            <Button
              variant="outline"
              className="gap-2 flex z-10"
              onClick={() => {
                dispatch(
                  getSurveys({
                    query: `name__icontains=${search}`,
                  })
                );
              }}
            >
              {t("patients.searchMobile")}
              <IoSearchOutline className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6">
            {getSurveysStatus === "loading" ? (
              <CircularProgress size="sm" aria-label="Loading..." />
            ) : surveys === null || surveys?.results.length === 0 ? (
              <p>{t("surveys.notFound")}</p>
            ) : (
              surveys &&
              surveys.results.map((survey) => {
                return (
                  <Survey
                    key={survey.id}
                    surveyId={survey.id}
                    isActive={survey.active}
                    description={survey.description}
                    name={survey.name}
                    therapist={survey.therapist}
                    lastUpdated={survey.last_updated_at}
                  />
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Surveys;
