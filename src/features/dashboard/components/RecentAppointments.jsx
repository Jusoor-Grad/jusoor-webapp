import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";

const RecentAppointments = () => {
  //SECTION - useState
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      setChecked(true);
      // Generate 10 random appointments
      const appointments = Array.from({ length: 10 }, (_, index) => {
        const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
        const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
        const name = [
          "محمد",
          "أحمد",
          "فاطمة",
          "يوسف",
          "نور",
          "سارة",
          "عبدالله",
          "مريم",
          "علي",
          "ريم",
        ][Math.floor(Math.random() * 10)]; // Random name from a predefined list
        return {
          day,
          month,
          name,
        };
      });

      // Select one random appointment from the appointments array
      const randomAppointment = appointments[Math.floor(Math.random() * 10)];
      setSelectedAppointment(randomAppointment);
    }
  }, [checked]);

  return (
    <div className="border-1 border-gray-200 bg-white flex justify-between w-full flex-row p-3 gap-3 items-center text-start rounded-10 hover:bg-gray-25 hover:cursor-pointer hover:scale-95 active:scale-90 transition-transform duration-300 ease-in-out">
      <div className="flex gap-2">
        <div className="w-12 h-12 item-center  bg-gray-50 rounded-full flex-col relative flex items-center justify-center">
          <p className=" font-bold leading-5">{selectedAppointment?.day}</p>
          <p className=" text-error-500  text-xs  leading-none">Jun</p>
        </div>
        <div className="flex flex-col  justify-center">
          <h6 className=" text-sm text-gray-600">
            فحص عام عند
            <span className="font-bold text-sm  underline">
              {selectedAppointment?.name}
            </span>
          </h6>
          <h6 className=" text-sm text-gray-500">
            لتفاصيل اكثر، عن الموعد، اضغط هنا
          </h6>
        </div>
      </div>
      <div>
        <IoChevronBack />
      </div>
    </div>
  );
};

export default RecentAppointments;
