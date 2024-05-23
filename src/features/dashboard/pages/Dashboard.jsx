import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import StatisticsBox from "../../patients/components/StatisticsBox";
import NewsBox from "../../patients/components/NewsBox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getPatients, getPatientsCount } from "@/store/slices/patients";
import {
  getAppointmentsCount,
  getUpcomingAppointmentsCount,
} from "@/store/slices/appointments";
import { AppointmentDetailsModal } from "../components/AppointmentDetailsModal";
import { PatientsDataTable } from "../../patients/components/PatientsDataTable";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { generateIncreasingNumbers } from "@/shared/utils/randomData";

const Dashboard = () => {
  //SECTION - general
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //SECTION - useState
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //SECTION - useSelector
  const fetchPatientsStatus = useSelector(
    (state) => state.patientsReducer.fetchPatientsStatus
  );
  const patients = useSelector((state) => state.patientsReducer.patients);
  const patientsCount = useSelector(
    (state) => state.patientsReducer.patientsCount
  );
  const tableCount = useSelector((state) => state.patientsReducer.tableCount);
  const upcomingAppointmentsCount = useSelector(
    (state) => state.appointmentsReducer.upcomingAppointmentsCount
  );
  //SECTION - useState
  useEffect(() => {
    dispatch(getPatients({ page: 1, page_size: 5 }));
    dispatch(getAppointmentsCount());
    dispatch(getPatientsCount());
    dispatch(getUpcomingAppointmentsCount());
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 z-0 relative w-full">
      <div className="absolute top-0 left-0 z-[-1]">
        <img src={logoPattern} />
      </div>
      <section className="flex justify-between text-center items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">{t("dashboard.dashboardPage")}</h1>
          <p className=" text-gray-500 text-xl font-medium ">
            {t("dashboard.dashboardDescription")}
          </p>
        </div>
      </section>
      <div className="grid xl:grid-cols-3 grid-cols-1 w-full gap-6">
        <div className="flex flex-col gap-6 xl:col-span-2 w-full">
          <div className="flex flex-col gap-2">
            <h6>{t("patients.generalStats")}</h6>
            <section className="grid lg:grid-cols-2 sm:grid-cols-1 w-full gap-6">
              <StatisticsBox
                title={t("patients.patientsNumbers")}
                dropdownMenu={false}
                number={patientsCount?.currentMonth}
                ratio={(
                  (patientsCount?.lastMonth !== 0
                    ? patientsCount?.currentMonth / patientsCount?.lastMonth
                    : patientsCount?.currentMonth > 0
                    ? 1
                    : 0) * 100
                ).toFixed(2)}
                data={generateIncreasingNumbers(
                  patientsCount?.currentMonth,
                  "patientsNumbers"
                )}
              />
              <StatisticsBox
                title={t("appointments.activeAppointmentsNumber")}
                dropdownMenu={false}
                number={upcomingAppointmentsCount}
                showRatio={false}
                data={
                  upcomingAppointmentsCount > 0
                    ? generateIncreasingNumbers(
                        upcomingAppointmentsCount,
                        "activeAppointmentsNumber"
                      )
                    : generateIncreasingNumbers(200, "activeAppointmentsNumber")
                }
                gray={upcomingAppointmentsCount > 0 ? false : true}
              />{" "}
            </section>
          </div>
          <div className="flex flex-col gap-2">
            <h6>{t("dashboard.myPatients")}</h6>
            <section className="flex flex-col gap-6 ">
              <div className="flex gap-4 w-full">
                <Input
                  placeholder={t("patients.searchByPatientName")}
                  className="border-gray-300 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(
                        getPatients({ page: 1, page_size: 5, search: search })
                      );
                      setPage(1);
                    }
                  }}
                />
                <Button
                  variant="outline"
                  className="gap-2 flex md:hidden"
                  onClick={() => {
                    dispatch(
                      getPatients({ page: 1, page_size: 5, search: search })
                    );
                    setPage(1);
                  }}
                >
                  {t("patients.searchMobile")}
                  <IoSearchOutline className="w-5 h-5" />
                </Button>
              </div>
              <div>
                <PatientsDataTable
                  data={patients}
                  count={tableCount}
                  getNextPageData={(pageNumber) => {
                    dispatch(getPatients({ page: pageNumber, page_size: 5 }));
                    setPage(pageNumber);
                  }}
                  loading={fetchPatientsStatus === "loading" ? true : false}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col xl:col-span-1 gap-2 w-full ">
          <div className="flex flex-col gap-2 ">
            <h6>{t("dashboard.upcomingAppointments")}</h6>
            <div className="flex flex-col gap-2 p-3 border-1 bg-white border-gray-200 rounded-10">
              <AppointmentDetailsModal />
              <AppointmentDetailsModal />
              <AppointmentDetailsModal />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h6>{t("patients.latestUpdates")}</h6>
            <div className="w-full flex flex-col gap-2">
              <NewsBox />
              <NewsBox />
              <NewsBox />
              <NewsBox />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
