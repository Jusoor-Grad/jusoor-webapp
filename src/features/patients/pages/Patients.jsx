import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { IoFilter } from "react-icons/io5";
import StatisticsBox from "../components/StatisticsBox";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "../components/DatePickerWithRange";
import { DataTable } from "../components/DataTable";
import { AppointmentModalButton } from "../components/AppointmentModalButton";

const Patients = () => {
  const { t } = useTranslation();

  return (
    <main className="p-8 flex flex-col gap-8 relative">
      <div className="absolute top-0 left-0 -z-10">
        <img src={logoPattern} />
      </div>
      <section className="flex justify-between text-center items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">{t("patients.patientsPage")}</h1>
          <p className=" text-gray-500 text-xl ">
            {t("patients.pageDescription")}
          </p>
        </div>
        <div className="flex gap-4">
          <AppointmentModalButton />
          <Button variant="outline">{t("patients.downloadData")}</Button>
        </div>
      </section>
      <section className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
        <StatisticsBox />
        <StatisticsBox />
        <StatisticsBox />
        <StatisticsBox />
      </section>
      <section className="flex flex-col gap-6 ">
        <div className="flex gap-4 w-fit">
          <Input
            placeholder={t("patients.search")}
            className="border-gray-300 w-[400px]"
          />
          <DatePickerWithRange />
          <Button variant="outline" className="gap-2">
            {t("patients.filter")}
            <IoFilter className="w-5 h-5" />
          </Button>
        </div>
        <div>
          <DataTable />
        </div>
      </section>
    </main>
  );
};

export default Patients;
