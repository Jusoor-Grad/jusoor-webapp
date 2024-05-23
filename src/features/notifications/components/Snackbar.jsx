import { hideFlashMessage } from "@/store/slices/notifications";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const Snackbar = () => {
  //SECTION - general
  const dispatch = useDispatch();

  //SECTION - useState
  const [severityColor, setSeverityColor] = useState("text-black bg-gray-200");

  //SECTION - useSelector
  const open = useSelector((state) => state.notificationsReducer.open);
  const message = useSelector((state) => state.notificationsReducer.message);
  const severity = useSelector((state) => state.notificationsReducer.severity);

  //SECTION - useEffect
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(hideFlashMessage());
      }, 4000);
      setSeverityColor(getSeverityColor());
    }
  }, [open]);

  //SECTION - functions
  const getSeverityColor = () => {
    switch (severity) {
      case "success":
        return "text-success-600 bg-success-200";
      case "error":
        return "text-error-600 bg-error-200";
      case "warning":
        return "text-warning-600 bg-warning-200";
      case "info":
        return "text-black bg-gray-200";
      default:
        return "text-black bg-gray-200";
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="w-screen flex justify-center items-center fixed z-[999] top-8 left-0"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className={`flex items-center p-3 mb-4 text-sm ${severityColor} rounded-lg max-w-80`}
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>{message}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
