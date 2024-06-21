import {
  Column,
  CreateDateColumn,
  Entity,
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
}
