import { WorkspacesEntity } from 'src/workspaces/entities/workspaces.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RoomsEntity {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column()
  name_room: string;

  @Column()
  description_room: string;

  @Column()
  capacity_room: number;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @OneToMany(() => WorkspacesEntity, (workspace) => workspace.room)
  workspaces: WorkspacesEntity[];
}
