import { Module } from '@nestjs/common';
import { WorkspacesService } from './services/workspaces.service';
import { WorkspacesController } from './controllers/workspaces.controller';

@Module({
  providers: [WorkspacesService],
  controllers: [WorkspacesController]
})
export class WorkspacesModule {}