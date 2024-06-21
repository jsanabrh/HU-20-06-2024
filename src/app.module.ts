import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { WorkspacesController } from './worskpaces/controllers/workspaces.controller';

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
    WorkspacesModule,
  
  ],

  controllers: [WorkspacesController],
  providers: [],
})
export class AppModule {}
