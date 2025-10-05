import { Formik } from 'formik';
import axios from 'axios';
import styles from "./login.module.css"
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.loginContainer}>
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
                        const { data } = await axios.post("http://localhost:3000/users/login", values);
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
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id='username' 
                                name='username' 
                                placeholder='Enter your username' 
                                value={values.username}
                                onChange={handleChange}   
                                onBlur={handleBlur} 
                            />
                            {touched.username && errors.username && <p className={styles.error}>{errors.username}</p>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id='password' 
                                name='password' 
                                placeholder='********' 
                                value={values.password}
                                onChange={handleChange}   
                                onBlur={handleBlur} 
                            />
                            {touched.password && errors.password && <p className={styles.error}>{errors.password}</p>}
                        </div>
                        <button type='submit'>Submit</button>
                        <Link to="/register"><p className={styles.account}>Don't have an account yet?</p></Link>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login;