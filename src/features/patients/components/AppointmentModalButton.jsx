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
import { IoAdd } from "react-icons/io5";
import { DropdownRadioGroup } from "./DropdownRadioGroup";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { SurveysCarousel } from "./SurveysCarousel";

export function AppointmentModalButton() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="gap-3">
          <IoAdd className="w-5 h-5" /> {t("patients.bookAppointment")}
        </Button>{" "}
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col gap-8  w-full max-w-[400px]">
        <div className="flex flex-col gap-5">
          <div className="item-center w-full flex justify-center">
            <FeaturedIcon size={"lg"} icon={<Calendar />} />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-gray-900">
              {t("patients.bookAppointment")}
            </h1>
            <p className="text-sm text-gray-500 ">
              {t("patients.chooseTimeAndPerson")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("patients.patients")}
              </Label>
              <DropdownRadioGroup />
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("patients.date")}
              </Label>
              <DatePickerWithRange />
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("patients.time")}
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-primary-foreground border-1 h-[44px] border-primary-500 hover:cursor-pointer rounded-10 text-primary-500 p-2 flex justify-center  text-sm font-bold">
                  <p className="flex flex-col justify-center">١٢:٠٠ صباحا</p>
                </div>
                <div className="bg-gray-25 border-1 h-[44px] border-gray-200  hover:bg-gray-50  active:bg-gray-100 hover:border-gray-300 hover:cursor-pointer rounded-10 text-gray-600 p-2 flex justify-center  text-sm font-normal">
                  <p className="flex flex-col justify-center">١٢:٠٠ صباحا</p>
                </div>
                <div className="bg-gray-25 border-1 h-[44px] border-gray-200  hover:bg-gray-50  active:bg-gray-100 hover:border-gray-300 hover:cursor-pointer rounded-10 text-gray-600 p-2 flex justify-center  text-sm font-normal">
                  <p className="flex flex-col justify-center">١٢:٠٠ صباحا</p>
                </div>
                <div className="bg-gray-25 border-1 h-[44px] border-gray-200  hover:bg-gray-50  active:bg-gray-100 hover:border-gray-300 hover:cursor-pointer rounded-10 text-gray-600 p-2 flex justify-center  text-sm font-normal">
                  <p className="flex flex-col justify-center">١٢:٠٠ صباحا</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("patients.screeningSurvey")}
              </Label>
              <SurveysCarousel />
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
}
