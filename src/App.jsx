//SECTION - GENERAL
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

//SECTION - COMPONENTS
import Wrapper from "./shared/template/Wrapper/Wrapper";
import LoginWrapper from "./shared/template/Wrapper/LoginWrapper";

//SECTION - ROUTES
import { Navigate, Route, Routes } from "react-router-dom";
import AuthProtected from "./routes/AuthProtected";
import LoginProtected from "./routes/LoginProtected";

//SECTION - PAGES
import Booking from "./features/booking/pages/Booking";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Patients from "./features/patients/pages/Patients";
import Dashboard from "./features/dashboard/pages/Dashboard";
import SpecificPatient from "./features/patients/pages/SpecificPatient";
import Appointments from "./features/patients/pages/Appointments";

const App = () => {
  //SECTION - Translation related
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  //SECTION - useEffect
  useEffect(() => {
    if (!localStorage.getItem("i18nextLng")) {
      localStorage.setItem("i18nextLng", "ar");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route element={<AuthProtected />}>
          <Route
            path="/patients"
            element={<Wrapper component={<Patients />} />}
          />
          <Route
            path="/patients/:id"
            element={<Wrapper component={<SpecificPatient />} />}
          />
          <Route
            path="/dashboard"
            element={<Wrapper component={<Dashboard />} />}
          />
          <Route
            path="/appointments"
            element={<Wrapper component={<Appointments />} />}
          />
        </Route>
        <Route element={<LoginProtected />}>
          <Route
            path="/login"
            element={<LoginWrapper component={<Login />} />}
          />
          <Route
            path="/register"
            element={<LoginWrapper component={<Register />} />}
          />
        </Route>
        <Route
          path="/error/:code"
          // element={<Wrapper component={<ErrorPage />} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="test" element={<Wrapper component={<Booking />} />} />
      </Routes>
    </>
  );
};

export default App;
