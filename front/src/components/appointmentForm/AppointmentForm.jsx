import { Formik } from 'formik';
import styles from "./appointmentForm.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const AppointmentForm = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.appointmentWrapper}>
            <div className={styles.appointmentContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Book Your Session</h1>
                    <p className={styles.subtitle}>Schedule your training appointment</p>
                </div>

                <Formik
                    initialValues={{
                        date: '',
                        time: '',
                        description: ''
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (!values.date) {
                            errors.date = "The date is required!";
                        } else {
                            const appointmentDate = new Date(values.date + "T00:00");
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const tomorrow = new Date(today);
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            const in14Days = new Date(today);
                            in14Days.setDate(in14Days.getDate() + 14);
                            if (appointmentDate < tomorrow || appointmentDate > in14Days) {
                                errors.date = "The date must be between tomorrow and the next 14 days!";
                            } else {
                            const dayOfWeek = appointmentDate.getDay(); 
                            if (dayOfWeek === 0 || dayOfWeek === 6) {
                                errors.date = "Appointments cannot be scheduled on weekends!";
                            }
                          }
                        }
                        if (!values.time) {
                            errors.time = "The time is required!";
                        } else {
                            const validTimes = [
                                "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                                "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
                            ];
                        if (!validTimes.includes(values.time)) {
                                errors.time = "Time must be between 09:00 and 17:30 in 30-minute intervals!";
                            }
                        }
                        if (!values.description) {
                            errors.description = "The description is required!";
                        } else {
                            const regex = /^[A-Za-z\s]+$/;
                            if (!regex.test(values.description)) {
                                errors.description = "The description must contain only letters and spaces!";
                            } else if (values.description.length < 4) {
                                errors.description = "The description must be at least 4 characters long!";
                            } else if (values.description.length > 30) {
                                errors.description = "The description must not exceed 30 characters!";
                            }
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const stored = JSON.parse(localStorage.getItem("user"));
                            const user = stored.user ? stored.user : stored;
                            if (!user || !user.id) {
                                alert("You must be logged in to create an appointment!");
                                navigate("/home");
                                return;
                            }
                            const appointmentData = { ...values, userId: user.id };
                            await axios.post("http://localhost:3000/appointments/shedule", appointmentData);
                            Swal.fire({
                                        title: "Congrats!",
                                        text: "Appointment successfully booked!",
                                        icon: "success"
                                      });
                            resetForm();
                            navigate("/appointments");
                        } catch (error) {
                            console.error("There was a problem with your booking:", error);
                            alert("Failed to add the appointment!");
                        }
                    }}
                >
                    {({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="date" className={styles.label}>Date</label>
                                <input 
                                    type="date" 
                                    id='date' 
                                    name='date' 
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.date && errors.date ? styles.inputError : styles.input}
                                />
                                {touched.date && errors.date && <p className={styles.error}>{errors.date}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="time" className={styles.label}>Time</label>
                                <input 
                                    type="time" 
                                    id='time' 
                                    name='time' 
                                    value={values.time}
                                    onChange={handleChange}   
                                    onBlur={handleBlur}
                                    className={touched.time && errors.time ? styles.inputError : styles.input}
                                />
                                {touched.time && errors.time && <p className={styles.error}>{errors.time}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="description" className={styles.label}>Description</label>
                                <input 
                                    type="text" 
                                    id='description' 
                                    name='description' 
                                    placeholder='Training focus or activity' 
                                    value={values.description}
                                    onChange={handleChange}   
                                    onBlur={handleBlur}
                                    className={touched.description && errors.description ? styles.inputError : styles.input}
                                />
                                {touched.description && errors.description && <p className={styles.error}>{errors.description}</p>}
                            </div>

                            <button type='submit' className={styles.submitBtn}>
                                Book Appointment
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AppointmentForm;