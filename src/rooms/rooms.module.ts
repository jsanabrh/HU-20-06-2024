import { Module } from '@nestjs/common';
import { RoomsController } from './controllers/rooms.controller';
import { RoomService } from './services/rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsEntity } from './entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsEntity])],
  controllers: [RoomsController],
  providers: [RoomService],
})
export class RoomsModule {}
