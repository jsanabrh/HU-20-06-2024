import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class WorkSpacesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rowPosition: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  columnPosition: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createAt: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updateAt: Date;
}
