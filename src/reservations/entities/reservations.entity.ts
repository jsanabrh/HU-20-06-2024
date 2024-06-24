import { Reservation } from 'src/models/reservation.model';
import { SessionsEntity } from 'src/sessions/entities/sessions.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { WorkspacesEntity } from 'src/workspaces/entities/workspaces.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column({ default: Reservation.AVAILABLE, type: 'enum', enum: Reservation })
  status: Reservation;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.reservation)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => WorkspacesEntity, (workspace) => workspace.reservation)
  @JoinColumn({ name: 'workspace_id' })
  workspace: WorkspacesEntity;

  @ManyToOne(() => SessionsEntity, (session) => session.reservation)
  @JoinColumn({ name: 'session_id' })
  session: SessionsEntity;
}
