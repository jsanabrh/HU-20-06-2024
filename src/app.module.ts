import { Module } from '@nestjs/common';
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