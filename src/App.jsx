//SECTION - GENERAL
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

//SECTION - PAGES
import Booking from "./features/booking/pages/Booking";
import Home from "./features/landing/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

//SECTION - COMPONENTS
import Wrapper from "./shared/template/Wrapper/Wrapper";
import LoginWrapper from "./shared/template/Wrapper/LoginWrapper";

//SECTION - ROUTES
import { Navigate, Route, Routes } from "react-router-dom";
import AuthProtected from "./routes/AuthProtected";
import LoginProtected from "./routes/LoginProtected";
import { useDispatch } from "react-redux";
import { flushAuth } from "./store/slices/auth";
import Patients from "./features/patients/pages/Patients";

const App = () => {
  //SECTION - Translation related
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  //SECTION - useEffect
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("i18nextLng")) {
      localStorage.setItem("i18nextLng", "ar");
    }
    dispatch(flushAuth());
  }, []);
  return (
    <>
      <Routes>
        <Route element={<AuthProtected />}>
          <Route path="/" element={<Wrapper component={<Home />} />} />
        </Route>
        <Route element={<AuthProtected />}>
          <Route
            path="/patients"
            element={<Wrapper component={<Patients />} />}
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
