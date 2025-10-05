import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";
import Appointment from "../entities/AppointmentEntity";
import User from "../entities/UserEntity";
import { AppointmentStatus } from "../interface/IAppointment";
import { appointmentRepository, userRepository } from "../repositories/indexRepository";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    const allAppointments: Appointment[] = await appointmentRepository.find();
    return allAppointments;
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentRepository.findOneBy({ id });
    if (!appointment) throw Error("No existe un turno");
    return appointment;
}

export const createAppointmentService = async (createAppointmentDto: ICreateAppointmentDto): Promise<Appointment> => {
    const { date, time, description, userId } = createAppointmentDto;
    const user: User | null = await userRepository.findOneBy({ id: userId })
    if (!user) throw Error(`No existe un usuario con id ${userId}`);

    const newAppointment: Appointment = appointmentRepository.create({ date, time, description });
    newAppointment.user = user;

    await appointmentRepository.save(newAppointment);
    return newAppointment;
}

export const cancelAppointmentService = async (id: number): Promise<void> => {
    const appointment: Appointment | null = await appointmentRepository.findOneBy({ id });
    if (!appointment) throw new Error(`No existe turno con id: ${id}`);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
        throw new Error("El turno solo puede cancelarse hasta el día anterior a la cita");
    }
    appointment.status = AppointmentStatus.CANCELLED;
    await appointmentRepository.save(appointment);
};
