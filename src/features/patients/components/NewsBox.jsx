import FeaturedIcon from "@/shared/components/FeaturedIcon";
import { Calendar } from "lucide-react";
import React from "react";
import { IoCalendar } from "react-icons/io5";

const NewsBox = () => {
  return (
    <div className="border-1 border-gray-200 flex flex-row p-3 gap-3 items-center rounded-10">
      <div className="item-center  flex justify-center">
        <div className="w-12 h-12 bg-primary-foreground rounded-full relative flex items-center justify-center">
          <div className="w-8 h-8 bg-primary-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center flex  items-center text-2xl text-primary-500">
            <IoCalendar className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col  justify-center">
        <h6 className=" text-sm text-gray-600">
          تم قبول موعد <span className="font-bold text-sm  underline">مجد</span>
        </h6>
        <h6 className=" text-sm text-gray-500">
          لتفاصيل اكثر، عن الموعد، اذهب الى
          <span className=" text-sm text-primary-500 underline"> مواعيدي </span>
        </h6>
      </div>
    </div>
  );
};

export default NewsBox;
