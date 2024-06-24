import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '../entities/reservations.entity';
import { Repository } from 'typeorm';
import { ReservationDto } from '../dtos/reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async create(createReservation: ReservationDto): Promise<ReservationEntity> {
    try {
      const reservation =
        await this.reservationRepository.save(createReservation);
      return reservation;
    } catch (error) {
      throw new NotFoundException('reservation creation failed');
    }
  }

  async findAll(): Promise<ReservationEntity[]> {
    try {
      return await this.reservationRepository.find();
    } catch (error) {
      throw new NotFoundException('Error find reservation');
    }
  }

  async findOne(reservation_id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.findOne({
      where: { reservation_id },
    });

    if (!reservation) {
      throw new NotFoundException('reservation not found');
    }

    return reservation;
  }

  async update(
    id: number,
    updateReservation: ReservationDto,
  ): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.preload({
      reservation_id: id,
      ...updateReservation,
    });

    if (!reservation) {
      throw new NotFoundException('reservation not found');
    }

    return await this.reservationRepository.save(reservation);
  }

  async remove(reservation_id: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { reservation_id },
    });

    if (!reservation) {
      throw new NotFoundException('reservation not found');
    }

    try {
      await this.reservationRepository.remove(reservation);
    } catch (error) {
      throw new NotFoundException('Error deleting reservation');
    }
  }
}
