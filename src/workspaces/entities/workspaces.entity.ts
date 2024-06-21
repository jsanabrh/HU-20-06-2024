import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WorkspacesEntity {
  @PrimaryGeneratedColumn()
  workspaceID: number;

  @Column()
  rowPosition: number;

  @Column()
  columnPosition: number;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;
}
