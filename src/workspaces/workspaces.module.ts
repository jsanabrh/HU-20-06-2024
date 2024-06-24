import { Module } from '@nestjs/common';
import { WorkspacesService } from './services/workspaces.service';
import { WorkspacesController } from './controllers/workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesEntity } from './entities/workspaces.entity';
import { RoomsEntity } from 'src/rooms/entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspacesEntity, RoomsEntity])],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
