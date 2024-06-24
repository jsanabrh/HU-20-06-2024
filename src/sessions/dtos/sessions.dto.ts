import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class SessionsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameSession: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descriptionRoom: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startHour: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endHour: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createAt: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updateAt: Date;
}
