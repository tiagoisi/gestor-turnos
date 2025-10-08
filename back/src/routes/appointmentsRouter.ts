import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";
import validateAppointment from "../middlewares/validateAppointment";

const appointmentRouter = Router();

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.post("/shedule", validateAppointment, schedule);
appointmentRouter.put("/cancel/:id", cancel);

export default appointmentRouter;
 
