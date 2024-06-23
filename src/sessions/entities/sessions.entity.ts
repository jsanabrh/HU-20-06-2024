import { ReservationEntity } from 'src/reservations/entities/reservations.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SessionsEntity {
  @PrimaryGeneratedColumn()
  sessionID: number;

  @Column()
  nameSession: string;

  @CreateDateColumn()
  startHour: Date;

  @CreateDateColumn()
  endHour: Date;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.session)
  reservation: ReservationEntity[];
}
