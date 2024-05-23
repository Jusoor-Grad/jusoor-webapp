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
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { SurveysCarousel } from "./SurveysCarousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  flushTimeSlot,
  getAppointments,
  getAppointmentsCount,
  getTimeSlots,
  getUpcomingAppointmentsCount,
} from "@/store/slices/appointments";
import moment from "moment";
import auth from "@/shared/utils/Authentication";
import { showFlashMessage } from "@/store/slices/notifications";
import { CircularProgress } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getPatients } from "@/store/slices/patients";

export const AppointmentModalButton = () => {
  //SECTION - general
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userId = auth.getUserId();

  //SECTION - useState
  const [applyDateRange, setApplyDateRangeDate] = useState({
    from: null,
    to: null,
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);

  //SECTION - useSelectors
  const fetchTimeSlotsStatus = useSelector(
    (state) => state.appointmentsReducer.fetchTimeSlotsStatus
  );
  const timeSlots = useSelector((state) => state.appointmentsReducer.timeslots);
  const createAppointmentStatus = useSelector(
    (state) => state.appointmentsReducer.createAppointmentStatus
  );
  const patients = useSelector((state) => state.patientsReducer.patients);
  const fetchPatientsStatus = useSelector(
    (state) => state.patientsReducer.fetchPatientsStatus
  );

  //SECTION - useEffect
  useEffect(() => {
    dispatch(getPatients({ page: 1, page_size: 10 }));
  }, []);

  //SECTION - FUNCTIONS
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const fetchTimeSlots = () => {
    let query = `therapist__user=${userId}&page_size=${200}`;

    if (!applyDateRange.to && !applyDateRange.from) {
      dispatch(
        showFlashMessage({
          message: t("appointments.selectDate"),
          severity: "error",
        })
      );
      return;
    }
    if (applyDateRange.from) {
      const fromDate = new Date(applyDateRange.from).toISOString(); // Convert to ISO format
      query += `&start_at__gte=${fromDate}`;

      if (!applyDateRange.to) {
        query += `&start_at__lte=${fromDate}`;
      }
    }

    if (applyDateRange.to) {
      const toDate = new Date(applyDateRange.to).toISOString(); // Convert to ISO format
      query += `&start_at__lte=${toDate}`;
    }

    dispatch(getTimeSlots({ query }));
  };

  const calculateFreeTime = (timeSlots) => {
    let freeTimeSlots = {};

    timeSlots.forEach((slot) => {
      const { id, start_at, end_at, linked_appointments } = slot;
      const startDate = moment(start_at);
      const endDate = moment(end_at);
      const startDateString = startDate.format("D MMM"); // Format date as "13 Jun"

      let previousEndTime = startDate;
      linked_appointments.forEach((appointment) => {
        const appointmentStartTime = moment(appointment.start_at);
        const appointmentEndTime = moment(appointment.end_at);

        if (appointmentStartTime.isAfter(previousEndTime)) {
          const freeStartTime = previousEndTime.format(
            "YYYY-MM-DDTHH:mm:ss.SSSSSSZ"
          );
          const freeEndTime = appointmentStartTime.format(
            "YYYY-MM-DDTHH:mm:ss.SSSSSSZ"
          );

          const slotInfo = {
            id,
            start: freeStartTime,
            end: freeEndTime,
          };

          if (!freeTimeSlots[startDateString]) {
            freeTimeSlots[startDateString] = [slotInfo];
          } else {
            freeTimeSlots[startDateString].push(slotInfo);
          }
        }

        previousEndTime = appointmentEndTime;
      });

      if (endDate.isAfter(previousEndTime)) {
        const freeStartTime = previousEndTime.format(
          "YYYY-MM-DDTHH:mm:ss.SSSSSSZ"
        );
        const freeEndTime = endDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");

        const slotInfo = {
          id,
          start: freeStartTime,
          end: freeEndTime,
        };

        if (!freeTimeSlots[startDateString]) {
          freeTimeSlots[startDateString] = [slotInfo];
        } else {
          freeTimeSlots[startDateString].push(slotInfo);
        }
      }
    });

    return freeTimeSlots;
  };

  const removeDuplicateTimeSlots = (freeTimeSlots) => {
    // Iterate over each date in freeTimeSlots
    for (const date in freeTimeSlots) {
      // Get the time slots for the current date
      const timeSlots = freeTimeSlots[date];

      // Create a map to store unique time slots
      const uniqueTimeSlots = new Map();

      // Iterate over each time slot for the current date
      for (const timeSlot of timeSlots) {
        // Use the start and end time as the key for the map
        const key = timeSlot.start + "-" + timeSlot.end;

        // Check if the key already exists in the map
        if (!uniqueTimeSlots.has(key)) {
          // If not, add the time slot to the map
          uniqueTimeSlots.set(key, timeSlot);
        }
      }

      // Convert the map back to an array of time slots
      const uniqueTimeSlotsArray = Array.from(uniqueTimeSlots.values());

      // Update the time slots for the current date in freeTimeSlots
      freeTimeSlots[date] = uniqueTimeSlotsArray;
    }

    return freeTimeSlots;
  };

  const displayFreeTimeSlots = (freeTimeSlots) => {
    const handleTimeSlotClick = (slot) => {
      setSelectedTimeSlot(slot);
    };

    return Object.keys(freeTimeSlots).map((date) => {
      return (
        <div className="flex flex-col gap-4 w-full" key={date}>
          <div className="backdrop-blur-lg sticky top-0 px-2 pb-1">
            <p className="text-gray-700  mt-4 text-md font-bold ">{date}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {freeTimeSlots[date].flatMap((slot) => {
              const slots = [];
              const seenTimeSlots = new Set(); // Keep track of seen time slots
              let startTime = moment(slot.start);
              const endTime = moment(slot.end);

              while (startTime.isBefore(endTime)) {
                const nextSlotEnd = moment.min(
                  startTime.clone().add(30, "minutes"),
                  endTime
                );
                const timeSlot = {
                  start: startTime.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
                  end: nextSlotEnd.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
                };

                // Check if the time slot has been seen before
                if (!seenTimeSlots.has(timeSlot.start)) {
                  slots.push(timeSlot);
                  seenTimeSlots.add(timeSlot.start); // Add the time slot to the set of seen time slots
                }
                startTime = nextSlotEnd;
              }

              return slots.map((timeSlot) => (
                <div
                  key={timeSlot.start}
                  className={`bg-gray-25 border-1 h-[50px] flex-col  items-center  border-gray-200  hover:border-gray-300 hover:cursor-pointer rounded-10 text-gray-600 p-2 flex justify-center text-sm font-normal ${
                    selectedTimeSlot &&
                    selectedTimeSlot.id === slot.id &&
                    selectedTimeSlot.start === timeSlot.start
                      ? "bg-primary-foreground text-primary "
                      : ""
                  }`}
                  onClick={() =>
                    handleTimeSlotClick({
                      id: slot.id,
                      start: timeSlot.start,
                      end: timeSlot.end,
                    })
                  }
                >
                  <p className="flex flex-col justify-center text-xs text-center">{`${moment
                    .utc(timeSlot.start)
                    .format("h:mm A")} - ${moment
                    .utc(timeSlot.end)
                    .format("h:mm A")}`}</p>
                  <p className="text-xs text-primary">30min</p>
                </div>
              ));
            })}
          </div>
        </div>
      );
    });
  };

  const handleSubmitForm = () => {
    // Check if any of the attributes in data is null or undefined
    if (!selectedTimeSlot || !selectedPatient) {
      // Alert the user if any attribute is null or undefined
      dispatch(
        showFlashMessage({
          message: t("appointments.missingFields"),
          severity: "error",
        })
      );
      return; // Exit early if any attribute is null or undefined
    }

    const data = {
      timeslot: selectedTimeSlot.id,
      start_at: selectedTimeSlot.start,
      end_at: selectedTimeSlot.end,
      patient: selectedPatient,
    };

    dispatch(createAppointment(data)).then((res) => {
      if (res?.payload?.status === 201) {
        setOpen(false);
        setSelectedPatient(null);
        setSelectedTimeSlot(null);
        setSearch("");
        setApplyDateRangeDate({
          from: null,
          to: null,
        });
        dispatch(flushTimeSlot());
        dispatch(getAppointments({ page: 1, page_size: 5 }));
        dispatch(getAppointmentsCount());
        dispatch(getUpcomingAppointmentsCount());
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gap-3 w-full md:w-auto">
          <IoAdd className="w-5 h-5" /> {t("patients.bookAppointment")}
        </Button>{" "}
      </DialogTrigger>
      <DialogContent className="p-8 flex flex-col gap-8  w-full max-h-[95vh] overflow-y-scroll overflow-x-hidden  max-w-[450px]">
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
              <Select
                onValueChange={(e) => {
                  handlePatientSelect(e);
                }}
              >
                <SelectTrigger className="w-full flex justify-between flex-row-reverse">
                  <SelectValue
                    placeholder={t("appointments.selectPatient")}
                    value={selectedPatient ? selectedPatient.username : ""}
                  />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex gap-2 mb-2">
                    <Button
                      variant="secondary"
                      className="h-8 text-gray-500"
                      onClick={() => {
                        dispatch(
                          getPatients({
                            page: 1,
                            page_size: 10,
                            search: search,
                          })
                        );
                      }}
                    >
                      {fetchPatientsStatus === "loading" ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : (
                        t("appointments.search")
                      )}
                    </Button>
                    <Input
                      className="h-8 text-end "
                      placeholder={t("appointments.search")}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            getPatients({
                              page: 1,
                              page_size: 10,
                              search: search,
                            })
                          );
                        }
                      }}
                    />
                  </div>

                  {patients.map((patient) => (
                    <SelectItem
                      key={patient.id}
                      className="flex flex-row-reverse"
                      value={patient.id}
                    >
                      {patient.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("patients.date")}
              </Label>
              <div className="flex gap-2">
                <DatePickerWithRange
                  setDate={setApplyDateRangeDate}
                  date={applyDateRange}
                  className={"z-10 w-full"}
                />
                <Button
                  variant="secondary"
                  className="w-fit"
                  onClick={fetchTimeSlots}
                >
                  {fetchTimeSlotsStatus === "loading" ? (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  ) : (
                    t("appointments.search")
                  )}
                </Button>
              </div>
            </div>
            <Label className="text-gray-700 font-normal text-sm">
              {t("patients.time")}
            </Label>
            {timeSlots?.results &&
            timeSlots &&
            timeSlots?.results.length !== 0 ? (
              <ScrollArea className="h-56 rounded">
                {displayFreeTimeSlots(
                  removeDuplicateTimeSlots(
                    calculateFreeTime(timeSlots?.results)
                  )
                )}
              </ScrollArea>
            ) : timeSlots?.results.length === 0 ? (
              <p className="text-sm flex justify-center my-4 text-gray-500">
                {t("appointments.noTimeFoundDuringThisDate")}
              </p>
            ) : (
              <p className="text-sm flex justify-center my-4 text-gray-500">
                {t("appointments.searchToFindTime")}
              </p>
            )}
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-gray-700 font-normal text-sm">
                {t("patients.screeningSurvey")}
              </Label>
              <SurveysCarousel />
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <Button
            className="w-full"
            onClick={() => {
              handleSubmitForm();
            }}
            disabled={createAppointmentStatus === "loading"}
          >
            {createAppointmentStatus === "loading" ? (
              <CircularProgress size="sm" aria-label="Loading..." />
            ) : (
              t("patients.approve")
            )}
          </Button>

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
