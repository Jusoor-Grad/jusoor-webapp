import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar from "../../../shared/assets/images/avatarMockup.jpg";
import { IoPersonAddOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export function DropdownRadioGroup() {
  const [position, setPosition] = React.useState("mohammad");
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="justify-start text-gray-500">
        <Button variant="outline" className="flex gap-2 font-normal ">
          <IoPersonAddOutline />
          {t("patients.choosePatient")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${
          i18n.language === "ar" ? "text-right" : "text-left"
        } `}
        sideOffset={0}
      >
        <DropdownMenuLabel>{t("patients.choose")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="mohammad" className="p-0 justify-end">
            <div
              className={`flex ${
                i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
              } px-3 py-2 gap-2 justify-center items-center`}
            >
              <img
                src={avatar}
                className="w-[24px] h-[24px] rounded-full"
                alt="avatar"
              />
              <p className="font-medium">محمد</p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="abdulmalik"
            className=" p-0 justify-end"
          >
            <div
              className={`flex ${
                i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
              } px-3 py-2 gap-2 justify-center items-center`}
            >
              <img
                src={avatar}
                className="w-[24px] h-[24px] rounded-full"
                alt="avatar"
              />
              <p className="font-medium">عبدالملك</p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="nawaf" className=" p-0 justify-end">
            <div
              className={`flex ${
                i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
              } px-3 py-2 gap-2 justify-center items-center`}
            >
              <img
                src={avatar}
                className="w-[24px] h-[24px] rounded-full"
                alt="avatar"
              />
              <p className="font-medium">نواف</p>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
