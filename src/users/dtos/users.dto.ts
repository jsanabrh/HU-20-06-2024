import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class UsersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameUser: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastNameUser: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emailUser: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createAt: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updateAt: Date;
}
