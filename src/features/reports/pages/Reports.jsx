import { useEffect } from "react";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircularProgress } from "@nextui-org/react";
import {
  getSentimentReports,
  getSpecificSentimentReport,
} from "@/store/slices/reports";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import moment from "moment";
import PieChartGraph from "../components/PieChartGraph";
const Reports = () => {
  //SECTION - general
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //SECTION - useState
  const [selectedReport, setSelectedReport] = useState(null);

  //SECTION - useSelector
  const reports = useSelector((state) => state.reportsReducer.reports);
  const fetchReportsStatus = useSelector(
    (state) => state.reportsReducer.fetchReportsStatus
  );
  const specificReport = useSelector(
    (state) => state.reportsReducer.specificReport
  );

  //SECTION - useEffect
  useEffect(() => {
    dispatch(getSentimentReports());
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 z-0 relative w-full">
      <div className="absolute top-0 left-0 z-[-1]">
        <img src={logoPattern} />
      </div>
      <section className="flex flex-col gap-8 md:justify-between md:flex-row items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">{t("reports.reportsPage")}</h1>
          <p className=" text-gray-500 text-xl font-medium ">
            {t("reports.pageDescription")}
          </p>
        </div>
        {/* <div className="flex flex-col md:flex-row gap-4 w-full md:justify-end">
          <CreateSurveyModal />
        </div> */}
      </section>
      <div className="flex flex-col gap-4  z-0 ">
        <section className="flex flex-col gap-2">
          <h6 className="text font-medium">{t("reports.selectReport")}</h6>
          <Select
            onValueChange={(e) => {
              dispatch(getSpecificSentimentReport({ id: e.pk }));
              setSelectedReport(e);
            }}
          >
            <SelectTrigger className="w-full flex justify-between flex-row-reverse">
              <SelectValue
              // placeholder={t("reports.selectPatient")}
              // value={selectedReport ? selectedReport.patient.username : ""}
              />
            </SelectTrigger>

            <SelectContent>
              {fetchReportsStatus === "loading" ? (
                <div className="flex flex-row items-center justify-center">
                  {" "}
                  <CircularProgress size="sm" aria-label="Loading..." />
                </div>
              ) : (
                reports.map((report, index) => (
                  <SelectItem
                    key={index}
                    className="flex flex-row-reverse"
                    value={report}
                  >
                    {report.patient.username +
                      " - " +
                      moment(report.created_at).format("DD/MM/YYYY hh:mm a")}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </section>
        {/* {specificReport && (
          <section className="flex flex-col gap-8 md:justify-between md:flex-row items-center">
            <div className="flex flex-col items-start gap-2 w-full">
              <h6 className="text-2xl font-bold">
                {t("reports.reportDetails")}
              </h6>
              <div className="flex gap-2 flex-col md:flex-row w-full">
                <InformationBox />
                <ScoresBox />
              </div>
            </div>
          </section>
        )} */}
        {specificReport && (
          <section className="flex w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h6 className="text font-medium">
                    {t("reports.reportsInformation")}
                  </h6>
                </AccordionTrigger>
                <AccordionContent>
                  {/* md:flex-wrap justify-center flex-col md:flex-row items-center */}
                  <div className="flex items-start gap-3 flex-col md:justify-between md:flex-row">
                    {" "}
                    <div className="flex flex-col gap-1">
                      <p className="text ">{t("reports.patientName") + ": "}</p>
                      <p className="text-xs text-gray-500">
                        {specificReport.patient.username}
                      </p>
                    </div>{" "}
                    <div className="flex flex-col gap-1">
                      <p className="text ">
                        {t("reports.patientEmail") + ": "}
                      </p>
                      <p className="text-xs text-gray-500">
                        {specificReport.patient.email}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text ">{t("reports.createdAt") + ": "}</p>
                      <p className="text-xs text-gray-500">
                        {moment(specificReport.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>{" "}
                    <div className="flex flex-col gap-1">
                      <p className="text ">
                        {t("reports.messagesNumber") + ": "}
                      </p>
                      <p className="text-xs text-gray-500">
                        {specificReport.messages_covered}
                      </p>
                    </div>{" "}
                    <div className="flex flex-col gap-1">
                      <p className="text ">{t("reports.status") + ": "}</p>
                      <p className="text-xs text-gray-500">
                        {specificReport.status}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>{" "}
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <h6 className="text font-medium">
                    {t("reports.recommendations")}
                  </h6>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start gap-3 flex-col md:justify-between md:flex-row">
                    <div className="flex flex-col gap-1">
                      <p className="text ">
                        {t("reports.conversationHighlights")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {specificReport.conversation_highlights}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text ">
                        {t("reports.detailedRecommendations")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {" "}
                        {specificReport.recommendations}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {" "}
                  <h6 className="text font-medium">{t("reports.analysis")}</h6>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex md:flex-wrap justify-center flex-col md:flex-row items-center">
                    {[
                      {
                        name: t("reports.sentimentScore"),
                        value: parseFloat(specificReport.sentiment_score),
                      },
                      {
                        name: t("reports.noMentalDisorderScore"),
                        value:
                          1 -
                          parseFloat(specificReport.no_mental_disorder_score),
                      },
                      {
                        name: t("reports.depressionScore"),
                        value: specificReport.depression_score,
                      },
                      {
                        name: t("reports.autismScore"),
                        value: specificReport?.autism_score,
                      },
                      {
                        name: t("reports.adhdScore"),
                        value: specificReport?.adhd_score,
                      },
                      {
                        name: t("reports.anxietyScore"),
                        value: specificReport?.anxiety_score,
                      },
                      {
                        name: t("reports.bipolarScore"),
                        value: specificReport?.bipolar_score,
                      },
                      {
                        name: t("reports.ocdScore"),
                        value: specificReport?.ocd_score,
                      },
                    ].map((score, index) => (
                      <div key={index} className="">
                        <PieChartGraph score={score} />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-3">
                <AccordionTrigger>
                  <h6 className="text font-medium">
                    {t("reports.conversations")}
                  </h6>
                </AccordionTrigger>
                <AccordionContent>
                  {specificReport.messages.map((message, index) => (
                    <p className="text" key={index}>
                      {index + ". " + message.content}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </section>
        )}
      </div>
    </main>
  );
};

export default Reports;
