import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentStatus } from "../interface/IAppointment";
import User from "./UserEntity";

@Entity({ name: "appointments" })
class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;
        
    @Column()
    date!: string;

    @Column()
    time!: string;

    @Column({ default: AppointmentStatus.ACTIVE })
    status!: AppointmentStatus;

    @Column()
    description!: string;

    @Column()
    userId!: number;
    
    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: "userId" })
    user!: User;
}

export default Appointment;