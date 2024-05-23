import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
import StatisticsBox from "../components/StatisticsBox";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivePatientsCount,
  getPatients,
  getPatientsCount,
} from "@/store/slices/patients";
import { getAppointmentsCount } from "@/store/slices/appointments";
import { PatientsDataTable } from "../components/PatientsDataTable";
import { generateIncreasingNumbers } from "@/shared/utils/randomData";

const Patients = () => {
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
  const appointmentsCount = useSelector(
    (state) => state.appointmentsReducer.appointmentsCount
  );
  const activePatientsCount = useSelector(
    (state) => state.patientsReducer.activePatientsCount
  );
  const tableCount = useSelector((state) => state.patientsReducer.tableCount);

  //SECTION - useEffect
  useEffect(() => {
    dispatch(getPatients({ page: page, page_size: 5 }));
    dispatch(getActivePatientsCount());
    dispatch(getAppointmentsCount());
    dispatch(getPatientsCount());
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 z-0 relative">
      <div className="absolute top-0 left-0 z-[-1]">
        <img src={logoPattern} />
      </div>
      <section className="flex  flex-col gap-8 sm:justify-between sm:flex-row items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">{t("patients.patientsPage")}</h1>
          <p className=" text-gray-500 text-xl ">
            {t("patients.pageDescription")}
          </p>
        </div>
        {/* <Button variant="outline" disabled={true} className="w-full sm:w-auto">
          {t("patients.downloadData")}
        </Button> */}
      </section>
      <section className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
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
          title={t("patients.activePatientsNumbers")}
          dropdownMenu={false}
          number={activePatientsCount?.currentMonth}
          ratio={(
            (activePatientsCount?.lastMonth !== 0
              ? activePatientsCount?.currentMonth /
                activePatientsCount?.lastMonth
              : activePatientsCount?.currentMonth > 0
              ? 1
              : 0) * 100
          ).toFixed(2)}
          data={generateIncreasingNumbers(
            activePatientsCount?.currentMonth,
            "activePatientsNumbers"
          )}
        />
        <StatisticsBox
          title={t("patients.appointmentsNumber")}
          dropdownMenu={false}
          number={appointmentsCount?.currentMonth}
          ratio={(
            (appointmentsCount?.lastMonth !== 0
              ? appointmentsCount?.currentMonth / appointmentsCount?.lastMonth
              : appointmentsCount?.currentMonth > 0
              ? 1
              : 0) * 100
          ).toFixed(2)}
          data={generateIncreasingNumbers(
            appointmentsCount?.currentMonth,
            "appointmentsNumber"
          )}
        />
      </section>
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
              dispatch(getPatients({ page: 1, page_size: 5, search: search }));
              setPage(1);
            }}
          >
            {t("patients.searchMobile")}
            <IoSearchOutline className="w-5 h-5" />
          </Button>
          {/* <DatePickerWithRange />
          <Button variant="outline" className="gap-2" disabled={true}>
            {t("patients.filter")}
            <IoFilter className="w-5 h-5" />
          </Button> */}
        </div>
        <div>
          <PatientsDataTable
            data={patients}
            count={tableCount}
            getNextPageData={(pageNumber) => {
              dispatch(
                getPatients({ page: pageNumber, page_size: 5, search: search })
              );
              setPage(pageNumber);
            }}
            loading={fetchPatientsStatus === "loading" ? true : false}
            page={page}
            setPage={setPage}
          />
        </div>
      </section>
    </main>
  );
};

export default Patients;
