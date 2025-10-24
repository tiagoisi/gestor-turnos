import { useEffect, useState } from "react";
import AppointmentCard from "../../components/appoinmentCard/appointmentCard";
import styles from "./appointments.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = localStorage.getItem("user");
      if (!userData) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must log in to see your appointments!"
        });
        navigate("/home");
        return;
      }
      let user;
      try {
        const parsedData = JSON.parse(userData);
        user = parsedData.user ? parsedData.user : parsedData;
      } catch (e) {
        alert("Invalid user information. Please log in again!");
        navigate("/home");
        return;
      }
      if (!user || !user.id) {
        alert("Invalid user information. Please log in again!");
        navigate("/home");
        return;
      }
      const response = await axios.get(`https://gestor-turnos-dbyt.onrender.com/users/${user.id}`);
      const userFromApi = response.data; 
      setAppointments(userFromApi.appointments || []); 
      const storedUser = JSON.parse(userData);
      storedUser.appointments = userFromApi.appointments;
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Could not fetch appointments!");
      setAppointments([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [navigate]); 
    
  const handleCancelAppointment = async (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",    
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`https://gestor-turnos-dbyt.onrender.com/cancel/${appointmentId}`);
          Swal.fire({
            title: "Cancelled!",
            text: "Appointment successfully cancelled!",
            icon: "success"
          });
          fetchAppointments(); 
        } catch (err) {
          console.error("Error canceling appointment:", err);
          Swal.fire({
            title: "Error",
            text: "Cannot cancel: allowed only until the day before.",
            icon: "error"
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your appointment is still active.",
          icon: "info"
        });
      }
    });
  };

  return (
    <div className={styles.appointmentsWrapper}>
      <div className={styles.appointmentsContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Appointments</h1>
          <Link to="/appointments/schedule">
            <button className={styles.addBtn}>+ Add Appointment</button>
          </Link>
        </div>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading appointments...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <h2>No Appointments Yet</h2>
            <p>You don't have any appointments scheduled. Start your fitness journey by booking one now!</p>
            <Link to="/appointments/schedule">
              <button className={styles.bookNowBtn}>Book Your First Session</button>
            </Link>
          </div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className={styles.appointmentsList}>
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                id={appointment.id}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
                description={appointment.description}
                onCancel={handleCancelAppointment} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}