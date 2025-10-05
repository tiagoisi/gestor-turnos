import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./errorpage.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate("/home");
        }, 5000);

        return () => {
            clearInterval(countdown);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h1>There's nothing here...!</h1>
            <h2>:(</h2>
            <h2>404</h2>
            <p>Returning to home in {seconds} seconds...</p>
        </div>
    );
}

export default ErrorPage;
