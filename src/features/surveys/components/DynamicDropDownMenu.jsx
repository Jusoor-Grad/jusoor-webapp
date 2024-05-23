import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

const DynamicDropDownMenu = ({ menuItems }) => {
  //SECTION - general
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="h-4 w-4 cursor-pointer " />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={i18n.language === "ar" ? "text-end" : "text-start"}
      >
        <DropdownMenuLabel>{i18n.t("general.action")}</DropdownMenuLabel>
        {menuItems?.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={`cursor-pointer text-center ${
              item.style ? item.style : ""
            } items-center flex justify-${
              i18n.language === "ar" ? "end" : "start"
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DynamicDropDownMenu;
