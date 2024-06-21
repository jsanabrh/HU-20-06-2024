import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Reservation } from 'src/models/reservation.model';

export class ReservationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Reservation)
  status: Reservation;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createAt: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updateAt: Date;
}
