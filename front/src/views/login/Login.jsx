import { Formik } from 'formik';
import axios from 'axios';
import styles from "./login.module.css"
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to continue your fitness journey</p>
                </div>

                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validate={(values) => {
                        let errors = {};
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
                            const { data } = await axios.post("https://gestor-turnos-dbyt.onrender.com/users/login", values);
                            localStorage.setItem("user", JSON.stringify(data));
                            Swal.fire({
                                title: "Login successful!",
                                text: "Welcome back!",
                                icon: "success"
                            });
                            resetForm();
                            navigate("/home");
                        } catch (error) {
                            console.error("There was a problem with your login:", error);
                            Swal.fire({
                                icon: "error",
                                title: "Invalid credentials!",
                                text: "Please try again or create an account.",
                            });
                        }
                    }}
                >
                    {({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="username" className={styles.label}>Username</label>
                                <input 
                                    type="text" 
                                    id='username' 
                                    name='username' 
                                    placeholder='Enter your username' 
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
                                Sign In
                            </button>

                            <Link to="/register" className={styles.registerLink}>
                                <p className={styles.account}>Don't have an account yet? <span>Sign Up</span></p>
                            </Link>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;