import { ReservationEntity } from 'src/reservations/entities/reservations.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  nameUser: string;

  @Column()
  lastNameUser: string;

  @Column()
  emailUser: string;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservation: ReservationEntity[];
}
