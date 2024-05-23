import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeaturedIcon from "@/shared/components/FeaturedIcon";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import RecentAppointments from "./RecentAppointments";

export const AppointmentDetailsModal = () => {
  //SECTION - general
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger>
        <RecentAppointments />
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col gap-8  w-full max-w-[400px]">
        <div className="flex flex-col gap-5">
          <div className="item-center w-full flex justify-center">
            <FeaturedIcon size={"lg"} icon={<Calendar />} />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-gray-900">
              {t("dashboard.appointmentDetails")}
            </h1>
            <p className="text-sm text-gray-500 ">2024 / 2 / 14</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700  text-sm">
                {t("dashboard.patient")}
                <span className="font-normal">{"Test patient"}</span>
              </Label>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700  text-sm">
                {t("dashboard.date")}
                <span className="font-normal">{"2024/3/3 12:33:44 PM"}</span>
              </Label>
            </div>

            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 text-sm">
                {t("dashboard.screeningSurvey")}
                <span className="font-normal">{"Survey No. 1"}</span>
              </Label>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 text-sm flex items-center gap-1">
                {t("dashboard.status")}

                <p
                  className={
                    "text-success-700 bg-success-50 px-4 w-fit rounded-25 py-0.5"
                  }
                >
                  فعال
                </p>
              </Label>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <DialogClose asChild>
            <Button className="w-full">{t("patients.approve")}</Button>
          </DialogClose>
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
