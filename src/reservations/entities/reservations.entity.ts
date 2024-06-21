import { Reservation } from 'src/models/reservation.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  reservationID: number;

  @Column({ default: Reservation.AVAILABLE, type: 'enum', enum: Reservation })
  status: Reservation;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;
}
