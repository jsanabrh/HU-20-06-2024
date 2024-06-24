import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesEntity } from 'src/workspaces/entities/workspaces.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { SessionsEntity } from 'src/sessions/entities/sessions.entity';
import { ReservationEntity } from './entities/reservations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspacesEntity,
      UsersEntity,
      SessionsEntity,
      ReservationEntity,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
