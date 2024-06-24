import { ReservationEntity } from 'src/reservations/entities/reservations.entity';
import { RoomsEntity } from 'src/rooms/entities/rooms.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WorkspacesEntity {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @Column()
  row_position: number;

  @Column()
  column_position: number;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @ManyToOne(() => RoomsEntity, (room) => room.workspaces)
  room: RoomsEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.workspace)
  reservation: ReservationEntity[];
}
