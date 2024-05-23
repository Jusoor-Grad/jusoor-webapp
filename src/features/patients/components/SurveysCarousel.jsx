import { Card } from "@/components/ui/card";
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
import { useSelector } from "react-redux";

export const SurveysCarousel = () => {
  //SECTION - useState
  const [selectedCard, setSelectedCard] = useState(0);

  //SECTION - useSelector
  const surveys = useSelector((state) => state.surveysReducer.surveys);
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {surveys &&
          surveys?.results.map((survey, index) => (
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
                      {survey.name}
                    </p>
                    <p
                      className={`${
                        selectedCard === index ? "font-bold" : "font-normal"
                      } text-xs text-primary-500`}
                    >
                      {survey.description}
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
};
