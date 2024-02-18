import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FeaturedIcon from "@/shared/components/FeaturedIcon";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IoAdd } from "react-icons/io5";

export function AppointmentModalButton() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="gap-3">
          <IoAdd className="w-5 h-5" /> {t("patients.bookAppointment")}
        </Button>{" "}
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col gap-6  w-full max-w-[400px]">
        <div className="flex flex-col gap-5">
          <div className="item-center w-full flex justify-center">
            <FeaturedIcon icon={<Calendar />} />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-gray-900">
              {t("patients.bookAppointment")}
            </h1>
            <p className="text-sm text-gray-500">
              {t("patients.chooseTimeAndPerson")}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full "></div>
        </div>
        <div className="flex gap-4 w-full">
          <Button className="w-full">{t("patients.approve")}</Button>
          <Button variant="outline" className="w-full">
            {t("patients.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
