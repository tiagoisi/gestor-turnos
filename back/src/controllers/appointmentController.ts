import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentService";
import Appointment from "../entities/AppointmentEntity";

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const allAppointments: Appointment[] = await getAllAppointmentsService();
        res.status(200).json(allAppointments);
    } catch (error) {
        if( error instanceof Error)
        res.status(404).json({ message: error.message });
    }
};

export const getAppointmentById = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error) {
        if( error instanceof Error)
        res.status(404).json({ message: error.message });
    }
};

export const schedule = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date, time, description, userId } = req.body;
        const newAppointment: Appointment = await createAppointmentService({ date, time, description, userId })
        res.status(201).json(newAppointment);
    } catch (error) {
        if( error instanceof Error)
        res.status(404).json({ message: error.message });
    }
}

export const cancel = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await cancelAppointmentService(Number(id));
        res.status(200).json({ message: `Turno con id ${id} cancelado correctamente` });
    } catch (error) {
        if( error instanceof Error)
        res.status(404).json({ message: error.message })
    }
};
