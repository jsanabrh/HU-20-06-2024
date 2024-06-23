import { Reservation } from 'src/models/reservation.model';
import { SessionsEntity } from 'src/sessions/entities/sessions.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { WorkspacesEntity } from 'src/workspaces/entities/workspaces.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => UsersEntity, (user) => user.reservation)
  user: UsersEntity;

  @ManyToOne(() => WorkspacesEntity, (workspace) => workspace.reservation)
  workspace: WorkspacesEntity;

  @ManyToOne(() => SessionsEntity, (session) => session.reservation)
  session: SessionsEntity;
}
