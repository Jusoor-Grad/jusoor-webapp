import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
import StatisticsBox from "../components/StatisticsBox";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "../components/DatePickerWithRange";
import { AppointmentModalButton } from "../components/AppointmentModalButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointments,
  getAppointmentsCount,
  getUpcomingAppointmentsCount,
} from "@/store/slices/appointments";
import { AppointmentsDataTable } from "../components/AppointmentsDataTable";
import WorkingHours from "../components/WorkingHours";
import { generateIncreasingNumbers } from "@/shared/utils/randomData";
import { getSurveys } from "@/store/slices/surveys";

const Appointments = () => {
  //SECTION - general
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //SECTION - useState
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  //SECTION - useSelector
  const appointmentsCount = useSelector(
    (state) => state.appointmentsReducer.appointmentsCount
  );
  const appointments = useSelector(
    (state) => state.appointmentsReducer.appointments
  );
  const fetchAppointmentsStatus = useSelector(
    (state) => state.appointmentsReducer.fetchAppointmentsStatus
  );
  const tableCount = useSelector(
    (state) => state.appointmentsReducer.tableCount
  );
  const upcomingAppointmentsCount = useSelector(
    (state) => state.appointmentsReducer.upcomingAppointmentsCount
  );

  //SECTION - useEffect
  useEffect(() => {
    dispatch(getAppointments({ page: 1, page_size: 5 }));
    dispatch(getAppointmentsCount());
    dispatch(getUpcomingAppointmentsCount());
    dispatch(getSurveys({ query: "" }));
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 z-0 relative w-full">
      <div className="absolute top-0 left-0 z-[-1]">
        <img src={logoPattern} />
      </div>
      <section className="flex flex-col gap-8 md:justify-between md:flex-row items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">
            {t("appointments.appointmentsPage")}
          </h1>
          <p className=" text-gray-500 text-xl font-medium ">
            {t("appointments.pageDescription")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:justify-end">
          <AppointmentModalButton />
          {/* <Button
            disabled={true}
            variant="outline"
            className={"w-full sm:w-auto"}
          >
            {t("patients.downloadData")}
          </Button> */}
        </div>
      </section>
      <div className="grid xl:grid-cols-4 grid-cols-1 w-full gap-6">
        <div className="flex flex-col gap-6 xl:col-span-3 w-full">
          <div className="flex flex-col gap-2">
            <h6>{t("patients.generalStats")}</h6>
            <section className="grid lg:grid-cols-2 sm:grid-cols-1 w-full gap-6">
              <StatisticsBox
                title={t("appointments.activeAppointmentsNumber")}
                dropdownMenu={false}
                number={upcomingAppointmentsCount}
                showRatio={false}
                data={generateIncreasingNumbers(
                  upcomingAppointmentsCount,
                  "activeAppointmentsNumber"
                )}
              />{" "}
              <StatisticsBox
                title={t("patients.appointmentsNumber")}
                dropdownMenu={false}
                number={appointmentsCount?.currentMonth}
                ratio={(
                  (appointmentsCount?.lastMonth !== 0
                    ? appointmentsCount?.currentMonth /
                      appointmentsCount?.lastMonth
                    : appointmentsCount?.currentMonth > 0
                    ? 1
                    : 0) * 100
                ).toFixed(2)}
                data={generateIncreasingNumbers(
                  appointmentsCount?.currentMonth,
                  "appointmentsNumber"
                )}
              />{" "}
            </section>
          </div>
          <div className="flex flex-col gap-2">
            <h6>{t("appointments.appointments")}</h6>
            <section className="flex flex-col gap-6 ">
              <div className="flex gap-4 w-full ">
                <Input
                  placeholder={t("patients.searchByTherapistName")}
                  className="border-gray-300 w-full z-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(
                        getAppointments({
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
                      getAppointments({
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
                <AppointmentsDataTable
                  data={appointments}
                  count={tableCount}
                  getNextPageData={(pageNumber) => {
                    dispatch(
                      getAppointments({
                        page: pageNumber,
                        page_size: 5,
                        search: search,
                        date: date,
                      })
                    );
                  }}
                  loading={fetchAppointmentsStatus === "loading" ? true : false}
                />
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col xl:col-span-1 gap-2 w-full ">
          {/* <div className="flex flex-col gap-2">
            <h6>{t("appointments.calendar")}</h6>

            <Calendar
              mode="single"
              //   selected={date}
              //   onSelect={setDate}
              className="rounded-md border w-full flex justify-center"
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <h6>{t("appointments.workingHours")}</h6>
            <WorkingHours />
          </div>
          {/* <div className="flex flex-col gap-2">
            <h6>{t("patients.latestUpdates")}</h6>
            <div className="w-full flex flex-col gap-2">
              <NewsBox />
              <NewsBox />
              <NewsBox />
              <NewsBox />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Appointments;
