import { Formik } from 'formik';
import styles from "./register.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Register = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.registerWrapper}>
            <div className={styles.registerContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>STEELCORE🚀</h1>
                    <p className={styles.subtitle}>Start your fitness journey today</p>
                </div>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        birthdate: '',
                        nDni: '',
                        username: '',
                        password: ''
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (!values.name) {
                          errors.name = "The name is required!"
                        } else if (values.name.length < 3) {
                          errors.name = "Name should have a minimum of 3 characters!";  
                        } else if (values.name.length > 50) {
                          errors.name = "Name cannot exceed 50 characters!";
                        }
                        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.name)) {
                            errors.name = "Name cannot contain numbers or special characters!";
                        }
                        if (!values.email) {
                           errors.email = "The email is required!";
                        }
                        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                            errors.email = "Enter a valid email address!";
                        }
                        if (!values.birthdate) {
                            errors.birthdate = "The birthdate is required!";
                        }  else {
                        if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthdate)) {
                            errors.birthdate = "The birthdate must be in yyyy-mm-dd format!";
                        } else {
                            const birth = new Date(values.birthdate);
                            const today = new Date();
                            let age = today.getFullYear() - birth.getFullYear();
                            const monthDiff = today.getMonth() - birth.getMonth();
                            const dayDiff = today.getDate() - birth.getDate();
                            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                age--;
                            }
                            if (age < 18) {
                                errors.birthdate = "You must be at least 18 years old!";
                            }
                            if (age > 50) {
                                errors.birthdate = "You must be younger than 50!";
                            }
                          }
                        }
                        if (!values.nDni) {
                            errors.nDni = "The DNI is required!";
                        } else if (!/^\d+$/.test(values.nDni)) { 
                            errors.nDni = "The DNI must contain only numbers!";
                        } else if (values.nDni.length < 5) {
                            errors.nDni = "The DNI must have at least 5 digits!";
                        } else if (values.nDni.length > 20) {
                            errors.nDni = "The DNI is too long to be valid!";
                        }
                            
                        if (!values.username) {
                            errors.username = "The username is required!";
                        } else if (values.username.length < 3) {
                            errors.username = "The username must have at least 3 digits!";
                        } else if (values.username.length > 20) {
                            errors.username = "The username cannot exceed 50 characters!"
                        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.username)) {
                            errors.username = "Username cannot contain numbers or special characters!";
                        }
                        if (!values.password) {
                            errors.password = "Password is required!";
                        } else if (values.password.length < 4) {
                            errors.password = "The password must have at least 4 digits";
                        } else if (values.password.length > 10) {
                            errors.password = "The password cannot exceed 10 caracters!";
                        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/.test(values.password)) {
                            errors.password = "The password must have at least one letter, one number, and one special symbol!";
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const { data } = await axios.post("https://gestor-turnos-dbyt.onrender.com/users/register", values);
                            Swal.fire({
                                        title: "Welcome!",
                                        text: "You have successfully registered.",
                                        icon: "success"
                                      });
                            resetForm();
                            navigate("/login");
                        } catch (error) {
                            console.error("There was a problem with your registration:", error);
                            Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Error sending form. Please try later!",
                                      });
                        }
                    }}
                >
                    {({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>Full Name</label>
                                <input 
                                    type="text" 
                                    id='name' 
                                    name='name' 
                                    placeholder='John Doe' 
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.name && errors.name ? styles.inputError : styles.input}
                                />
                                {touched.name && errors.name && <p className={styles.error}>{errors.name}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <input 
                                    type="email" 
                                    id='email' 
                                    name='email' 
                                    placeholder='example@gmail.com' 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.email && errors.email ? styles.inputError : styles.input}
                                />
                                {touched.email && errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="birthdate" className={styles.label}>Birthdate</label>
                                <input 
                                    type="date" 
                                    id='birthdate' 
                                    name='birthdate' 
                                    value={values.birthdate}
                                    onChange={handleChange}    
                                    onBlur={handleBlur}
                                    className={touched.birthdate && errors.birthdate ? styles.inputError : styles.input}
                                />
                                {touched.birthdate && errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="nDni" className={styles.label}>DNI</label>
                                <input 
                                    type="text" 
                                    id='nDni' 
                                    name='nDni' 
                                    placeholder='12345678' 
                                    value={values.nDni}
                                    onChange={handleChange}    
                                    onBlur={handleBlur}
                                    className={touched.nDni && errors.nDni ? styles.inputError : styles.input}
                                />
                                {touched.nDni && errors.nDni && <p className={styles.error}>{errors.nDni}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="username" className={styles.label}>Username</label>
                                <input 
                                    type="text" 
                                    id='username' 
                                    name='username' 
                                    placeholder='johndoe' 
                                    value={values.username}
                                    onChange={handleChange}   
                                    onBlur={handleBlur}
                                    className={touched.username && errors.username ? styles.inputError : styles.input}
                                />
                                {touched.username && errors.username && <p className={styles.error}>{errors.username}</p>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <input 
                                    type="password" 
                                    id='password' 
                                    name='password' 
                                    placeholder='••••••••' 
                                    value={values.password}
                                    onChange={handleChange}   
                                    onBlur={handleBlur}
                                    className={touched.password && errors.password ? styles.inputError : styles.input}
                                />
                                {touched.password && errors.password && <p className={styles.error}>{errors.password}</p>}
                            </div>

                            <button type='submit' className={styles.submitBtn}>
                                Create Account
                            </button>

                            <p className={styles.loginLink}>
                                Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>
                            </p>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Register;