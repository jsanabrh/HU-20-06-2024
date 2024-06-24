import { Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';
import { SessionsService } from './services/sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsEntity } from './entities/sessions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionsEntity])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
