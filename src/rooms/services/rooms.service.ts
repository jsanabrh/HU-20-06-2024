import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsEntity } from '../entities/rooms.entity';
import { Repository } from 'typeorm';
import { RoomsDto } from '../dtos/rooms.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomsEntity)
    private readonly roomRepository: Repository<RoomsEntity>,
  ) {}

  async create(createRoom: RoomsDto): Promise<RoomsEntity> {
    try {
      const room = await this.roomRepository.save(createRoom);
      return room;
    } catch (error) {
      throw new NotFoundException('Room creation failed');
    }
  }

  async findAll(): Promise<RoomsEntity[]> {
    try {
      return await this.roomRepository.find();
    } catch (error) {
      throw new NotFoundException('Error find rooms');
    }
  }

  async findOne(room_id: number): Promise<RoomsEntity> {
    const room = await this.roomRepository.findOne({ where: { room_id } });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: number, updateRoom: RoomsDto): Promise<RoomsEntity> {
    const room = await this.roomRepository.preload({
      room_id: id,
      ...updateRoom,
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return await this.roomRepository.save(room);
  }

  async remove(room_id: number): Promise<void> {
    const room = await this.roomRepository.findOne({ where: { room_id } });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    try {
      await this.roomRepository.remove(room);
    } catch (error) {
      throw new NotFoundException('Error deleting room');
    }
  }
}
