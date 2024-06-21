import {
  Column,
  CreateDateColumn,
  Entity,
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
}
