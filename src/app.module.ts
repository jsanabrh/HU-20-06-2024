import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationsService } from './flat/reservations/services/reservations/reservations.service';

@Module({
  imports: [ReservationsModule],
  controllers: [AppController],
  providers: [AppService, ReservationsService],
})
export class AppModule {}
