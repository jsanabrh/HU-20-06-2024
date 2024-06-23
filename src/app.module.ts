import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReservationEntity } from './reservations/entities/reservations.entity';
import { RoomsEntity } from './rooms/entities/rooms.entity';
import { SessionsEntity } from './sessions/entities/sessions.entity';
import { UsersEntity } from './users/entities/users.entity';
import { WorkspacesEntity } from './workspaces/entities/workspaces.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ReservationsController } from './reservations/controllers/reservations.controller';
import { RoomsController } from './rooms/controllers/rooms.controller';
import { SessionsController } from './sessions/controllers/sessions.controller';
import { UsersController } from './users/controllers/users.controller';
import { WorkspacesController } from './workspaces/controllers/workspaces.controller';
import { ReservationsService } from './reservations/services/reservations.service';
import { RoomsService } from './rooms/services/rooms.service';
import { SessionsService } from './sessions/services/sessions.service';
import { UsersService } from './users/services/users.service';
import { WorkspacesService } from './workspaces/services/workspaces.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        ReservationEntity,
        RoomsEntity,
        SessionsEntity,
        UsersEntity,
        WorkspacesEntity,
      ],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([
      ReservationEntity,
      RoomsEntity,
      SessionsEntity,
      UsersEntity,
      WorkspacesEntity,
    ]),
    ReservationsModule,
    RoomsModule,
    SessionsModule,
    UsersModule,
    WorkspacesModule,
  ],

  controllers: [
    ReservationsController,
    RoomsController,
    SessionsController,
    UsersController,
    WorkspacesController,
  ],
  providers: [
    ReservationsService,
    RoomsService,
    SessionsService,
    UsersService,
    WorkspacesService,
  ],
})
export class AppModule {}
