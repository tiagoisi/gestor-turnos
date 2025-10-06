import { useState } from "react";
import styles from "./AppointmentCard.module.css";

export default function AppointmentCard({
    id, date, time, status, description, onCancel 
}) {
    const parseDate = new Date(date);
    const formattedDate = `${parseDate.getDate() + 1}/${parseDate.getMonth() + 1}/${parseDate.getFullYear()}`;

    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (status === "active" && onCancel) { 
            onCancel(id);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.infoSection}>
                    <div className={styles.dateTime}>
                        <div className={styles.dateBlock}>
                            <span className={styles.label}>Date</span>
                            <span className={styles.value}>{formattedDate}</span>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.timeBlock}>
                            <span className={styles.label}>Time</span>
                            <span className={styles.value}>{time}</span>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <span className={styles.label}>Description</span>
                        <span className={styles.value}>{description}</span>
                    </div>
                </div>

                <div className={styles.statusSection}>
                    {status === "active" ? (
                        <button
                            className={`${styles.statusBtn} ${styles.activeBtn}`}
                            onClick={handleClick}
                            onMouseEnter={() => setIsHovered(true)} 
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? "Cancel" : "Active"}
                        </button>
                    ) : (
                        <span className={`${styles.statusBtn} ${styles.cancelledBtn}`}>
                            Cancelled
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}