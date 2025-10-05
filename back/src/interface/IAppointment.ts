export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

interface IAppointment {
    id: number;
    date: string;
    time: string;
    description: string;
    userId: number;
}

export default IAppointment;