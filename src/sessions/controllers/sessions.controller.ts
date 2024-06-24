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
import { SessionsService } from '../services/sessions.service';
import { SessionsDto } from '../dtos/sessions.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionService: SessionsService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'Session created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'The data entered to create the Session is invalid.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while creating the Session.',
  })
  create(@Body() createSession: SessionsDto) {
    return this.sessionService.create(createSession);
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'All Session were found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No Session were found in the system.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the Session.',
  })
  findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Session found successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Session with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the Session.',
  })
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiResponse({ status: 200, description: 'Session updated successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Session with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while updating the Session.',
  })
  update(@Param('id') id: string, @Body() updateSession: SessionsDto) {
    return this.sessionService.update(+id, updateSession);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Session deleted successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Session with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while deleting the Session.',
  })
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }
}
