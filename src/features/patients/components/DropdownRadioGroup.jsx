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

export function DropdownRadioGroup() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" sideOffset={0}>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top" className="p-0 justify-end">
            <div className="flex flex-row-reverse px-3 py-2 gap-2 justify-center">
              <img
                src={avatar}
                className="w-[24px] h-[24px] rounded-full"
                alt="avatar"
              />
              <p className="font-medium ">مجد بيازيد</p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom" className="justify-end">
            <div className="flex flex-row-reverse px-3 py-2 gap-2 justify-center">
              <img
                src={avatar}
                className="w-[24px] h-[24px] rounded-full"
                alt="avatar"
              />
              <p className="font-medium ">مجد بيازيد</p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
