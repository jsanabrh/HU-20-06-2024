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
  roomID: number;

  @Column()
  nameRoom: string;

  @Column()
  descriptionRoom: string;

  @Column()
  capacityRoom: number;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @OneToMany(() => WorkspacesEntity, (workspace) => workspace.room)
  workspaces: WorkspacesEntity[];
}
