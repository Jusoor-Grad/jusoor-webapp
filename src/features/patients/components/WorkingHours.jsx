import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { createRepeatingTimeSlots } from "@/store/slices/appointments";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Divider } from "@nextui-org/react";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { showFlashMessage } from "@/store/slices/notifications";

const WorkingHours = () => {
  //SECTION - general
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //SECTION - useState
  const [hoursArray, setHoursArray] = useState([]);
  const [workingHours, setWorkingHours] = useState({
    sunday: { start: "", end: "" },
    monday: { start: "", end: "" },
    tuesday: { start: "", end: "" },
    wednesday: { start: "", end: "" },
    thursday: { start: "", end: "" },
  });
  const [applyDateRange, setApplyDateRangeDate] = useState({
    from: moment().toDate(), // Start from now
    to: moment().add(30, "days").toDate(), // Set to 30 days from now
  });

  //SECTION - useSelector
  const createRepeatingTimeSlotsStatus = useSelector(
    (state) => state.appointmentsReducer.createRepeatingTimeSlotsStatus
  );

  //SECTION - useEffect
  useEffect(() => {
    setHoursArray(generateHoursArray());
    // dispatch(getTimeSlot({ id: userId }));
  }, []);

  //SECTION - functions
  // Function to handle changes in start and end times
  const handleTimeChange = (day, field, value) => {
    setWorkingHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [field]: value ? moment(value, "h:mm A").format("HH:mm:ss.SSSSSS") : "", // Format the selected time as ISO string
      },
    }));
  };

  const handleUpdate = () => {
    // Check if any value in weekly_schedule is null or empty
    const isScheduleValid = Object.values(workingHours).every(
      (day) => day.start && day.end
    );

    if (!isScheduleValid || !applyDateRange.from || !applyDateRange.to) {
      dispatch(
        showFlashMessage({
          message: t("appointments.fillAllValues"),
          severity: "error",
        })
      );
      return;
    }

    const weekly_schedule = {
      sunday: [{ start_at: null, end_at: null }],
      monday: [{ start_at: null, end_at: null }],
      tuesday: [{ start_at: null, end_at: null }],
      wednesday: [{ start_at: null, end_at: null }],
      thursday: [{ start_at: null, end_at: null }],
      // Add similar entries for Friday and Saturday if needed
    };

    // Fill in the start_at and end_at values from the workingHours state
    Object.keys(workingHours).forEach((day) => {
      const { start, end } = workingHours[day];
      weekly_schedule[day.toLowerCase()] = [{ start_at: start, end_at: end }];
    });

    const now = moment();
    // Check if start_at is before now
    const startAtAdjusted = moment(applyDateRange.from).isBefore(now)
      ? now.add(10, "minutes")
      : moment(applyDateRange.from);

    const payload = {
      start_at: startAtAdjusted.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"), // Format with date, hours, minutes, seconds, microseconds, and timezone offset
      end_at: moment(applyDateRange.to).format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
      weekly_schedule: weekly_schedule,
    };

    dispatch(createRepeatingTimeSlots(payload));
  };

  // Function to generate array of hours with 30 minute intervals using Moment.js
  const generateHoursArray = () => {
    const hours = [];
    const startOfDay = moment().startOf("day");
    const endOfDay = moment().endOf("day");
    let currentHour = startOfDay.clone();

    while (currentHour.isBefore(endOfDay)) {
      hours.push(currentHour.format("h:mm A"));
      currentHour.add(30, "minutes");
    }

    return hours;
  };

  return (
    <div className="grid gap-2 p-3 border-1 bg-white border-gray-200 rounded-10">
      <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-10">
        {t("appointments.workingHoursDescription")}{" "}
      </p>
      {["sunday", "monday", "tuesday", "wednesday", "thursday"].map(
        (day, index) => (
          <div key={index} className="grid grid-cols-4  ">
            <div>{t(`appointments.${day}`)}</div>
            <div className="flex items-center w-full gap-4 col-span-3 bg-gray-50">
              <Select onValueChange={(e) => handleTimeChange(day, "start", e)}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("appointments.startHour")}</SelectLabel>

                    {hoursArray.map((hour, index) => (
                      <SelectItem key={index} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="font-normal text-xs">{t("appointments.to")}</p>
              <Select onValueChange={(e) => handleTimeChange(day, "end", e)}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("appointments.endHour")}</SelectLabel>

                    {hoursArray.map((hour, index) => (
                      <SelectItem key={index} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      )}
      <Divider />
      <div className="grid grid-cols-4 items-center ">
        <div>{t(`appointments.applyTill`)}</div>
        <div className="flex items-center w-full gap-4 col-span-3 bg-gray-50">
          <DatePickerWithRange
            setDate={setApplyDateRangeDate}
            date={applyDateRange}
            className={"z-10 w-full"}
          />
        </div>
      </div>
      <Button onClick={handleUpdate}>
        {createRepeatingTimeSlotsStatus === "loading" ? (
          <CircularProgress size="sm" aria-label="Loading..." />
        ) : (
          t("appointments.submit")
        )}
      </Button>
    </div>
  );
};

export default WorkingHours;
