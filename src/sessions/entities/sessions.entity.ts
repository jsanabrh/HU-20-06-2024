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
  name_session: string;

  @CreateDateColumn()
  start_hour: Date;

  @CreateDateColumn()
  end_hour: Date;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.session)
  reservation: ReservationEntity[];
}
