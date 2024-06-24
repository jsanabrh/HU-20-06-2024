import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '../entities/reservations.entity';
import { Repository } from 'typeorm';
import { ReservationDto } from '../dtos/reservations.dto';
import { WorkspacesEntity } from 'src/workspaces/entities/workspaces.entity';
import { SessionsEntity } from 'src/sessions/entities/sessions.entity';

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

  /*Querys*/

  async availableSpaces(
    room_id: number,
    session_id: number,
  ): Promise<WorkspacesEntity[]> {
    return this.reservationRepository.query(
      `
      SELECT w.*
      FROM public.workspaces_entity w
      LEFT JOIN public.reservation_entity r ON w.workspace_id = r.workspace_id
      WHERE w.room_id = $1 AND (r.session_id IS NULL OR r.status = 'canceled' OR r.session_id != $2)
    `,
      [room_id, session_id],
    );
  }

  async orderedByReservations(
    order: 'desc' | 'asc',
  ): Promise<SessionsEntity[]> {
    return this.reservationRepository.query(`
      SELECT s.*, COUNT(r.reservation_id) AS num_reservations
      FROM public.sessions_entity s
      LEFT JOIN public.reservation_entity r ON s.session_id = r.session_id
      GROUP BY s.session_id
      ORDER BY num_reservations ${order.toUpperCase()};
    `);
  }

  async spacesBySession(session_id: number): Promise<WorkspacesEntity[]> {
    return this.reservationRepository.query(
      `
      SELECT w.*
      FROM public.workspaces_entity w
      INNER JOIN public.reservation_entity r ON w.workspace_id = r.workspace_id
      WHERE r.session_id = $1 AND r.status != 'canceled'
    `,
      [session_id],
    );
  }

  async spacesByUser(user_id: number): Promise<WorkspacesEntity[]> {
    return this.reservationRepository.query(
      `
      SELECT w.*
      FROM public.workspaces_entity w
      INNER JOIN public.reservation_entity r ON w.workspace_id = r.workspace_id
      WHERE r.user_id = $1
    `,
      [user_id],
    );
  }

  async ocupedWorkspaces(
    room_id: number,
    session_id: number,
  ): Promise<WorkspacesEntity[]> {
    return this.reservationRepository.query(
      `
      SELECT w.*
      FROM public.workspaces_entity w
      INNER JOIN public.reservation_entity r ON w.workspace_id = r.workspace_id
      WHERE w.room_id = $1 AND r.session_id = $2 AND r.status != 'canceled'
    `,
      [room_id, session_id],
    );
  }
}
