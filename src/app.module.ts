import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';

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
      entities: [],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([]),
    RoomsModule,
  
  ],

  controllers: [],
  providers: [],

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationsService } from './reservations/services/reservations.service';

@Module({
  imports: [SessionsModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService, ReservationsService],
})

export class AppModule {}