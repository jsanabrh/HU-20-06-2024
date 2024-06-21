import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class RoomsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameRoom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descriptionRoom: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacityRoom: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createAt: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updateAt: Date;
}
