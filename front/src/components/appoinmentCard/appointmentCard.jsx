import { useState } from "react";
import styles from "./AppointmentCard.module.css";

export default function AppointmentCard({
    id, date, time, status, description, onCancel 
}) {
    const parseDate = new Date(date);
    const formattedDate = `${parseDate.getDate() + 1} / ${parseDate.getMonth() + 1} /${parseDate.getFullYear()}`;

    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (status === "active" && onCancel) { 
            onCancel(id);
        }
    };

    return (
        <div className={styles.container}>
            <span>{formattedDate}</span>
            <span>{time}</span>
            <span>{description}</span>
            {
                status === "active"
                    ? (
                        <span
                            className={styles.active} 
                            onClick={handleClick}
                            onMouseEnter={() => setIsHovered(true)} 
                            onMouseLeave={() => setIsHovered(false)} 
                            style={isHovered ? { backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' } : {}} 
                        >
                            {isHovered ? "Cancel" : status}
                        </span>
                    )
                    : (<span className={styles.cancelled}>{status}</span>)
            }
        </div>
    );
}