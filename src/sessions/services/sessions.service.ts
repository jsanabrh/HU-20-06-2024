import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsEntity } from '../entities/sessions.entity';
import { Repository } from 'typeorm';
import { SessionsDto } from '../dtos/sessions.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionsEntity)
    private readonly sessionRepository: Repository<SessionsEntity>,
  ) {}

  async create(createSession: SessionsDto): Promise<SessionsEntity> {
    try {
      const session = await this.sessionRepository.save(createSession);
      return session;
    } catch (error) {
      throw new NotFoundException('session creation failed');
    }
  }

  async findAll(): Promise<SessionsEntity[]> {
    try {
      return await this.sessionRepository.find();
    } catch (error) {
      throw new NotFoundException('Error find session');
    }
  }

  async findOne(session_id: number): Promise<SessionsEntity> {
    const session = await this.sessionRepository.findOne({
      where: { session_id },
    });

    if (!session) {
      throw new NotFoundException('session not found');
    }

    return session;
  }

  async update(
    id: number,
    updateSession: SessionsDto,
  ): Promise<SessionsEntity> {
    const session = await this.sessionRepository.preload({
      session_id: id,
      ...updateSession,
    });

    if (!session) {
      throw new NotFoundException('session not found');
    }

    return await this.sessionRepository.save(session);
  }

  async remove(session_id: number): Promise<void> {
    const session = await this.sessionRepository.findOne({
      where: { session_id },
    });

    if (!session) {
      throw new NotFoundException('session not found');
    }

    try {
      await this.sessionRepository.remove(session);
    } catch (error) {
      throw new NotFoundException('Error deleting session');
    }
  }
}
