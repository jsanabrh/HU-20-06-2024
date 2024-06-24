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
import { RoomService } from '../services/rooms.service';
import { RoomsDto } from '../dtos/rooms.dto';

@ApiTags('Room')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'The data entered to create the room is invalid.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred while creating the room.',
  })
  create(@Body() createRoom: RoomsDto) {
    return this.roomService.create(createRoom);
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'All room were found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No room were found in the system.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the room.',
  })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Room found successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Room with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the room.',
  })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiResponse({ status: 200, description: 'Room updated successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Room with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred while updating the room.',
  })
  update(@Param('id') id: string, @Body() updateRoom: RoomsDto) {
    return this.roomService.update(+id, updateRoom);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Room deleted successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Room with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred while deleting the room.',
  })
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
