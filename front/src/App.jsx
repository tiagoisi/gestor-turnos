import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavBar from "./components/navbar/NavBar"
import Appointments from "./views/appointments/Appointments"
import Home from "./views/home/Home"
import AboutUs from "./views/aboutUs/AboutUs";
import Login from "./views/login/Login"
import Register from "./views/register/Register"
import ErrorPage from "./views/errorPage/ErrorPage";
import AppointmentForm from "./components/appointmentForm/AppointmentForm";

function App() {
  const { pathname } = useLocation();
  return (
    <>
    { pathname !== "/register" && pathname !== "/login" && pathname !== "/addappointment" ? <NavBar /> : null }
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/schedule" element={<AppointmentForm />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
    </>
  )
}

export default App
