import { Request, Response, NextFunction } from "express";
import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";

const validateAppointment = (req: Request<{}, {}, ICreateAppointmentDto>, res: Response, next: NextFunction) => {
    const { date, time, description } = req.body;
    try {
        if (!date) throw Error("El campo date es requerido!");
        const appointmentDate = new Date(date);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tommorrow = new Date(today);
        tommorrow.setDate(tommorrow.getDate());
        
        const in14Days = new Date(today);
        in14Days.setDate(in14Days.getDate() + 14);

        if (appointmentDate < tommorrow || appointmentDate > in14Days) {
            throw new Error("La fecha debe estar entre mañana y dentro de 14 dias");
        }

        if (!time) throw Error("El campo time es requerido!");
        const validTimes = [
            "09:00", "9:30", "10:00", "10:30", "11:00", "11:30",
            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
            "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
        ];
        if (!validTimes.includes(time)) {
            throw Error("El campo time debe estar entre las 9:00 y 17:30 en intervalos de 30 minutos");
        }

        const [year, month, day] = date.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day); 
        const dayOfWeek = parsedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
        throw Error("No se pueden agendar turnos los fines de semana!");
        }

        if (!description) throw Error("El campo descripcion es requerido!");
        if (typeof description !== "string") throw Error("El campo descripcion debe ser un string!");
        if (description.length < 4 || description.length > 50) {
            throw new Error("El campo description debe tener entre 4 y 50 caracteres");
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default validateAppointment;