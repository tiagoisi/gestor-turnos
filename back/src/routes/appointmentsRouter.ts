//? HACER LOS SIGUIENTE METODOS =>
//* GET /appointments => Obtener todos los turnos
//* GET /appointments/id: => Obtener un turno por ID
//* POST /appointments/schedule => Crear un nuevo turno

import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";
import validateAppointment from "../middlewares/validateAppointment";

const appointmentRouter = Router();

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.post("/shedule", validateAppointment, schedule);
appointmentRouter.put("/cancel/:id", cancel);

export default appointmentRouter;

//! PUT /appointments/cancel => Cancelar un turno
//? POR AHORA SOLO MANDAR UN MENSAJE 
 
