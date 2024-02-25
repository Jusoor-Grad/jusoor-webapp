import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { IoFilter } from "react-icons/io5";
import StatisticsBox from "../components/StatisticsBox";
import logoPattern from "../../../shared/assets/images/Logo pattern.svg";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "../components/DatePickerWithRange";
import { DataTable } from "../components/DataTable";
import { AppointmentModalButton } from "../components/AppointmentModalButton";

import RadarGraph from "../components/RadarGraph";
import NewsBox from "../components/NewsBox";
import { Calendar } from "@/components/ui/calendar";

const Appointments = () => {
  const { t } = useTranslation();

  return (
    <main className="p-8 flex flex-col gap-8 relative w-full">
      <div className="absolute top-0 left-0 -z-10">
        <img src={logoPattern} />
      </div>
      <section className="flex justify-between text-center items-center">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-4xl font-bold">
            {t("appointments.appointmentsPage")}
          </h1>
          <p className=" text-gray-500 text-xl font-medium ">
            {t("appointments.pageDescription")}
          </p>
        </div>
        <div className="flex gap-4">
          <AppointmentModalButton />
          <Button variant="outline">{t("patients.downloadData")}</Button>
        </div>
      </section>
      <div className="grid xl:grid-cols-3 grid-cols-1 w-full gap-6">
        <div className="flex flex-col gap-6 xl:col-span-2 w-full">
          <div className="flex flex-col gap-2">
            <h6>{t("patients.generalStats")}</h6>
            <section className="grid lg:grid-cols-2 sm:grid-cols-1 w-full gap-6">
              <StatisticsBox />
              <StatisticsBox />
            </section>
          </div>
          <div className="flex flex-col gap-2">
            <h6>{t("appointments.appointments")}</h6>
            <section className="flex flex-col gap-6 ">
              <div className="flex gap-4 w-full flex-wrap">
                <Input
                  placeholder={"البحث..."}
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
          </div>
        </div>
        <div className="flex flex-col xl:col-span-1 gap-2 w-full ">
          <div className="flex flex-col gap-2">
            <h6>{t("appointments.calendar")}</h6>

            <Calendar
              mode="single"
              //   selected={date}
              //   onSelect={setDate}
              className="rounded-md border w-full flex justify-center"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h6>{t("appointments.workingHours")}</h6>
            <p>
              implement an interface to change doctor's working hours.
              (Inspirations can be found in old design)
            </p>
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

export default Appointments;
