import React, { useState, useEffect } from "react";
import { IoCalendar } from "react-icons/io5";

const NewsBox = () => {
  //SECTION - useState
  const [randomNews, setRandomNews] = useState(null);
  const [checked, setChecked] = useState(false);

  // Random news options for a medical psychiatrist doctor
  const randomNewsOptions = [
    {
      title: "تم قبول موعد",
      name: "مجد",
      details: "لتفاصيل أكثر، عن الموعد، اذهب الى مواعيدي",
    },
    {
      title: "تأكيد موعد",
      name: "سارة",
      details: "الرجاء التأكد من تأكيد الموعد الخاص بك",
    },
    {
      title: "إلغاء موعد",
      name: "عبد الله",
      details: "نعتذر عن إلغاء الموعد، الرجاء التواصل لإعادة الجدولة",
    },
    {
      title: "موعد جديد",
      name: "مريم",
      details: "لقد تم تحديد موعد جديد لك، يرجى متابعة التفاصيل",
    },
    {
      title: "تأجيل موعد",
      name: "فاطمة",
      details: "تم تأجيل الموعد إلى وقت لاحق، يرجى التأكد من التفاصيل",
    },
    {
      title: "تعديل موعد",
      name: "أحمد",
      details: "تم تعديل الموعد، يرجى التحقق من التفاصيل الجديدة",
    },
    {
      title: "إشعار هام",
      name: "يوسف",
      details: "إشعار هام بشأن موعدك، الرجاء التحقق من التفاصيل",
    },
    {
      title: "موعد ملغي",
      name: "نور",
      details: "تم إلغاء الموعد، يرجى مراجعة الجدولة لتحديد موعد جديد",
    },
    {
      title: "تنبيه مهم",
      name: "ريم",
      details: "تنبيه مهم بشأن موعدك، الرجاء الاطلاع على التفاصيل",
    },
    {
      title: "تأكيد تواجد",
      name: "أمير",
      details: "الرجاء تأكيد تواجدك للموعد، شكراً لتعاونك",
    },
  ];

  // Function to get a random item from an array
  const getRandomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  //SECTION - useEffect
  useEffect(() => {
    if (!checked) {
      setChecked(true);
      const news = getRandomItem(randomNewsOptions);
      setRandomNews(news);
    }
  }, [checked, randomNewsOptions]);

  return (
    <div className="border-1 border-gray-200 bg-white flex flex-row p-3 gap-3 items-center rounded-10">
      <div className="item-center flex justify-center">
        <div className="w-12 h-12 bg-primary-foreground rounded-full relative flex items-center justify-center">
          <div className="w-8 h-8 bg-primary-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center flex items-center text-2xl text-primary-500">
            <IoCalendar className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h6 className="text-sm text-gray-600">
          {randomNews?.title}{" "}
          <span className="font-bold text-sm underline">
            {randomNews?.name}
          </span>
        </h6>
        <h6 className="text-sm text-gray-500">{randomNews?.details}</h6>
      </div>
    </div>
  );
};

export default NewsBox;
