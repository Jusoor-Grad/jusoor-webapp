import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedIcon from "@/shared/components/FeaturedIcon";
import { Calendar } from "lucide-react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useState } from "react";

export function SurveysCarousel() {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 basis-[90%] ">
            <Card
              className={`flex gap-1 justify-between align-top p-3 cursor-pointer ${
                selectedCard === index
                  ? "bg-primary-foreground border-primary-500 "
                  : "bg-gray-25 border-gray-200"
              } border-1 `}
              onClick={() => setSelectedCard(index)} // Set selected card on click
            >
              <div className="flex gap-1 align-top  items-center">
                <div className="">
                  <FeaturedIcon
                    size={"sm"}
                    icon={<Calendar className="h-4 w-4" />}
                  />
                </div>
                <div className="flex flex-col ">
                  <p
                    className={`${
                      selectedCard === index ? "font-bold" : "font-normal"
                    } text-xs text-gray-700`}
                  >
                    الاستبيان الاول
                  </p>
                  <p
                    className={`${
                      selectedCard === index ? "font-bold" : "font-normal"
                    } text-xs text-primary-500`}
                  >
                    مخصص لاكتشاف الاحباط و الاكتئاب الاولي
                  </p>
                </div>
              </div>
              {selectedCard === index && (
                <IoCheckmarkCircle className=" text-primary-500" />
              )}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
