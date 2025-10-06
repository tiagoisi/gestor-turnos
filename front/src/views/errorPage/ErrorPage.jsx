import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./errorpage.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate("/home");
        }, 10000);

        return () => {
            clearInterval(countdown);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className={styles.errorWrapper}>
            <div className={styles.errorContent}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.errorTitle}>Page Not Found</h2>
                <div className={styles.divider}></div>
                <p className={styles.errorMessage}>
                    Oops! The page you're looking for seems to have wandered off. 
                    It might have been moved, deleted, or perhaps never existed.
                </p>
                <p className={styles.countdown}>
                    Returning to home in <span className={styles.countdownNumber}>{seconds}</span> seconds...
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;