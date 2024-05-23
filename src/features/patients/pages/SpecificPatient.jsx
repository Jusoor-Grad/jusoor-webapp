import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
import StatisticsBox from "../components/StatisticsBox";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "../components/DatePickerWithRange";
import RadarGraph from "../components/RadarGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpecificPatient } from "@/store/slices/patients";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import { getSpecificPatientsAppointments } from "@/store/slices/appointments";
import { SpecificPatientDataTable } from "../components/SpecificPatientDataTable";
import PatientInformationBox from "../components/PatientInformationBox";
import { createSentimentReport } from "@/store/slices/reports";
import { showFlashMessage } from "@/store/slices/notifications";
import { generateIncreasingNumbers } from "@/shared/utils/randomData";
const SpecificPatient = () => {
  //SECTION - general
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  //SECTION - useState
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  //SECTION - useSelector
  const fetchSpecificPatientsStatus = useSelector(
    (state) => state.patientsReducer.fetchSpecificPatientsStatus
  );
  const specificPatient = useSelector(
    (state) => state.patientsReducer.specificPatient
  );
  const specificPatientAppointments = useSelector(
    (state) => state.appointmentsReducer.specificPatientsAppointments
  );
  const specificPatientsAppointmentsCount = useSelector(
    (state) => state.appointmentsReducer.specificPatientsAppointmentsCount
  );
  const fetchSpecificPatientsAppointmentsStatus = useSelector(
    (state) => state.appointmentsReducer.fetchSpecificPatientsAppointmentsStatus
  );
  const createSentimentReportStatus = useSelector(
    (state) => state.reportsReducer.createSentimentReportStatus
  );
  //SECTION - useEffect
  useEffect(() => {
    dispatch(getSpecificPatient({ id }));
    dispatch(getSpecificPatientsAppointments({ id, page: page, page_size: 5 }));
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 relative w-full">
      <div className="absolute top-0 left-0 -z-10">
        <img src={logoPattern} />
      </div>
      <section className="flex flex-col gap-8 sm:justify-between sm:flex-row items-center">
        <div className="flex flex-col items-start gap-1">
          {fetchSpecificPatientsStatus === "loading" ? (
            <CircularProgress size="sm" />
          ) : (
            <h1 className="text-4xl font-bold">{specificPatient?.username}</h1>
          )}
        </div>
        <Button
          className="w-full sm:w-28 z-10"
          onClick={() => {
            dispatch(createSentimentReport({ id: id })).then((payload) => {
              if (payload.type === "reports/createSentimentReport/fulfilled") {
                dispatch(
                  showFlashMessage({
                    message: t("patients.reportSuccessfullyCreated"),
                    severity: "success",
                  })
                );
              }
            });
          }}
        >
          {createSentimentReportStatus === "loading" ? (
            <CircularProgress size="sm" aria-label="Loading..." />
          ) : (
            t("patients.createReport")
          )}
        </Button>
      </section>
      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col gap-6 xl:col-span-2 w-full">
          <div className="flex flex-col gap-2">
            <h6>{t("patients.generalStats")}</h6>
            <section className="grid lg:grid-cols-3 sm:grid-cols-1 w-full gap-12  justify-center items-center">
              {" "}
              <PatientInformationBox
                title={t("patients.patientInformation")}
                specificPatient={specificPatient}
              />
              <StatisticsBox
                title={t("patients.totalAppointments")}
                dropdownMenu={false}
                number={specificPatient?.appointments_count}
                ratio={null}
                data={generateIncreasingNumbers(
                  specificPatient?.appointments_count,
                  "totalAppointments"
                )}
              />
              <div className="w-full mt-10 lg:mt-0">
                <RadarGraph />
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-2">
            <h6>{t("patients.appointments")}</h6>
            <section className="flex flex-col gap-6 ">
              <div className="flex gap-4 w-full">
                <Input
                  placeholder={t("patients.searchByTherapistName")}
                  className="border-gray-300 w-full z-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(
                        getSpecificPatientsAppointments({
                          id: id,
                          page: 1,
                          page_size: 5,
                          search: search,
                          date: date,
                        })
                      );
                      setPage(1);
                    }
                  }}
                />
                <DatePickerWithRange
                  setDate={setDate}
                  date={date}
                  className={"z-10"}
                />
                <Button
                  variant="outline"
                  className="gap-2 flex z-10"
                  onClick={() => {
                    dispatch(
                      getSpecificPatientsAppointments({
                        id: id,
                        page: 1,
                        page_size: 5,
                        search: search,
                        date: date,
                      })
                    );
                    setPage(1);
                  }}
                >
                  {t("patients.searchMobile")}
                  <IoSearchOutline className="w-5 h-5" />
                </Button>
                {/* <Button variant="outline" className="gap-2" disabled={true}>
                  {t("patients.filter")}
                  <IoFilter className="w-5 h-5" />
                </Button> */}
              </div>
              <div>
                <SpecificPatientDataTable
                  data={specificPatientAppointments}
                  count={specificPatientsAppointmentsCount}
                  getNextPageData={(pageNumber) => {
                    dispatch(
                      getSpecificPatientsAppointments({
                        id: id,
                        page: pageNumber,
                        page_size: 5,
                        date: date,
                      })
                    );
                    setPage(pageNumber);
                  }}
                  loading={
                    fetchSpecificPatientsAppointmentsStatus === "loading"
                      ? true
                      : false
                  }
                  page={page}
                  setPage={setPage}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SpecificPatient;
