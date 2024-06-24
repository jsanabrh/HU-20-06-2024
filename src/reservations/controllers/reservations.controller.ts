import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationsService } from '../services/reservations.service';
import { ReservationDto } from '../dtos/reservations.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post('/create')
  @ApiResponse({
    status: 201,
    description: 'Reservation created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'The data entered to create the Reservation is invalid.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while creating the Reservation.',
  })
  create(@Body() createReservation: ReservationDto) {
    return this.reservationService.create(createReservation);
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'All Reservation were found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No Reservation were found in the system.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the Reservation.',
  })
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Reservation found successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Reservation with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the Reservation.',
  })
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiResponse({
    status: 200,
    description: 'Reservation updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reservation with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while updating the Reservation.',
  })
  update(@Param('id') id: string, @Body() updateReservation: ReservationDto) {
    return this.reservationService.update(+id, updateReservation);
  }

  @Delete('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'Reservation deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reservation with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while deleting the Reservation.',
  })
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
