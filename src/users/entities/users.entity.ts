import {
  Column,
  CreateDateColumn,
  Entity,
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
}
